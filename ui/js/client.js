// Client:
//      Creates a WebSocket connection to the server, posts and receives gaze data

// Constructor

function Client() {
    var transport = window.WebSocket ? Client.WebSocket : Client.LongPoll;
    transport.setup.call(this);
    
    this.subscribe = transport.subscribe;
    this.publish = transport.publish;
}

// Properties

// Settings with default values, should be updated in .jade with values from npm.config
Client.port = 3000;
Client.host = 'localhost';

// Mehtods of this property will result in error: jQuery is not used in this project
Client.LongPoll = {
    /*
    setup: function () {
        if (!root.jQuery) {
            alert('This page will not function properly: cannot stream data to the server');
        }
    },
    subscribe: function (callback) {
        var longPoll = function(){
            $.ajax({
                method: 'GET',
                url: '/messages', 
                success: function(data){
                    callback(data);
                },
                complete: function(){
                    longPoll();
                },
                timeout: 3000
            });
        };
        longPoll();
    },
    publish: function(data) {
        $.post('/messages', data);
    }*/
};

Client.WebSocket = {
    setup: function () {
        this.socket = new WebSocket('ws://' + Client.host + ':' + Client.port);
    },
    subscribe: function (callback) {
        this.socket.onmessage = function (event) {
            callback(JSON.parse(event.data));
        };
    },
    publish: function (data) {
        this.socket.send(JSON.stringify(data));
    }
};

// Publication

module.exports = Client;