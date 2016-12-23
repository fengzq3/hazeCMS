/**
 * Created by feng on 2016/11/3.
 */

"use strict";
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    //页面入口
    entry: {
        commons: ['jquery', 'bts'],
        main: './js/main.js',
        admin:'./js/admin.js',
        editor:'./js/editor.js'
    },
    //输出配置
    output: {
        path: '../server/public/',
        filename: 'javascripts/[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            query: {
                presets: ['es2015','stage-0'],
                compact: false
            }
        },{
            test:/\.css$/,
            loader:ExtractTextPlugin.extract("style-loader","css-loader")
        },{
            test:/\.(eot|svg|ttf|woff|woff2)\w*/,
            loader:"file?name=/fonts/[name].[ext]"
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
            filename: 'javascripts/common.bundle.js'
        }),
        //提取js中的css
        new ExtractTextPlugin('stylesheets/editor.css'),

        new webpack.optimize.UglifyJsPlugin({
           compress: {
               // drop_console: true,
               warnings: false
           }
        }),
        //全局引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]

};
