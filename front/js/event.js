// Event:
// 		Utils to process events received via WebSocket

var ID = require('./id');

// Definition

var Event = {
    create: function (name, element) {
        return {
            name: name,
            target: ID.get(element)
        };
    },
    stringify: function (event) {
        return '[ ' + event.target + ' ] ' + event.name;
    }
};

// Publication

module.exports = Event;