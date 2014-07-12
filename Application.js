/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

var Hw2 = Hw2 || {}; // namespace

//DEPENDENCIES
Hw2.JQ.getScript(HW2PATH_JS_LIB + "Tools.js");
Hw2.JQ.getScript(HW2PATH_JS_LIB + "PathManager.js");

Hw2.Application = (function() {
    var public = _Application.prototype;
    var public_static = _Application;

    function _Application() {

    }

    // init already-included libraries
    var loadedRes = [
        HW2PATH_SHARE + "modules/jquery/jquery/dist/jquery.js",
        HW2PATH_JS_LIB + "PathManager.js",
        HW2PATH_JS_LIB + "Tools.js"
    ];

    public_static.loadResource = function(filename, filetype, skipErr, forceLoad) {
        if (!forceLoad) {
            if (Hw2.JQ.inArray(filename, loadedRes) !== -1)
                return true;

            if (!Hw2.PathManager.fileExists(filename)) {
                if (!skipErr)
                    new Error("File " + filename + " doesn't exists");
                return false;
            }
        }

        if (filetype === "css") {
            try {
                var el = document.createElement('link');
                el.rel = 'stylesheet';
                el.href = filename;
                el.id = Hw2.String.hashCode(filename);
                el.type = "text/css";
                return Hw2.JQ("head").append(el);
            } catch (error) {
                return false;
            }
        } else if (filetype === "js") {
            try {
                $ = jQuery = Hw2.JQ; // restore jq vars if we're loading plugins for example
                Hw2.JQ.ajaxSetup({async: false});
                var res = Hw2.JQ.getScript(filename).done(function(script, textStatus) {
                    loadedRes.push(filename)
                }).fail(function(jqxhr, settings, exception) {
                    throw Error(exception.message);
                });
                Hw2.JQ.ajaxSetup({async: true});
                return res.status === 200;
            } catch (error) {
                throw error;
                return false;
            }
        }

        return true;
    };

    public_static.removeCss = function(filename) {
        Hw2.JQ("#" + Hw2.String.hashCode(filename)).remove();
    };

    return _Application;
})();


//# sourceURL=share/application.js



