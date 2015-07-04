/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

hwc.define(function () {
    var $ = this;

    describe('Object', function () {
        describe('clone', function () {
            obj1 = {
                val1: "value1",
                val2: {
                    val1: "nested1",
                    val2: "nested2",
                    method1: function () {
                        return "nestedfunc1"
                    }
                },
                method1: function () {
                    return "func1"
                }
            };

            it('all elements cloned', function () {
                var obj2 = $.Object.clone(obj1);
                obj2.val1 = "changed value1";
                assert.ok(obj2.val1 === "changed value1", "values should be different");
                assert.ok(obj2.val1 !== obj1.val1, "values should be different");
                assert.ok(obj2.val2.val1 === "nested1", "other values should be cloned");
            });
        });
    });

});
