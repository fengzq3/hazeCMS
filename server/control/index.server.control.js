/**
 * Created by feng on 2016/11/4.
 * 处理错误，添加逻辑
 */
const db = require('../model/db.server.model');
const Promise = require('bluebird');
const common = require('../common');
const config = require('../config');

const index = {
    index: function (req, res, next) {
        //分页机制 若为ajax获取分页，则输出api
        let isAjax = req.query.ajax, page = req.query.page > 0 ? parseInt(req.query.page) : 1;
        //读取系统设置，调取导航
        let siteP = db.readSiteInfo();
        let navP = db.getNav();
        let listP = db.showList(config.pageSize, config.pageSize * (page - 1));
        Promise.all([siteP, navP, listP]).then(function (d) {
            //check topPic 是否存在，不存在则添加一个随机的
            d[2] = common.setArticleList(d[2]);
            //处理site信息
            d[0].site_title = d[0].site_seoTitle ? d[0].site_name + '_' + d[0].site_seoTitle : d[0].site_name;
            d[0].site_description = d[0].site_description ? d[0].site_description : '';
            d[0].site_keyword = d[0].site_keyword ? d[0].site_keyword : '';

            //最终data
            const data = {
                site: d[0],
                nav: d[1],
                content: d[2]
            };

            if (config.debug) console.log('isAjax=', isAjax);

            if (!isAjax) {
                res.render('index', data);
            } else {
                res.render('item', data);
            }


        });
    },


};


module.exports = index;