/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const db = require('../../model/db.server.model');


module.exports = {

    //users方法
    siteInfo: function (req, res, next) {
        db.readSiteInfo().then(function (d) {
            let data = {
                title: '创建网站信息 ' + d.site_name,
                description: d.site_description,
                keywords: d.site_keyword
            };
            res.render('admin/siteInfo', data);
        });
    },

    postSiteInfo: function (req, res, next) {
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

    }
};
