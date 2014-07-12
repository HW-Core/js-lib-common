/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */
var Hw2 = Hw2 || {}; // namespace

Hw2.Uri = (function() {
    var public = _Uri.prototype;
    var pub_st = _Uri;

    pub_st.instance;

    function _Uri(url) {
        assert(typeof url === "string", "Url must be a string!");

        this.url = url;

        var parsedUrl = Hw2.Uri.parse_url(url);

        this.getParsedUrl = function() {
            return parsedUrl;
        };
    }

    public.getParam = function(key) {
        var query = this.getParsedUrl().query;
        if (!query)
            return;

        var query_string = {};

        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }

        if (key) {
            return query_string[key];
        } else
            return query_string;
    };

    pub_st.updateParams = function(params, remove, refresh, search) {
        if (typeof search === "undefined")
            search = document.location.search.substr(1);

        Hw2.JQ.each(params, function(key, value) {
            search = _updateParam(search, key, value, remove);
        });

        //this will reload the page, it's likely better to store this until finished
        if (refresh)
            document.location.search = search;
        else
            window.history.pushState("", "", document.location.pathname + "?" + search);
    };

    pub_st.updateParam = function(key, value, remove, refresh, search)
    {
        var tmp = {};
        tmp[key] = value;
        pub_st.updateParams(tmp, remove, refresh, search);
    };

    var _updateParam = function(search, key, value, remove) {
        key = encodeURI(key);
        value = encodeURI(value);

        var kvp = search.split('&');

        var i = kvp.length;
        var x;
        while (i--)
        {
            x = kvp[i].split('=');

            if (x[0] == key)
            {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }

        return kvp.join('&');
    };

    pub_st.getInstance = function(make_new) {
        if (make_new || !pub_st.instance) {
            pub_st.instance = new Hw2.Uri(document.location.href);
        }

        return pub_st.instance;
    };

    pub_st.parse_url = function(str, component) {
        //       discuss at: http://phpjs.org/functions/parse_url/
        //      original by: Steven Levithan (http://blog.stevenlevithan.com)
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        //         input by: Lorenzo Pisani
        //         input by: Tony
        //      improved by: Brett Zamir (http://brett-zamir.me)
        //             note: original by http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
        //             note: blog post at http://blog.stevenlevithan.com/archives/parseuri
        //             note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
        //             note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
        //             note: a seriously malformed URL.
        //             note: Besides function name, is essentially the same as parseUri as well as our allowing
        //             note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
        //        example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
        //        returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}

        var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
            'relative', 'path', 'directory', 'file', 'query', 'fragment'
        ],
                ini = (this.php_js && this.php_js.ini) || {},
                mode = (ini['phpjs.parse_url.mode'] &&
                        ini['phpjs.parse_url.mode'].local_value) || 'php',
                parser = {
                    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
                };

        var m = parser[mode].exec(str),
                uri = {},
                i = 14;
        while (i--) {
            if (m[i]) {
                uri[key[i]] = m[i];
            }
        }

        if (component) {
            return uri[component.replace('PHP_URL_', '')
                    .toLowerCase()];
        }
        if (mode !== 'php') {
            var name = (ini['phpjs.parse_url.queryKey'] &&
                    ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
            parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
            uri[name] = {};
            query = uri[key[12]] || '';
            query.replace(parser, function($0, $1, $2) {
                if ($1) {
                    uri[name][$1] = $2;
                }
            });
        }
        delete uri.source;
        return uri;
    };

    return _Uri;
})();

//# sourceURL=share/uri.js