/**
 * Created with JetBrains WebStorm.
 * User: tomek
 * Date: 8/19/13
 * Time: 10:23 PM
 * To change this template use File | Settings | File Templates.
 */
TestCase('Classes src-test', {
    setUp: function () {
        this.Person = new Class();
    },

    'test class instantiation': function() {
        var p = new this.Person();
        assertInstanceOf('should be Person', this.Person, p);
    },
    'test adding class properties': function() {
        this.Person.extend({
           a: 'property a'
        });
        assertNotUndefined(this.Person.a);

        var p = new this.Person();

        assertUndefined(p.a);
    },

    'test adding instance properties': function() {
        this.Person.include({
            b: 'instance property'
        });

        var p = new this.Person(),
            s = new this.Person();

        p.b = 1;
        s.b = 2;

        assertNotUndefined(p.b);
        assertNotEquals(p.b, s.b);

    }
});