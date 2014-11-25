/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

describe('Var', function () {
    var $=Hw2Core;
    describe('isset', function () {
        it('check if a variable is set', function () {
            var a;

            a = {
                b: {
                    c: 'e'
                }
            };

            assert.ok($.Var.isset(function() { return a; })==true,"a");
            assert.ok($.Var.isset(function() { return a.b.c; })==true,"a.b.c");
            assert.ok($.Var.isset(function() { return a.b.c.d; })==false,"a.b.c.d");
            assert.ok($.Var.isset(function() { return a.b.c.d.e; })==false,"a.b.c.d.e");
        });
    });
});
