/**
 * Created by feng on 2016/11/4.
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
mongoose.Promise = require('bluebird');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const siteSchema = new mongoose.Schema({
    site_name: String,
    site_link: String,
    site_description: String,
    site_keyword: String

});

const articleSchema = new mongoose.Schema({
    seoTitle: String,
    description: String,
    keywords: String,
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now()},
    tag: String
});

const webSite = mongoose.model('blog', siteSchema);
const article = mongoose.model('article', articleSchema);


module.exports = {
    handlerError: function (err) {
        //TODO 处理错误
        console.log(err);
    },
    readSiteInfo: function () {
        return webSite.findOne().exec();
    },
    editSiteInfo: function (query, data) {
        return webSite.find(query).update(data).exec();
    },
    createSiteInfo: function (data) {
        let site = new webSite(data);
        return site.save();
    },
    addArticle: function (data) {
        let art = new article(data);
        art.save(function (err, art) {
            console.log(art);
            if (err) return this.handlerError(err);
        });
    },
    showList: function (num, skip) {
        return article
            .find()
            .skip(skip)
            .limit(num)
            .exec();
    },
    artDetail: function (query) {
        return article
            .findOne(query)
            .exec();
    }
};