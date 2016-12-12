/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const config = require('../../config.js');
const db = require('../../model/db.server.model');
const Promise = require('bluebird');
const common = require('../../common');

const adminCtl = {
    checkLogin: function (req, res, next) {
        if(config.debug) console.log('检测登录');
        next();
    },
    index: function (req, res, next) {
        res.send('这里是用户中心首页');
    },
    login: function (req, res, next) {
        if(config.debug) console.log(req.method);
        let method = req.method;
        if (method === 'GET') {
            res.render('admin/login');
        } else if (method === 'POST') {
            //todo 处理登录方法
            res.json({error: 0, messages: {title: '登录成功', body: '欢迎回来，XXXXX'}});
        } else {
            let err = new Error('非法method');
            next(err);
        }
    },

    //users方法
    siteInfo: function (req, res, next) {
        switch (req.method) {
            case 'GET':
                const siteP = db.readSiteInfo();
                const navP = db.getNav();

                Promise.all([siteP, navP]).then(function (d) {

                    if(config.debug) console.log(d);

                    let data;
                    if (d.length !== 0) {
                        data = {
                            site: d[0],
                            nav: d[1]
                        };
                    }

                    res.render('admin/siteInfo', data);
                });
                break;
            case 'POST':
                //接收post信息
                const reqBody = req.body;
                //校验信息完整性
                if (reqBody.site_name === '') {
                    res.json({error: 10, messages: {title: '验证失败', body: '请填写网站名称'}});
                } else {
                    //处理数据存储
                    let site = db.readSiteInfo();
                    site.then(function (info) {
                        if (!info) {
                            //不存在则创建
                            db.createSiteInfo(reqBody).then(function (r) {
                                //保存和更新返回 r 数据格式：{"ok":1,"nModified":1,"n":1}
                                if (r.ok === 1) {
                                    res.json({error: 0, messages: {title: '创建成功', body: '新网站创建成功'}});
                                } else {
                                    res.json({error: 1, messages: {title: '创建失败', body: '网站信息创建错误'}});
                                }
                            });
                        } else {
                            //存在记录则更新
                            db.editSiteInfo({_id: info.id}, req.body).then(function (r) {
                                if (r.ok === 1) {
                                    res.json({error: 0, messages: {title: '更新成功', body: '网站信息更新成功'}});
                                } else {
                                    res.json({error: 1, messages: {title: '更新失败', body: '网站信息更新失败'}});
                                }
                            });
                        }
                    });
                }
                break;
            default:
                let err = new Error('非法method');
                next(err);
        }

    },
    //文章列表
    articleList: function (req, res, next) {
        //与index 中相似调用
        let siteP = db.readSiteInfo();
        let navP = db.getNav();
        let listP = db.showList(0, 0);
        Promise.all([siteP, navP, listP]).then(function (d) {

            const data = {
                site: d[0],
                nav: d[1],
                content: d[2]
            };

            res.render('admin/articleList', data);
        });
    },

    addArticle: function (req, res, next) {
        switch (req.method) {
            case 'GET':
                const siteP = db.readSiteInfo();
                const navP = db.getNav();

                Promise.all([siteP, navP]).then(function (d) {
                    const data = {
                        site: d[0],
                        nav: d[1]
                    };
                    res.render('admin/addArticle', data);
                });

                break;
            case 'POST':
                /**
                 * 添加文章
                 * 处理 tags
                 */
                let pAr = [];
                pAr.push(db.addArticle(req.body));

                const tagAr = req.body.tags.split(',');

                //若话题存在，则添加到话题 Documents
                if (tagAr.length !== 0) {
                    for (let i = 0; i < tagAr.length; i++) {
                        db.checkTag({tag_name: tagAr[i]}).then(function (d) {
                            if (!!d) {
                                pAr.push(db.updateTag({tag_name: tagAr[i]}, {tag_num: d.tag_num + 1}));
                            } else {
                                pAr.push(db.addTag({tag_name: tagAr[i], tag_num: 1}));
                            }
                        })
                    }
                }

                Promise.all(pAr).then(function (d) {
                    res.json({error: '0', message: {title: '操作成功', body: '文章发布成功！'}});
                });

                break;
            default:
                let err = new Error('非法method');
                next(err);
        }

    },
    //编辑文章
    editArticle: function (req, res, next) {
        switch (req.method) {
            case 'GET':
                const siteP = db.readSiteInfo();
                const navP = db.getNav();
                const detail = db.artDetail({_id: req.params.id});

                Promise.all([siteP, navP, detail]).then(function (d) {
                    const data = {
                        site: d[0],
                        nav: d[1],
                        content: d[2]
                    };

                    res.render('admin/editArticle', data);
                });
                break;
            case 'POST':
                //处理tag
                let pAr = [];
                pAr.push(db.updateArticle({_id: req.params.id}, req.body));

                if(config.debug) console.log(req.body.tags);

                //tag块
                db.artDetail({_id:req.params.id}).then(function (d) {
                    let newAr = req.body.tags.split(',');
                    let oldAr = d.tags.split(',');

                    let tagAr = common.mergeArray(newAr,oldAr);

                    //若话题存在则tag_num -1，不存在则添加
                    if (tagAr.length !== 0) {
                        for (let i = 0; i < tagAr.length; i++) {
                            db.checkTag({tag_name: tagAr[i]}).then(function (d) {
                                if (!d) {
                                    pAr.push(db.addTag({tag_name: tagAr[i], tag_num: 1}));
                                }else{
                                    pAr.push(db.updateTag({tag_name: tagAr[i]}, {tag_num: d.tag_num - 1}));
                                }
                            })
                        }
                    }
                    //存储文章修改
                    Promise.all(pAr).then(function (d) {
                        if(config.debug) console.log(d);
                        if (d[0].ok === 1) {
                            res.json({error: 0, messages: {title: '文章修改成功', body: '文章修改成功！'}});
                        } else {
                            res.json({error: 100, messages: {title: '修改失败', body: '文章修改失败！可能出现了一些错误 '}});
                        }

                    });

                    //tag 块END
                },function (err) {
                    res.json({error:300,messages:{title:"内部错误",body:"读取原始tag出错，无法提交修改"}});
                });

                break;
            default:
                let err = new Error('非法method');
                next(err);

        }
    },

    //话题列表
    tagList: function (req, res, next) {
        //todo 分页 && 序列化 tags
        const siteP = db.readSiteInfo();
        const navP = db.getNav();
        const tagsP = db.getTagList(20, 0);

        switch (req.method) {
            case 'GET':
                Promise.all([siteP, navP, tagsP]).then(function (d) {
                    const data = {
                        site: d[0],
                        nav: d[1],
                        content: d[2]
                    };
                    res.render('admin/tagList', data);
                });

                break;
            case 'POST':
                //话题添加

                //todo 处理话题已存在
                if (req.body.tag_name !== '') {
                    db.addTag(req.body).then(function (d) {
                        res.json({error: 0, messages: {title: '添加成功', body: '话题添加成功！'}});
                    }, function (er) {
                        res.json({error: 100, messages: {title: '添加失败', body: '话题添加失败！'}});
                    });
                } else {
                    res.json({error: 200, messages: {title: '添加失败', body: '话题名称不能为空！'}});
                }


                break;
            default:
                let err = new Error('非法method');
                next(err);

        }


    },
    delTag: function (req, res, next) {
        //删除话题
        db.removeTag({_id: req.params.id}).then(function (d) {
            // d.result.ok = 1 为删除成功
            res.json({error: 0, messages: {title: '删除成功', body: '话题删除成功！'}});
        }, function (err) {
            next(err);
        });

    },
    editTag: function (req, res, next) {
        /**
         * 编辑话题
         * 前端ajax提交传入 tag 类：{tag_name:String,tag_description:String,tag_keyword:String,tag_nav:Boolean}
         */
        db.updateTag({tag_name: req.body.tag_name}, req.body).then(function (d) {
            if (d[0].ok === 1) {
                res.json({error: 0, messages: {title: '编辑成功', body: '话题编辑成功！'}});
            } else {
                res.json({error: 100, message: {title: '编辑失败', body: '数据库存储错误，编辑失败' + d.nModified}});
            }
        });

    },
    //编辑文章时若删除tag，则自动将tags Documents 的 tag_num 减一
    changeTag: function (req, res, next) {

        if(config.debug) console.log(req.params.tag_name, req.query.opt);

        db.checkTag({tag_name: req.params.tag_name}).then(function (d) {
            //处理tags文档
            if(req.query.opt === 'del'){
                db.updateTag({tag_name: req.params.tag_name}, {tag_num: d.tag_num - 1}).then(function (d) {
                    res.json({error: 0, messages: {title: '更新成功',body:'删除tag成功'}});
                });
            }else if(req.query.opt === 'add'){
                db.updateTag({tag_name: req.params.tag_name}, {tag_num: d.tag_num + 1}).then(function (d) {
                    res.json({error: 0, messages: {title: '更新成功',body:'添加tag成功'}});
                });
            }else{
                res.json({error: 100, messages: {title: '错误请求',body:'tag请求错误，请刷新重试'}});
            }


        });

    }


};


module.exports = adminCtl;