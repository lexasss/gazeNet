// ID:
//      Generates an ID as an MD5 hash based on the element position in DOM
//
// Requires:
//		md5.js

var md5 = require('md5');

// Definition

var ID = {
    get: function (target) {
        if (target.id) {
            return target.id;
        }

        var id = getElementName(target);

        var parent = target.parentElement;
        while (parent) {
            id = getElementName(parent) + '_' + id;
            parent = parent.parentElement;
        }

        target.id = md5(id); //computeHash(id) + '';
        return target.id;
    }
};

var getElementIndex = function (elem) {
    var index = 0;
    var prevSibling = elem.previousElementSibling;
    while (prevSibling) {
        index++;
        prevSibling = prevSibling.previousElementSibling;
    }
    return index;
};

var getElementName = function (elem) {
    return elem.tagName + getElementIndex(elem);
};

// Publication

module.exports = ID;
