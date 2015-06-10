/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

hwc.define(function () {
    describe('String', function () {
        describe('hascode', function () {
            it('string should be converted in hashcode', function () {
                var s = "My custom string";
                var res = $.String.hashCode(s);
                assert.ok(typeof res === "number", "should be a number");
            });
        });
    });

});