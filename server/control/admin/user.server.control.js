/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const db = require('../../model/db.server.model');


module.exports = {
    checkLogin:function (req,res,next) {
        console.log('检测登录');
        next();
    },
    index:function (req, res, next) {
        res.send('这里是用户中心首页');
    },
    login:function (req,res,next) {
        console.log(req.method);
        let method = req.method;
        if(method === 'GET'){
            res.render('admin/login');
        }else if(method === 'POST'){
            res.json({error:0,messages:'登录成功成功'});
        }else{
            let err = new Error('非法method');
            next(err);
        }
    },

    //users方法
    siteInfo: function (req, res, next) {
        let method = req.method;
        if(method === 'GET'){
            db.readSiteInfo().then(function (d) {
                let data = {
                    title: '创建网站信息 ' + d.site_name,
                    description: d.site_description,
                    keywords: d.site_keyword
                };
                res.render('admin/siteInfo', data);
            });
        }else if(method === 'POST'){
            //接收post信息
            let site = db.readSiteInfo();
            site.then(function (info) {
                if (!info) {
                    //不存在则创建
                    db.createSiteInfo(req.body).then(function (r) {
                        //保存和更新返回 r 数据格式：{"ok":1,"nModified":1,"n":1}
                        res.send(r);
                    });
                } else {
                    //存在记录则更新
                    db.editSiteInfo({_id: info.id}, req.body).then(function (r) {
                        res.send(r);
                    });
                }
            });
        }else{
            let err = new Error('非法method');
            next(err);
        }

    },


};
