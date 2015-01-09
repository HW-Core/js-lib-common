/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
hw2.define([
    'hw2!PATH_JS_LIB:common/include.js'
],function () {
    $ = this;
    $.Object = $.Class({members: [
            {
                attributes: "static",
                name: "clone",
                val: function (obj) {
                    return JSON.parse(JSON.stringify(obj));
                }
            }
        ]
    });
});



