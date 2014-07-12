/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

var Hw2 = Hw2 || {}; // namespace

Hw2.PathManager = (function() {
    var public = _PathManager.prototype;
    var public_static = _PathManager;

    function _PathManager() {

    }

    public_static.basename = function(path) {
        return path.replace(/\\/g, '/').replace(/.*\//, '');
    };

    public_static.dirname = function(path) {
        return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
    };

    public_static.fileExists = function(url) {
        if (url) {
            try {
                var req = new XMLHttpRequest();
                req.open('GET', url, false);
                req.send();
                return req.status === 200;
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    };

    return _PathManager;
})();

//# sourceURL=share/pathmanager.js