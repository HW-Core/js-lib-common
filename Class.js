/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

var Hw2 = Hw2 || {}; // namespace

Hw2.Class = (function() {
    var lId = 0; // static last id registered

    /**
     *
     * @returns {Number} the incremented last id
     */
    _Class.incrId = function() {
        return ++lId;
    };

    /**
     *
     * @param {Array} modifiers :
     * final
     * abstract
     * @param {Object} descriptor elements:
     * class -> name of class ( optional )
     * base -> the prototype of parent class
     * use -> class or classes for code reusing
     * @param {Object} members : associative array of members to add
     * @returns {_Class}
     */
    function _Class(modifiers, descriptor, members) {
        var $ = Hw2.JQ;

        var Obj = (function() {


            var __pub = _Object.prototype;
            var __pub_st = _Object;
            var __pvMembers = {st: {}, inst: []}; // private members

            function _Object() {
                if (__pub_st.__isAbstract)
                    throw('Abstract class may not be constructed');

                var obj = Object.create(_Object.prototype);

                var id = Hw2.Class.incrId();
                obj.__("__id", id, "public", {enumerable: true});
                __pvMembers.inst[obj.__("__id")] = {};
                try {
                    // call custom constructor if any
                    obj.__constructor.apply(this, arguments);
                } catch (err) {
                }

                if (obj.__st().__isFinal)
                    Object.preventExtensions(obj);

                if (descriptor) {
                    if (typeof descriptor.class === "string")
                        window[descriptor.class] = Obj;

                    __inherit(descriptor.base, _Object, true);

                    __inherit(descriptor.use, _Object, false);
                }


                return obj;
            }

            /**
             *  Magic methods and properties
             */

            // dummy method for "duck type" checking
            Object.defineProperty(__pub, "__isClass", {value: function() {
                    return true;
                },
                enumerable: true
            });

            Object.defineProperty(__pub_st, "__isClass", {value: function(instance) {
                    return "__isClass" in instance;
                },
                enumerable: true
            });


            Object.defineProperty(__pub, "__st", {value: function() {
                    return __pub_st;
                },
                enumerable: true
            });

            Object.defineProperty(__pub, "__clean", {value: function() {
                    delete __pvMembers.inst[__("__id")];
                },
                enumerable: true
            });

            /**
             * Inherit methods from another class ( such as traits )
             */
            Object.defineProperty(__pub, "__inherit", {value: function(src) {
                    return __inherit(src, this, false);
                },
                enumerable: true
            });

            Object.defineProperty(__pub, "__addMembers", {value: function(elements) {
                    __pub_st.__addMembers(elements, this);
                },
                enumerable: true
            });

            /**
             *
             * @param {type} elements
             * @param {type} instance (Optional) can be null if static member
             * @returns {undefined}
             */
            Object.defineProperty(__pub_st, "__addMembers", {value: function(elements, instance) {
                    for (i = 0; i < elements.length; ++i) {
                        __pub_st.__addMember(
                                elements[i]["name"],
                                elements[i]["val"],
                                elements[i]["attributes"]
                                , instance);
                    }
                },
                enumerable: true
            });

            Object.defineProperty(__pub, "__getMembers", {value: function(incStatic) {
                    return __pub_st.__getMembers(incStatic ? "both" : "instance", this);
                },
                enumerable: true
            });

            Object.defineProperty(__pub_st, "__getMembers", {value: function(type, instance) {
                    if (type === "static") {
                        //TODO implement
                    } else if (type === "instance") {
                        //TODO implement
                    } else {
                        // both
                        //TODO implement
                    }
                },
                enumerable: true
            });


            /**
             * Add/Get a member to/from current object or prototype
             * @param {type} name
             * @param {type} val (Optional) giving name only, it will return the var value when it's possible
             * @param {type} attributes (Optional)
             * public/private
             * static If no instance provided, this parameter will be forced to true.
             * final
             * @param {type} noInstance avoid current instance pass to define member in static or prototype instead
             * @returns
             */
            Object.defineProperty(__pub, "__", {value: function(name, val, attributes, noInstance) {
                    return __pub_st.__(name, val, attributes, noInstance ? null : this);
                },
                enumerable: true
            });

            /**
             * Add/Get a member to/from defined Class, object or prototype
             * @param {type} name
             * @param {type} val (Optional) giving name only, it will return the var value when it's possible
             * @param {type} attributes (Optional)
             * public/private
             * static If no instance provided, this parameter will be forced to true.
             * final
             * @param {type} instance (Optional) will use instance instead of prototype with non static members
             * @returns
             */
            Object.defineProperty(__pub_st, "__", {value: function(name, val, attributes, instance) {
                    return __(name, val, attributes, instance, true);
                },
                enumerable: true
            });

            // private version
            var __ = function(name, val, attributes, instance, isPubCall) {
                var res;

                if (val) { // set
                    var isPublic = $.inArray("private", attributes) < 0;
                    var isFinal = $.inArray("final", attributes) >= 0;
                    var isStatic = $.inArray("static", attributes) >= 0;

                    obj = isPublic ?
                            (isStatic ? __pub_st : __pub) :
                            (!instance || isStatic || name === "__id" ?
                                    __pvMembers.st : __pvMembers.inst[instance.__("__id")]);

                    // store parent object to apply next
                    var old = obj[name];

                    res = Object.defineProperty(obj, name, {
                        //__proto__: obj.__proto__,
                        value: val,
                        writable: !isFinal,
                        //configurable: $.inArray("configurable",attributes),
                        enumerable: true
                    });

                    /*
                     * The first time we assign a value to a function is when we are
                     * inheriting a "Trait" ( "use" a class ) or just defining the method.
                     * So if there were another method before , it has been inherited by
                     * "base" and becomes the __super attribute
                     */

                    if (typeof res[name] === "function" && !res[name].__super) {
                        // define parent method if any
                        Object.defineProperty(res[name], "__super", {
                            value: old,
                            writable: false,
                            configurable: false,
                            enumerable: true
                        });
                    }
                } else { // get
                    if (!isPubCall) {
                        res = instance ? __pvMembers.inst[instance.__("__id")][name] : __pvMembers.st[name];
                    }

                    if (!res)
                        res = instance ? instance[name] : __pub_st[name];
                }

                return res;
            };

            var __inherit = function(src, dest, isBase) {

                if (isBase) {
                    // workaround
                    dest.prototype.prototype = src.prototype;
                    dest.prototype.__proto__ = src.prototype;
                } else {
                    function extend(destination, source) {
                        for (var prop in source) {
                            if (source.hasOwnProperty(prop) && prop !== "prototype") {
                                __(prop, source[prop], null, destination);
                            }
                        }
                    }

                    // traits
                    if (src instanceof Array) {
                        src.forEach(function(t) {
                            extend(dest.prototype, t);
                        });
                    } else {
                        extend(dest.prototype, src);
                    }
                }

            };

            return _Object;
        })();

        if (typeof modifiers === "string")
            modifiers = modifiers.split(" ");

        if (members)
            Obj.__addMembers(members);

        if (modifiers) {
            if ($.inArray("abstract", modifiers) >= 0)
                Object.defineProperty(Obj, "__isAbstract", {value: true});

            if ($.inArray("final", modifiers) >= 0)
                Object.defineProperty(Obj, "__isFinal", {value: true});
        }

        return Obj;
    }

    return _Class;
}());