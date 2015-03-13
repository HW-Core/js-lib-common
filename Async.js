'use strict';

hw2.define([
    'hw2!PATH_JS_LIB:common/include.js'
], function () {
    var $ = this;

    /*
     * when calling .then() function from cb*() methods
     * latest argument is be te callback result
     * if not callback defined it's null
     */
    $.Q.defer.prototype.cbResolve = function () {
        if (this.promise === null && this._callback) {
            return this._callback.apply(null, arguments);
        } else {
            this.resolve(arguments);
        }
    };

    $.Q.defer.prototype.cbReject = function () {
        if (this.promise === null && this._callback) {
            return this._callback.apply(null, arguments);
        } else {
            this.reject(arguments);
        }
    };


    /*
     * Adapter class for some Q methods
     */
    return $.Async = $.Class({members: [
            {
                a: ["public", "static"], n: "all", v: function (promises) {
                    return $.Q.all(promises);
                }
            },
            {
                /**
                 * array of promising-function that should be called sequentially 
                 */
                a: ["public", "static"], n: "sequence", v: function (fnArray) {
                    return fnArray.slice(1).reduce($.Q.when, $.Q(fnArray[0]));
                }
            },
            {
                a: ["public", "static"], n: "call", v: function (fn) {
                    return this.s.apply(fn, Array.prototype.slice.call(arguments, 1));
                }
            },
            {
                a: ["public", "static"], n: "apply", v: function (fn, args) {
                    return $.Q.nfapply(fn, args);
                }
            },
            {
                /**
                 * if callback is not defined then promise will not be set 
                 */
                a: ["public", "static"], n: "defer", v: function (callback) {
                    var deferred = $.Q.defer();
                    if (callback) {
                        if (typeof callback !== "function")
                            throw new Error("callback type is: " + typeof (callback));
                        deferred._callback = callback;
                        deferred.promise = null;
                    }

                    return deferred;
                }
            }
        ]}
    );
});