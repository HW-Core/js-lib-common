/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

hwc.define(function () {
    $ = this;

    describe('Event', function () {
        describe('get static instance', function () {
            it('instance created', function () {
                var e = $.Event.I("test");
                assert.typeOf(e, "object");
            });
        });

        /**
         * TODO: add more tests
         */
    });

});