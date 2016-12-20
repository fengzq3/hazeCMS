/**
 * Created by feng on 2016/12/9.
 * 前台article 详情页面
 */
const config = require('../config');
const db = require('../model/db.server.model');
const Promise = require('bluebird');
const common = require('../common');

const article = {
    articleDetail: function (req, res, next) {
        /**
         * 访问连接为：article/id
         * 读取id，查询详情
         */

        let detail = db.artDetail({_id: req.params.id});


        detail.then(function (dt) {
            if (config.debug) console.log(dt);

            //判断空id
            if(dt === null) return next();
            //获取tag列表
            let tgAr = dt.tags ? dt.tags.split(',') : [];
            let articleAr = [];
            articleAr.push(db.readSiteInfo());
            articleAr.push(db.getNav());
            //根据tag查询相关文章
            for (let i = 0; i < tgAr.length; i++) {
                articleAr.push(db.getTagArticle(tgAr[i], 3, 0));
            }

            //最终渲染
            Promise.all(articleAr).then(function (d) {
                //处理相关文章数据
                let relatesArr = [];
                if (tgAr.length > 0) {
                    for (let i = 2; i < tgAr.length + 2; i++) {
                        relatesArr = relatesArr.concat(d[i]);
                    }
                }
                //相关文章数组去重
                const relates = common.repeatArray(relatesArr);

                if (config.debug) console.log(relates);

                const data = {
                    link: {
                        baseUrl: req.baseUrl,
                        path: req.path
                    },
                    user: req.session.user,
                    site: {
                        site_name: d[0].site_name,
                        site_title: dt.title + '_' + d[0].site_name,
                        site_link: d[0].site_link,
                        site_description: dt.body.substr(0, 160),
                        site_keyword: dt.tags
                    },
                    nav: d[1],
                    content: dt,
                    relate: relates
                };

                res.render('article', data);
            });
            //内premise END

        }, function (e) {
            next(e);
        });


    },
    prevNext: function (req, res, next) {
        /**
         * 根据时间，查询上一篇下一篇内容
         */
        let pn = db.prevNext({date: new Date(req.body.date)});
        Promise.all([pn.prev, pn.next]).then(function (d) {
            // if(config.debug) console.log(d);
            res.json(d);
        });
    }
};

module.exports = article;