/**
 * Created by feng on 2016/11/4.
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
mongoose.Promise = require('bluebird');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//全局设置项
const siteSchema = new mongoose.Schema({
    site_name: String,
    site_link: String,
    site_description: String,
    site_keyword: String

});

//admin用户
const adminSchema = new mongoose.Schema({
    admin_name: String,
    admin_password: String,

});

//主导航
const navSchema = new mongoose.Schema({
    nav_name: String,
    nav_link: String,
    nav_Type: String,
    nav_child: []
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
const admins = mongoose.model('admin', adminSchema);
const article = mongoose.model('article', articleSchema);
const mainNav = mongoose.model('navigation', navSchema);

module.exports = {
    handlerError: function (err) {
        //TODO 处理错误
        console.log(err);
    },
    //网站信息
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
    //管理中心用户
    readAdminList: function (num, skip) {
        return admins.find().skip(skip).limit(num).exec();
    },
    editAdmin: function (query, data) {
        return admins.find(query).update(data).exec();
    },
    createAdmin:function (data) {
        let admin = new admins(data);
        return admin.save();
    },
    //文章
    addArticle: function (data) {
        let art = new article(data);
        //todo 这里是做个测试art是否有返回，实际应该直接return 一个 promise

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
    },
    //导航
    getNav: function (num, skip) {
        return mainNav
            .find()
            .skip(skip)
            .limit(num)
            .exec();
    },
    setNav: function (query, data) {
        return mainNav.find(query).update(data).exec();
    },
    createNav: function (data) {
        let nav = new mainNav(data);
        return nav.save();
    }

};