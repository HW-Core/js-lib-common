/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

hw2.define(function () {
    var $ = this;

    describe('Array', function () {
        describe('destroy', function () {
            it('all elements destroyed', function () {
                var a = [1, 3, 5, 2, 7];
                a = $.Array.clean(a);
                assert.ok(a.length === 0, "array cleaned");
            });
        });
    });

});