/**
 * Created by feng on 2016/11/4.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var articleSchema = mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    tag: String
});

var article = mongoose.model('blog', articleSchema);

module.exports = {
    addArticle: function (data) {
        var art = new article(data);
        art.save(function (err) {
            console.log(err);
        });
    },
    showList: function (num, callback) {
        article
            .find()
            .exec(function (err, arts) {
                callback(arts);
            });

    },
    artDetail: function (id, callback) {

    }
};