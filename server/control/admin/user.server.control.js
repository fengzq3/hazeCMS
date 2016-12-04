/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const db = require('../../model/db.server.model');


module.exports = {
    checkLogin: function (req, res, next) {
        console.log('检测登录');
        next();
    },
    index: function (req, res, next) {
        res.send('这里是用户中心首页');
    },
    login: function (req, res, next) {
        console.log(req.method);
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
                db.readSiteInfo().then(function (d) {

                    console.log(d);
                    let data;
                    if (d !== null) {
                        data = {
                            siteName: d.site_name,
                            description: d.site_description,
                            keywords: d.site_keyword,
                            link: d.site_link
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

    addArticle: function (req, res, next) {
        switch (req.method) {
            case 'GET':
                res.render('admin/addArticle');
                break;
            case 'POST':
                console.log(req.body);
                //添加文章
                db.addArticle(req.body);
                res.json({error: '0', message: {title: '操作成功', body: '文章发布成功！'}});
                break;
            default:
                let err = new Error('非法method');
                next(err);
        }

    },

    //话题列表
    tagList: function (req, res, next) {
        //todo 分页 && 序列化 tags
        db.getTagList(10, 0).then(function (tags) {

            res.render('admin/tagList', tags);
        });


    },
    delCol: function (req, res, next) {
        //删除话题

    },
    editCol: function (req, res, next) {
        //编辑话题

    }


};
