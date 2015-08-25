var config = require('../helpers/config');
var express = require('express');
var router = express.Router();

module.exports = function(messageBus) {

    /*
    setInterval(function(){
        console.log(messageBus.listeners('message').length);
        console.log(messageBus._events);
    }, 1000);
    */

    /* GET home page. */
    router.get('/', function(req, res) {
        config.web.host = req.hostname || config.web.host;
        res.render('index', config);
    });

    router.get('/display', function(req, res) {
        var sessions = req.db.get('sessions');
        sessions.find({ }, function (e, data) {
            res.render('display', { 
                title: data ? 'Displaying ' + data.length + ' sessions' : 'No session',
                sessions: data
            });
        });
    });

    router.get('/display/:id', function(req, res) {
        var sessions = req.db.get('sessions');
        sessions.find({ id: req.params.id }, function (e, data) {
            res.render('display', { 
                title: (data ? 'Displaying session "' : 'No such session "') + req.params.id + '"',
                sessions: data
            });
        });
    });

    // For AJAX long-polling only, should never be called with WebSocket
    /*
    router.get('/messages', function(req, res){
        console.log('GET... why not WS?');
        var addMessageListener = function(res){
            messageBus.once('message', function(data){
                res.json(data);
            });
        };
        addMessageListener(res);
    });

    router.post('/messages', function(req, res){
        console.log('POST... why not WS?');
        messageBus.emit('message', req.body);
        res.status(200).end();
    });
    */
   
    return router;
};
