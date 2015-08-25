// ## Common for ExpressJS: dependencies

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// ## GazeNet -specific

var mongo = require('mongodb');
var monk = require('monk');
var config = require('./helpers/config');

var EventEmitter = require('events').EventEmitter;
var messageBus = new EventEmitter();
messageBus.setMaxListeners(50);
app.set('messageBus', messageBus);

var db = monk(config.db.host + ':' + config.db.port + '/' + config.db.name);
var sessions = db.get('sessions');
app.set('sessions', sessions);

var routes = require('./routes/index')(messageBus);

app.use('/display', function (req, res, next) {
    req.db = db;
    next();
});

// ## Common for ExpressJS: config

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view cache', true);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/libs/gt')));

app.use('/', routes);

// ## Common for ExpressJS: Error handling

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
