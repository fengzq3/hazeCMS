/**
 * Created by feng on 2017/1/12.
 * 搜索
 */
const config = require('../config');
const db = require('../model/db.server.model');
const Promise = require('bluebird');
const common = require('../common');

module.exports = {
    index: function (req, res, next) {
        let isAjax = req.query.ajax, page = req.query.page > 0 ? parseInt(req.query.page) : 1;
        let keyword = req.params.keyword;

        let arP = [];

        arP.push(db.readSiteInfo());
        arP.push(db.getNav());
        arP.push(db.getSearch({
            title: {
                $regex: req.params.keyword,
                $options: 'i'
            }
        }, config.pageSize, config.pageSize * (page - 1)));
        arP.push(db.getSearch({
            tags: {
                $regex: req.params.keyword,
                $options: 'i'
            }
        }, config.pageSize, config.pageSize * (page - 1)));
        arP.push(db.getSearch({
            body: {
                $regex: req.params.keyword,
                $options: 'i'
            }
        }, config.pageSize, config.pageSize * (page - 1)));


        Promise.all(arP).then(function (d) {
            let articles = common.repeatArray([].concat(d[2], d[3], d[4]));
            if (config.debug) console.log(articles);

            //check topPic 是否存在，不存在则添加一个随机的
            articles.forEach(function (e) {
                if (!e.topPic) {
                    e.topPic = '/images/topPic/' + common.getTopPic();
                }
            });
            //处理site信息
            d[0].site_title = keyword + '_' + d[0].site_name;
            d[0].site_description= keyword;
            d[0].site_keyword= keyword;

            //最终data
            let data = {
                link: {
                    baseUrl: req.baseUrl,
                    path: req.path,
                    pageName: keyword
                },
                site: d[0],
                nav: d[1],
                content: articles
            };

            if (!isAjax) {
                res.render('search', data);
            } else {
                res.render('item', data);
            }

        });


    },
    formCommit: function (req, res, next) {
        res.redirect('/search/' + req.body.keyword);
    }
};