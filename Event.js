/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
hw2.define([
    "hw2!PATH_JS_LIB:common/Array.js"
], function () {
    var $ = this;
    $.Event = $.Class({members: [
            {
                attributes: ["private", "static"],
                name: "instances",
                val: new Array()
            },
            {
                attributes: "public",
                name: "__construct",
                val: function () {
                    this.triggers = [];
                }
            },
            {
                attributes: "public",
                name: "bind",
                val: function (obj) {
                    this.triggers.push(obj);
                }
            },
            {
                attributes: "public",
                name: "unbind",
                val: function (obj) {
                    $.Array.remove(this.triggers, obj);
                }
            },
            {
                attributes: "public",
                name: "trigger",
                val: function (func, data) {
                    for (index = 0; index < this.triggers.length; ++index) {
                        var f = this.triggers[index][func];
                        if (typeof f === 'function')
                            var bFunc = f.apply(null, this.triggers[index], data);
                        bFunc(); // launch bounded function
                    }
                }
            },
            {
                attributes: ["public", "static"],
                name: "I",
                val: function (key) {
                    if (typeof this._s.instances[key] === "undefined") {
                        this._s.instances[key] = new $.Event();
                    }

                    return this._s.instances[key];
                }
            }
        ]}
    );
});