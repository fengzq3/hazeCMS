/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const config = require('../../config.js');
const db = require('../../model/db.server.model');
const Promise = require('bluebird');
const common = require('../../common');
const crypto = require('crypto');

const adminCtl = {
    checkLogin: function (req, res, next) {
        if (config.debug) {
            console.log('检测登录');
            console.log('originalUrl:' + req.originalUrl);
            console.log('baseUrl:' + req.baseUrl);
            console.log('path:' + req.path);
            console.log('session.user:' + req.session.user);
            console.log('req.method:' + req.method);
        }

        if (req.session.user || req.path === '/login' || req.path === '/logout') {
            next();
        } else {
            if (req.method === 'GET') {
                res.redirect(req.baseUrl + '/login');
            } else {
                res.json({error: 200, messages: {title: '请登陆', body: '请先登陆后再进行此操作'}, forward: req.baseUrl + '/login'});
            }


        }

    },
    index: function (req, res, next) {
        const siteP = db.readSiteInfo();
        const navP = db.getNav();

        Promise.all([siteP, navP]).then(function (d) {
            let data = {
                link: {
                    baseUrl: req.baseUrl,
                    path: req.path
                },
                site: d[0],
                nav: d[1],
                user: req.session.user
            };
            res.render('admin/index', data);
        });

    },
    login: function (req, res, next) {
        let method = req.method;
        if (method === 'GET') {
            if (!!req.session.user) {
                res.redirect(req.baseUrl);
            } else {
                const siteP = db.readSiteInfo();
                const navP = db.getNav();

                Promise.all([siteP, navP]).then(function (d) {
                    let data = {
                        link: {
                            baseUrl: req.baseUrl,
                            path: req.path
                        },
                        site: d[0],
                        nav: d[1],
                        user: req.session.user
                    };
                    res.render('admin/login', data);
                });
            }

        } else if (method === 'POST') {
            //校验用户&密码
            req.assert('userName', '用户名不能为空').notEmpty();
            req.assert('password', '密码不能为空').notEmpty();
            let errors = req.validationErrors();
            if (errors && errors.length > 0) {
                let errMsg = [];
                for (let i = 0; i < errors.length; i++) {
                    errMsg.push(errors[i].msg);
                }
                res.json({error: 300, messages: {title: '信息填写不完整', body: errMsg.join(',')}});
            } else {
                //通过校验后比对用户密码
                db.getAdmin({userName: req.body.userName}).then(function (d) {
                    // if (config.debug) console.log(d);
                    if (!!d) {
                        req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
                        if (req.body.password === d.password) {
                            //登陆成功，处理 session
                            req.session.user = req.body;

                            res.json({error: 0, messages: {title: '登陆成功', body: `登陆成功，${d.userName} 欢迎回来！`}});
                        } else {
                            res.json({error: 500, messages: {title: '登陆失败', body: `登陆失败，用户名或密码错误！`}});
                        }
                    } else {
                        res.json({error: 100, messages: {title: '登陆失败', body: `登陆失败，用户名或密码错误！或无此用户！`}});
                    }
                });
            }

        } else {
            let err = new Error('非法method');
            next(err);
        }
    },
    //退出登陆
    logout: function (req, res, next) {
        req.session.user = null;
        res.json({error: 0, messages: {title: '退出登陆', body: '用户已注销！'}});
    },
    //用户获取
    userList: function (req, res, next) {
        switch (req.method) {
            case 'GET':
                const siteP = db.readSiteInfo();
                const navP = db.getNav();
                const usersP = db.readAdminList(20, 0);

                Promise.all([siteP, navP, usersP]).then(function (d) {
                    let data = {
                        link: {
                            baseUrl: req.baseUrl,
                            path: req.path
                        },
                        site: d[0],
                        nav: d[1],
                        content: d[2],
                        user: req.session.user
                    };
                    res.render('admin/userList', data);
                });

                break;
            case 'POST':
                req.assert('userName', '用户名不能为空').notEmpty();
                req.assert('password', '密码不能为空').notEmpty();
                //处理错误
                let errors = req.validationErrors();
                if (errors && errors.length > 0) {
                    let error = [];
                    for (let i = 0; i < errors.length; i++) {
                        error.push(errors[i].msg);
                    }
                    res.json({error: 300, messages: {title: '信息填写不完整', body: error.join(',')}});
                } else {
                    //处理数据，md5加密
                    req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');

                    if (config.debug) console.log(req.body);
                    //开始提交
                    db.createAdmin(req.body).then(function (d) {
                        res.json({error: 0, messages: {title: '添加用户成功', body: '您已成功添加一个用户！'}});
                    }, function () {
                        res.json({error: 100, messages: {title: '添加用户失败', body: '由于数据库发生了一些错误，添加用户失败！'}});
                    });
                }


                break;
            default:
                let err = new Error('非法method');
                next(err);
        }
    },

    editUser: function (req, res, next) {

        //check user 检测提交表单
        req.assert('userName', '用户名不能为空').notEmpty();
        req.assert('password', '密码不能为空').notEmpty();
        //处理错误
        let errors = req.validationErrors();
        if (errors && errors.length > 0) {
            let error = [];
            for (let i = 0; i < errors.length; i++) {
                error.push(errors[i].msg);
            }
            res.json({error: 300, messages: {title: '信息填写不完整', body: error.join(',')}});
        } else {
            //加密密码
            req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');

            db.editAdmin({_id: req.params.id}, req.body).then(function (d) {
                res.json({error: 0, messages: {title: '修改用户成功', body: '您已成功修改一个用户！'}});
            }, function () {
                res.json({error: 100, messages: {title: '修改用户失败', body: '由于数据库发生了一些错误，修改用户失败！'}});
            });
        }

    },

    //users方法
    siteInfo: function (req, res, next) {
        switch (req.method) {
            case 'GET':
                const siteP = db.readSiteInfo();
                const navP = db.getNav();

                Promise.all([siteP, navP]).then(function (d) {

                    if (config.debug) console.log(d);

                    let data;
                    if (d.length !== 0) {
                        data = {
                            link: {
                                baseUrl: req.baseUrl,
                                path: req.path
                            },
                            site: d[0],
                            nav: d[1],
                            user: req.session.user
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
        const page = req.query.page > 0 ? parseInt(req.query.page) : 1;
        //与index 中相似调用
        let siteP = db.readSiteInfo();
        let navP = db.getNav();
        let listP = db.showList(config.adminPageSize, config.adminPageSize * (page - 1));
        //总文章数
        let articleCont = db.getArticleCont({});

        Promise.all([siteP, navP, listP, articleCont]).then(function (d) {

            let pages = Math.ceil(d[3] / config.adminPageSize);

            const data = {
                link: {
                    baseUrl: req.baseUrl,
                    path: req.path
                },
                site: d[0],
                nav: d[1],
                content: d[2],
                user: req.session.user,
                pages: {
                    cont: d[3],
                    allPage: pages,
                    page: page
                }
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
                        link: {
                            baseUrl: req.baseUrl,
                            path: req.path
                        },
                        user: req.session.user,
                        site: d[0],
                        nav: d[1]
                    };
                    res.render('admin/addArticle', data);
                });

                break;
            case 'POST':
                req.assert('title', '标题不能为空').notEmpty();
                let errors = req.validationErrors();
                if (errors && errors.length > 0) {
                    let error = [];
                    for (let i = 0; i < errors.length; i++) {
                        error.push(errors[i].msg);
                    }
                    res.json({error: 300, messages: {title: '信息不全', body: error.join(',')}});
                } else {
                    //处理添加时间
                    req.body.date = Date.now();

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

                            if (config.debug) console.log(tagAr[i]);

                            if (tagAr[i]) {
                                db.checkTag({tag_name: tagAr[i]}).then(function (d) {
                                    if (!!d) {
                                        pAr.push(db.updateTag({tag_name: tagAr[i]}, {tag_num: d.tag_num + 1}));
                                    } else {
                                        pAr.push(db.addTag({tag_name: tagAr[i], tag_num: 1}));
                                    }
                                })
                            }

                        }
                    }

                    Promise.all(pAr).then(function (d) {
                        res.json({error: 0, messages: {title: '操作成功', body: '文章发布成功！'}});
                    });
                }


                break;
            default:
                let err = new Error('非法method');
                next(err);
        }

    },
    //删除文章article
    delArticle: function (req, res, next) {


        db.artDetail({_id: req.params.id}).then(function (d) {
            //处理tag
            let ar = [];

            if (config.debug) console.log(d);
            const tagAr = d.tags.split(',');
            if (tagAr.length !== 0) {
                for (let i = 0; i < tagAr.length; i++) {
                    if (tagAr[i]) {
                        db.checkTag({tag_name: tagAr[i]}).then(function (tag) {
                            if (!!tag) {
                                ar.push(db.updateTag({tag_name: tagAr[i]}, {tag_num: tag.tag_num - 1}));
                            }
                        })
                    }

                }
            }

            ar.push(db.removeArticle({_id: req.params.id}));

            Promise.all(ar).then(function (d) {
                if (d[0].result.ok === 1) {
                    res.json({error: 0, messages: {title: '删除成功', body: '删除一篇文章成功！'}});
                } else {
                    res.json({error: 100, messages: {title: '删除失败', body: '删除一篇文章失败！可能原因为数据库操作错误！'}});
                }
            });

        }, function (err) {
            res.json({error: 0, messages: {title: '删除失败', body: '文章不存在或已经被删除！'}});
        });


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
                        link: {
                            baseUrl: req.baseUrl,
                            path: req.path
                        },
                        user: req.session.user,
                        site: d[0],
                        nav: d[1],
                        content: d[2]
                    };

                    res.render('admin/editArticle', data);
                }, function (e) {
                    next(e);
                });
                break;
            case 'POST':
                //处理修改时间
                req.body.date = Date.now();
                //处理tag
                let pAr = [];
                pAr.push(db.updateArticle({_id: req.params.id}, req.body));

                if (config.debug) console.log(req.body.tags);

                //tag块
                db.artDetail({_id: req.params.id}).then(function (d) {
                    let newAr = req.body.tags.split(',');
                    let oldAr = d.tags.split(',');

                    let tagAr = common.mergeArray(newAr, oldAr);

                    //若话题存在则tag_num -1，不存在则添加
                    if (tagAr.length !== 0) {
                        for (let i = 0; i < tagAr.length; i++) {

                            if (config.debug) console.log(tagAr[i]);

                            if (tagAr[i]) {
                                db.checkTag({tag_name: tagAr[i]}).then(function (d) {
                                    if (!d) {
                                        pAr.push(db.addTag({tag_name: tagAr[i], tag_num: 1}));
                                    } else {
                                        pAr.push(db.updateTag({tag_name: tagAr[i]}, {tag_num: d.tag_num - 1}));
                                    }
                                })
                            }

                        }
                    }
                    //存储文章修改
                    Promise.all(pAr).then(function (d) {
                        if (config.debug) console.log(d);
                        if (d[0].ok === 1) {
                            res.json({error: 0, messages: {title: '文章修改成功', body: '文章修改成功！'}});
                        } else {
                            res.json({error: 100, messages: {title: '修改失败', body: '文章修改失败！可能出现了一些错误 '}});
                        }

                    });

                    //tag 块END
                }, function (err) {
                    res.json({error: 300, messages: {title: "内部错误", body: "读取原始tag出错，无法提交修改"}});
                });

                break;
            default:
                let err = new Error('非法method');
                next(err);

        }
    },

    //话题列表
    tagList: function (req, res, next) {
        //分页 && 序列化 tags
        const page = req.query.page > 0 ? parseInt(req.query.page) : 1;

        if (config.debug) console.log(page);

        const siteP = db.readSiteInfo();
        const navP = db.getNav();
        const tagsP = db.getTagList(config.adminPageSize, config.adminPageSize * (page - 1));
        //总文章数
        const tagCont = db.getTagCont({});


        switch (req.method) {
            case 'GET':
                Promise.all([siteP, navP, tagsP, tagCont]).then(function (d) {

                    if (config.debug) console.log(d[3]);

                    const pages = Math.ceil(d[3] / config.adminPageSize);
                    const data = {
                        link: {
                            baseUrl: req.baseUrl,
                            path: req.path
                        },
                        user: req.session.user,
                        site: d[0],
                        nav: d[1],
                        content: d[2],
                        pages: {
                            cont: d[3],
                            allPage: pages,
                            page: page
                        }
                    };
                    res.render('admin/tagList', data);
                });

                break;
            case 'POST':
                //话题添加时间
                req.body.date = Date.now();
                //处理话题添加
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
        db.updateTag({_id: req.params.id}, req.body).then(function (d) {
            if (config.debug) console.log(d);
            //d { ok: 1, nModified: 0, n: 1 }
            if (d.ok === 1) {
                res.json({error: 0, messages: {title: '编辑成功', body: '话题编辑成功！'}});
            } else {
                res.json({error: 100, message: {title: '编辑失败', body: '数据库存储错误，编辑失败' + d.nModified}});
            }
        });

    },
    //编辑文章时若删除tag，则自动将tags Documents 的 tag_num 减一
    changeTag: function (req, res, next) {

        if (config.debug) console.log(req.params.tag_name, req.query.opt);

        db.checkTag({tag_name: req.params.tag_name}).then(function (d) {
            //处理tags文档
            if (req.query.opt === 'del') {
                db.updateTag({tag_name: req.params.tag_name}, {tag_num: d.tag_num - 1}).then(function (d) {
                    res.json({error: 0, messages: {title: '更新成功', body: '删除tag成功'}});
                });
            } else if (req.query.opt === 'add') {
                db.updateTag({tag_name: req.params.tag_name}, {tag_num: d.tag_num + 1}).then(function (d) {
                    res.json({error: 0, messages: {title: '更新成功', body: '添加tag成功'}});
                });
            } else {
                res.json({error: 100, messages: {title: '错误请求', body: 'tag请求错误，请刷新重试'}});
            }


        });

    }


};


module.exports = adminCtl;