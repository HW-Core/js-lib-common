// Classes magic. Define a new class with var C= Object.subclass(isabstract),
// add class members to C.prototype,
// provide optional C.prototype._init() method to initialise from constructor args,
// call base class methods using Base.prototype.call(this, ...).
//
Function.prototype.subclass = function(isabstract, addExtraInfo) {
    var c;
    if (isabstract) {
        c = new Function(
                'if (arguments[0]!==Function.prototype.subclass.FLAG) ' +
                'throw(\'Abstract class may not be constructed\'); '
                );
    } else {
        c = new Function(
                'if (!(this instanceof arguments.callee)) ' +
                'throw(\'Constructor called without "new"\'); ' +
                'if (arguments[0]!==Function.prototype.subclass.FLAG && this._init) ' +
                'this._init.apply(this, arguments); '
                );
    }
    if (this !== Object) {
        c.prototype = new this(Function.prototype.subclass.FLAG);
        if (addExtraInfo === true) {
            c.prototype.constructor = c;
            c.__base = this;
            c.__super = this.prototype;
        }
    }
    return c;
};
Function.prototype.subclass.FLAG = new Object();

//# sourceURL=share/subclass.js