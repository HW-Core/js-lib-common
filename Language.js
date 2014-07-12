/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
var Hw2 = Hw2 || {}; // namespace

// DEPENDENCIES
Hw2.Application.loadResource(HW2PATH_JS_LIB + "Uri.js", "js");

Hw2.Language = (function() {
    var public = _Language.prototype;
    var public_static = _Language;

    //private static
    var langs = {"en": "en-GB", "it": "it-IT"};

    //CONSTRUCTOR
    function _Language() {
        this.lang = window.localStorage.getItem("lang") || "it";
        var lang = Hw2.Uri.getInstance().getParam("lang");
        if (lang)
            this.lang = lang;
    }
    ;

    public.changeLang = function(lang, changeParam) {
        if (!lang in langs)
            return false;

        var old = this.lang;
        this.lang = lang;

        Hw2.Uri.updateParam("lang", lang);
        window.localStorage.setItem("lang", lang);

        return old;
    };

    public.getLang = function() {
        return this.lang;
    };

    return _Language;
})();

//# sourceURL=share/language.js