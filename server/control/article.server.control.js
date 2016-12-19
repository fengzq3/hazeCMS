/**
 * Created by feng on 2016/12/9.
 * 前台article 详情页面
 */
const config = require('../config');
const db = require('../model/db.server.model');
const Promise = require('bluebird');

const article = {
    articleDetail: function (req,res,next) {
        /**
         * 访问连接为：article/id
         * 读取id，查询详情
         */
        let siteP = db.readSiteInfo();
        let navP = db.getNav();
        let detail = db.artDetail({_id:req.params.id});

        Promise.all([siteP,navP,detail]).then(function (d) {
            const data = {
                link: {
                    baseUrl: req.baseUrl,
                    path: req.path
                },
                user: req.session.user,
                site: {
                    site_name: d[0].site_name,
                    site_title: d[2].title + '_' + d[0].site_name,
                    site_link:d[0].site_link,
                    site_description:d[2].body.substr(0,160),
                    site_keyword:d[2].tags
                },
                nav: d[1],
                content: d[2]
            };

            res.render('article',data);
        },function (e) {
            next(e);
        });

    },
    prevNext:function (req, res, next) {
        /**
         * 根据时间，查询上一篇下一篇内容
         */
        let pn = db.prevNext({date:new Date(req.body.date)});
        Promise.all([pn.prev,pn.next]).then(function (d) {
            // if(config.debug) console.log(d);
            res.json(d);
        });
    }
};

module.exports = article;