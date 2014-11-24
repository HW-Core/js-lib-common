/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

describe('Event', function () {
    describe('get static instance', function () {
        it('instance created', function () {
            Hw2Core.Event.__("__id");
            var e=Hw2Core.Event.I("test");
            assert.typeOf(e,"object");
        });
    });
    
    /**
     * TODO: add more tests
     */
});
