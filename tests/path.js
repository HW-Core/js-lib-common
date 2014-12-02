/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

hw2.define(function () {
    var $ = this;

    describe('Path', function () {
        var myPath = "/my/test/path/file.js";

        describe('basename', function () {
            it('extract basename from path', function () {
                var b = $.Path.basename(myPath);
                assert.ok(b === "file.js", "basename extracted correctly");
            });
        });

        describe('dirname', function () {
            it('extract dirname from path', function () {
                var d = $.Path.dirname(myPath);
                assert.ok(d === "/my/test/path", "dirname extracted correctly");
            });
        });

        describe('extension', function () {
            it('extract extension from path', function () {
                var e = $.Path.extension(myPath);
                assert.ok(e === "js", "extension extracted correctly");
            });
        });
    });

});