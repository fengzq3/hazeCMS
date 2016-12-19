const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

const index = require('./routes/index');
const admin = require('./routes/admin/users');
const article = require('./routes/article');
const tags = require('./routes/tags');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'hazeCMS', //用来加密的一个字符串
    resave:true,    //是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
    saveUninitialized:false, //是否设置session在存储容器中可以修改
    Cookie:{
        maxAge:1000*60*10 //过期时间10分钟（毫秒ms）
    }
}));

app.use('/', index);
app.use('/admin', admin);
app.use('/article', article);
app.use('/tags', tags);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
