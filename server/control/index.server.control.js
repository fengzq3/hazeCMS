/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const db = require('../model/db.server.model');
const Promise = require('bluebird');
const common = require('../common');

const index = {
    index: function (req, res, next) {
        //分页机制 若为ajax获取分页，则输出api
        let isAjax = req.params.ajax;
        //读取系统设置，调取导航
        let siteP = db.readSiteInfo();
        let navP = db.getNav();
        let listP = db.showList(13, 0);
        Promise.all([siteP, navP, listP]).then(function (d) {
            //check topPic 是否存在，不存在则添加一个随机的
            d[2].forEach(function (e) {
                if (!e.topPic) {
                    e.topPic = '/images/topPic/' + common.getTopPic();
                }
            });

            //最终data
            const data = {
                site: d[0],
                nav: d[1],
                content: d[2]
            };

            if(!isAjax){
                res.render('index', data);
            }else{
                res.render('item',data);
            }


        });
    },


};


module.exports = index;