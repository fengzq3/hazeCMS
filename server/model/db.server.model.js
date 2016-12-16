/**
 * Created by feng on 2016/11/4.
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
mongoose.Promise = require('bluebird');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

//全局设置项
const siteSchema = new mongoose.Schema({
    site_name: String,
    site_link: String,
    site_description: String,
    site_keyword: String

});

//admin用户
const adminSchema = new mongoose.Schema({
    userName: String,
    password: String,
    description:String,
    tel:String,
    date:{type:Date,default:Date.now()}

});

//话题
const tagsSchema = new mongoose.Schema({
    tag_name: String,
    tag_description: String,
    tag_keyword: String,
    tag_nav:{type:Boolean,default:0},
    tag_num: {type:Number,default:0},
    date: {type: Date, default: Date.now()}
});

//文章
const articleSchema = new mongoose.Schema({
    seoTitle: String,
    description: String,
    keywords: String,
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now()},
    tags: {type:String,default:'tags'},  //定义一个默认tags，便于后期用tag组织文章
    topPic: String
});

const webSite = mongoose.model('blog', siteSchema);
const admins = mongoose.model('admin', adminSchema);
const article = mongoose.model('article', articleSchema);
const tags = mongoose.model('tag', tagsSchema);

module.exports = {
    //网站信息
    readSiteInfo: function () {
        return webSite.findOne().exec();
    },
    editSiteInfo: function (query, data) {
        return webSite.update(query,data).exec();
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
        return admins.update(query,data).exec();
    },
    createAdmin: function (data) {
        let admin = new admins(data);
        return admin.save();
    },
    //文章
    addArticle: function (data) {
        let art = new article(data);
        return art.save();
    },
    updateArticle: function (query,data) {
        return article.update(query,data);
    },
    removeArticle:function (query) {
        return article.remove(query);
    },
    showList: function (num, skip) {
        return article
            .find()
            .sort({date:-1})
            .skip(skip)
            .limit(num)
            .exec();
    },
    artDetail: function (query) {
        return article
            .findOne(query)
            .exec();
    },
    /**
     * 上一篇下一篇查询
     * 传入query，返回一个object，里面含有两个 promise
     */

    prevNext:function (query) {
        let thisDate = query.date;
        return {
            prev:article.find({date:{$lt:thisDate}}).sort({date:-1}).limit(1).exec(),
            next:article.find({date:{$gt:thisDate}}).sort({date:1}).skip(1).limit(1).exec()
        };
    },
    /**
     * todo 导航
     * 导航由话题中提取，详见readme
     * 导航使用tag list
     */

    getNav: function () {
        return tags
            .find({tag_nav:true})
            .exec();
    },

    //话题列表
    getTagList: function (num,skip) {
        return tags
            .find()
            .sort({date:-1})
            .skip(skip)
            .limit(num)
            .exec();
    },
    addTag:function (data) {
        let tag = new tags(data);
        return tag.save();
    },
    removeTag:function (query) {
        return tags.remove(query);
    },
    updateTag:function (query,data) {
        return tags.update(query,data).exec();
    },
    checkTag: function (query) {
        //用于手动添加tag时检测是否重复
        return tags.findOne(query).exec();
    },

    //话题详情-文章列表
    getTagArticle: function (query, num, skip) {
        return article
            .find({tags: {$regex: query, $options: 'i'}})
            .skip(skip)
            .limit(num)
            .exec();
    }

};