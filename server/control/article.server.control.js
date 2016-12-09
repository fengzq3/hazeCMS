/**
 * Created by feng on 2016/12/9.
 */
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
        let prevNext = db.prevNext({_id:req.params.id});

        Promise.all([siteP,navP,detail,prevNext.prev,prevNext.next]).then(function (d) {
            const data = {
                site: d[0],
                nav: d[1],
                content: d[2],
                prev:d[3],
                next:d[4]
            };

            res.render('article',data);
        },function (e) {
            next(e);
        });

    }
};

module.exports = article;