// GazeNet:
//      Gaze data sharing initialization and page configuration routine
//
// Requires:
//      gazeTargets.js

var roles = require('../../helpers/shared/roles');
var Client = require('./client');
var Event = require('./event');

(function GazeNet() {

    var client = new Client();

    var configForm = document.querySelector('#config-form');

    configForm.addEventListener('submit', function (evt) {
        config();
        subscribe();
        evt.preventDefault();
        return false;
    });

    var config = function () {

        var config = {
            source: window.location.pathname,
            sources: window.location.pathname,
            role: (document.querySelector('#config-role-receiver').checked ? roles.receiver : roles.none) |
                  (document.querySelector('#config-role-sender').checked ? roles.sender : roles.none)
        };

        client.publish({
            config: config,

        });

        configForm.style.display = 'none';
        if (config.role & roles.sender) {
            initGazeTargets();
        }
    };

    var subscribe = function () {
        var log = document.querySelector('#log');
        
        client.subscribe(function (data) {
            var newMessage = document.createElement('p');
            newMessage.textContent = Event.stringify(data.event);
            log.appendChild(newMessage);
        });
    };

    var initGazeTargets = function () {
        var gtWarning =  document.querySelector('#gt-warning');
        gtWarning.style.display = 'block';

        GazeTargets.init({ /* use only default settings */ }, {
            target: function (event, target) {
                client.publish({
                    event: Event.create(event, target),
                    source: window.location.pathname
                });
            },
            state: function (state) {
                if (state.isConnected) {
                   gtWarning.style.display = 'none';
                }
            }
        });
    };
})();

// Publication

//window.GazeNet = GazeNet;
