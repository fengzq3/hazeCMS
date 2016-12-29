/**
 * Created by feng on 2016/12/19.
 * 用来初始化整个程序
 */
"use strict";
const config = require('../config');
const express = require('express');
const router = express.Router();
const db = require('../model/db.server.model');
const Promise = require('bluebird');

router.get('/', function (req, res, next) {
    const site = db.readSiteInfo();
    const admin = db.readAdminList();
    const artList = db.showList();

    Promise.all([site,admin,artList]).then(function (d) {
        if(config.debug) console.log(d);

        //site
        if(d[0] === null){
            db.createSiteInfo({
                site_name: 'hazeCMS',
                site_link: '',
                site_description: '',
                site_keyword: ''
            });
        }

        //admin
        if(d[1].length === 0){
            db.createAdmin({
                userName: 'admin',
                password: 'a9542bb104fe3f4d562e1d275e03f5ba',
                description:'',
                tel:''
            })
        }

        //article
        if(d[2].length === 0){
            db.addArticle({

                seoTitle: '',
                description: '',
                keywords: '',
                comments: [{body: '', date: Date.now()}],
                date: Date.now(),
                topPic: '',
                title: 'hazeCMS测试文章',
                author: 'feng',
                body: '欢迎使用hazeCMS，这是一篇测试文章',
                tags: 'tags'  //定义一个默认tags，便于后期用tag组织文章

            })
        }


        res.send('installed，添加完成测试数据 \r\n 用户名：admin \r\n 密码：feng');

    });

});

module.exports = router;