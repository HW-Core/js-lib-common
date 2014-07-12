/*
 *  * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved
 *  * GNU General Public License version 3; see http://www.hyperweb2.com/terms/
 */

// The .bind method from Prototype.js
if (!Function.prototype.bind) { // check if native implementation available
    Function.prototype.bind = function() {
        var fn = this, args = Array.prototype.slice.call(arguments),
                object = args.shift();
        return function() {
            return fn.apply(object,
                    args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}

if (typeof assert !== 'function') {
    function assert(condition, message) {
        if (!condition)
            throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
    }
    ;
}

// ONLY FOR IE8-
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if (this[i] === what)
                return i;
            ++i;
        }
        return -1;
    };
}

//# sourceURL=share/jsmethods.js
