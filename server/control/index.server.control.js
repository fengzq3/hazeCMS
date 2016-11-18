/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const db = require('../model/db.server.model');
const Promise = require('bluebird');


const index = {
    index: function (req, res, next) {
        /**
         * todo 分页机制
         * todo 读取系统设置，调取导航
         */
        let siteP = db.readSiteInfo();
        let navP = db.getNav(10, 0);
        let listP = db.showList(10, 0);
        Promise.all([siteP, navP, listP]).then(function (dt) {
            let data = {
                title: dt[0].site_name,
                description: dt[0].site_description,
                keywords: dt[0].site_keyword,
                list: dt[2]
            };

            console.log(dt[1]);
            // res.send(data);
            res.render('index', data);
        });
    },


};


module.exports = index;