/**
 * Created by feng on 2016/11/3.
 */

"use strict";
const webpack = require('webpack');


module.exports = {

    //页面入口
    entry: {
        commons: ['jquery', 'bts'],
        main: './js/main.js'
    },
    //输出配置
    output: {
        path: '../server/',
        filename: 'public/javascripts/[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
                compact: false
            }
        }]
    },
    resolve: {
        alias: {
            bts: './js/bootstrap'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'public/javascripts/common.bundle.js'
        }),

        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        drop_console: true,
        //        warnings: false
        //    }
        //}),
        //全局引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]

};
