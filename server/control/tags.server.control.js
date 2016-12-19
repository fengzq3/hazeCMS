/**
 * Created by feng on 2016/12/9.
 * 前台article 详情页面
 */
const config = require('../config');
const db = require('../model/db.server.model');
const Promise = require('bluebird');

const tags = {
    index: function (req, res, next) {
        /**
         * todo tags首页，列出tag列表
         */
        let siteP = db.readSiteInfo();
        let navP = db.getNav();
    },
    item: function (req, res, next) {
        /**
         * 访问链接为：tags/tag_name
         * 读取tag_name，查询详情
         */
        let siteP = db.readSiteInfo();
        let navP = db.getNav();
        let tagArP = db.getTagArticle(req.params.name, 20, 0);
        let tagP = db.checkTag({tag_name:req.params.name});

        Promise.all([siteP, navP, tagArP, tagP]).then(function (d) {
            let data = {
                link: {
                    baseUrl: req.baseUrl,
                    path: req.path,
                    pageName: req.params.name
                },
                user: req.session.user,
                site: {
                    site_name: d[0].site_name,
                    site_title: req.params.name + '_' + d[0].site_name,
                    site_link:d[0].site_link,
                    site_description:d[3].tag_description,
                    site_keyword:d[3].tag_keyword
                },
                nav: d[1],
                content: d[2]
            };
            res.render('tags', data);
        });

    }

};

module.exports = tags;