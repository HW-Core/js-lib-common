/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
var Hw2 = Hw2 || {}; // namespace

Hw2.Event = (function() {
    var pub = _Event.prototype;
    var pub_st = _Event;

    var instances = [];

    //CONSTRUCTOR
    function _Event() {
        this.triggers = [];
    }

    pub.bind = function(obj) {
        this.triggers.push(obj);
    };

    pub.unbind = function(obj) {
        Hw2.Array.remove(this.triggers, obj);
    };

    pub.trigger = function(func, data) {
        for (index = 0; index < this.triggers.length; ++index) {
            var f = this.triggers[index][func];
            if (typeof f === 'function')
                var bFunc = f.bind(this.triggers[index], data);
            bFunc(); // launch bounded function
        }
    };

    pub_st.getInstance = function(key) {
        if (instances[key] === undefined) {
            instances[key] = new Hw2.Event();
        }

        return instances[key];
    };

    return _Event;
})();

//# sourceURL=share/event.js