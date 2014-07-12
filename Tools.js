/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

var Hw2 = Hw2 || {}; // namespace

Hw2.String = (function() {
    var public = _String.prototype;
    var public_static = _String;

    function _String() {

    }

    public_static.hashCode = function(string) {
        var hash = 0;
        if (string.length === 0)
            return hash;
        for (i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    return _String;
})();

Hw2.Array = (function() {
    var public = _Array.prototype;
    var public_static = _Array;

    function _Array() {

    }

    public_static.remove = function(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    };

    return _Array;
})();

Hw2.Tools = (function() {
    var pub_st = _Tools;

    function _Tools() {

    }

    pub_st.cloneObj = function(obj) {
        return Hw2.JQ.extend({}, obj);
    };

    pub_st.destroyObj = function(obj) {
        if (typeof (obj.destroy) === "function") {
            obj.destroy();
        }
        delete obj;
    };

    pub_st.redraw = function() {
        Hw2.JQ('body').hide();
        setTimeout(function() {
            Hw2.JQ('body').show();
        }, 0);
    };

    pub_st.getObjProperties = function() {

    }

    pub_st.removeScrollBar = function(selector) {
        var text = Hw2.JQ(selector);
        text.wrapAll('<div style="overflow:hidden; height:' + text.height() + 'px; width:' + text.width() + 'px" />');
        text.css("width", text.width() + (text.width() - text[0].scrollWidth));
    };

    pub_st.centerImage = function(imgSelector) {
        var img = Hw2.JQ(imgSelector);
        // we need to wait image loading
        img.load(function() {
            var parent = img.parent();

            //get the width of the parent
            var parent_height = parent.height();

            //get the width of the image
            var image_height = img.height();

            //calculate how far from top the image should be
            var top_margin = (parent_height - image_height) / 2;

            //and change the margin-top css attribute of the image
            img.css('margin-top', top_margin);

            parent.css('text-align', 'center');
        });
    };

    return _Tools;
})();

//# sourceURL=share/Tools.js