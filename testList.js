/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

// list of test files
define(function(){
    return {
        dep: [
            HW2PATH_JS_LIB + "common/Array.js",
            HW2PATH_JS_LIB + "common/Event.js",
            HW2PATH_JS_LIB + "common/Object.js",
            HW2PATH_JS_LIB + "common/Path.js",
            HW2PATH_JS_LIB + "common/String.js",
            HW2PATH_JS_LIB + "common/Uri.js",
            HW2PATH_JS_LIB + "common/Var.js"
        ],
        test: [
            HW2PATH_JS_LIB + "common/tests/tests/array.js",
            HW2PATH_JS_LIB + "common/tests/tests/event.js",
            HW2PATH_JS_LIB + "common/tests/tests/object.js",
            HW2PATH_JS_LIB + "common/tests/tests/path.js",
            HW2PATH_JS_LIB + "common/tests/tests/string.js",
            HW2PATH_JS_LIB + "common/tests/tests/uri.js",
            HW2PATH_JS_LIB + "common/tests/tests/var.js"
        ]
    };
});
