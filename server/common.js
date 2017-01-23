/**
 * Created by feng on 2016/12/12.
 * 一个公共方法库，提取一些可能会重复用到的方法到独立文件
 */
const config = require('./config');
const path = require('path');
const fs = require('fs');
// const _ = require('lodash');
const moment = require('moment');
moment.locale('zh-cn');

const common = {
    /**
     * 传入2个数组，返回2数组中的不同数据
     * @param ar1
     * @param ar2
     * @returns {Array}
     */
    mergeArray: function (ar1, ar2) {
        let newAr = [];
        for (let i = 0; i < ar1.length; i++) {
            if (ar2.indexOf(ar1[i]) < 0) {
                newAr.push(ar1[i]);
            }
        }
        //第二循环
        for (let i = 0; i < ar2.length; i++) {
            if (ar1.indexOf(ar2[i]) < 0) {
                newAr.push(ar2[i]);
            }
        }

        return newAr;
    },
    /**
     * 数组合并去重
     * 传入1个数组，去重后返回
     *
     * 思路：
     * 映射一个id数组，用来对比重复项，由于objectId 无法对比，全部转换成string
     *
     * @param arr
     * @returns {Array}
     */
    repeatArray: function (arr) {
        let result = [];
        let resId = [];

        //若arr不存在则返回空数组，为了兼容api格式
        if (arr.length === 0) return [];

        //循环去重
        for (let i = 0; i < arr.length; i++) {
            if (resId.indexOf(JSON.stringify(arr[i]._id)) < 0) {
                resId.push(JSON.stringify(arr[i]._id));
                result.push(arr[i]);
            }
        }

        // if (config.debug) {
        //     console.log(result);
        //     console.log(resId);
        // }

        return result;

    },
    /**
     * 获取随机topPic
     * @returns {*}
     */
    getTopPic: function () {
        //读取files
        const files = fs.readdirSync(path.join(config.root, '/public/images/topPic'));
        // if (config.debug) {
        //     console.log(typeof files);
        //     console.log(files);
        // }

        const index = Math.round((files.length - 1) * Math.random());

        return files[index];
    },
    /**
     * 处理文章列表的一些格式，使其更友好，更易读
     * @param arr
     * @returns {*}
     */
    setArticleList:function (arr) {
        //check topPic 是否存在，不存在则添加一个随机的
        arr.forEach(function (e, key) {
            //处理空topPic
            if (!e.topPic) {
                e.topPic = '/images/topPic/' + common.getTopPic();
            }
            //处理tag
            if (!!e.tags) {
                let tagsAr = e.tags.split(',');
                e.newTag = [];

                //只取前2个tag
                if (tagsAr.length > 2) {
                    e.newTag.push(tagsAr[0].substr(0, 1));
                    e.newTag.push(tagsAr[1].substr(0, 1));
                } else {
                    e.newTag.push(tagsAr[0].substr(0, 1));
                }
            }
            //处理content date
            if (key > 2) {
                e.fDate = moment(e.date).format("YYYY-MM-D");
            } else {
                e.fDate = moment(e.date, "YYYY-MM-D").fromNow();
            }


            if (config.debug) {
                console.log(e.fDate);
            }

        });

        return arr;
    }
};

module.exports = common;