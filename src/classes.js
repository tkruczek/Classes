/**
 * Created with JetBrains WebStorm.
 * User: tomek
 * Date: 8/19/13
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

var Class = function(parent){
    var _class = function(){
        this.init.apply(this, arguments);
    };

    //change _class' prototype
    if (parent) {
        var Subclass = function() {};
        Subclass.prototype = parent.prototype;
        _class.prototype = new Subclass()
    }

    _class.prototype.init  = function(){};

    // Shortcut to access prototype
    _class.fn = _class.prototype;
    // Shortcut to access class
    _class.fn.parent = _class;
    //Shortcut to access parent class
    _class._super = _class.__proto__;

    /** Adding class properties
     *
     * @param obj
     */
    _class.extend = function(obj){
        var extended = obj.extended;
        for(var i in obj){
            _class[i] = obj[i];
        }
        if (extended) extended(_class)
    };

    /** Adding instance properties
     *
     * @param obj
     */
    _class.include = function(obj){
        var included = obj.included;
        for(var i in obj){
            _class.fn[i] = obj[i];
        }
        if (included) included(_class)
    };

    return _class;
};