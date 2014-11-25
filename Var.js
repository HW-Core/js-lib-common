/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
define(function () {
    var $ = Hw2Core;
    return Hw2Core.Var = $.Class({members: [
            {
                /**
                 * You should pass an anonymous function that returns var to check:
                 * Var.isset(function () { return a.b.c; })
                 * Not optimized for single var check, use a !== undefined instead
                 * 
                 * NOTE: there is no performance penalty for using try..catch block if the property is set. 
                 * There is a performance impact if the property is unset.
                 */
                attributes: ["public", "static"],
                name: "isset",
                val: function (fn) {
                    var value;
                    try {
                        value = fn();
                    } catch (e) {
                        value = undefined;
                    } finally {
                        return value !== undefined;
                    }
                }
            }
        ]}
    );
});