/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

'use strict';

hw2.define(function () {
    $ = this;
    $.Time = $.Class({members: [
            {
                attributes: ["public", "static"],
                name: "sleep",
                val: function (milliseconds, callback) {
                    var start = new Date().getTime();
                    for (var i = 0; i < 1e7; i++) {
                        if ((new Date().getTime() - start) > milliseconds) {
                            callback();
                            break;
                        }
                    }
                }
            }
        ]
    });
});