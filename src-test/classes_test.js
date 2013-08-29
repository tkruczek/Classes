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

    'test class instantiation': function () {
        var p = new this.Person();
        assertInstanceOf('should be Person', this.Person, p);
    },
    'test adding class properties': function () {
        this.Person.extend({
            a: 'property a'
        });
        assertNotUndefined(this.Person.a);

        var p = new this.Person();

        assertUndefined(p.a);
    },

    'test adding instance properties': function () {
        this.Person.include({
            b: 'instance property'
        });

        var p = new this.Person(),
            s = new this.Person();

        p.b = 1;
        s.b = 2;

        assertNotUndefined(p.b);
        assertNotEquals(p.b, s.b);

    },
    'test init should be called': function () {
        this.Person.include({
            init: sinon.spy()
        });
        var p = new this.Person();

        assertTrue(p.init.called);
    },
    'test inheritance': function () {
        this.Person.include({
            a: 1
        });

        var Worker = new Class(this.Person),
            w = new Worker();

        assertEquals('should be equal', 1, w.a);
    },
    'test extended should be called': function () {
        var o = {extended: sinon.spy()};
        this.Person.extend(o);

        assertTrue(this.Person.extended.called);
    },
    'test included should be called': function () {
        var o = {included: sinon.spy()};
        this.Person.include(o);
        assertTrue(o.included.called);
    },

    'test extended should be called with class': function () {
        var o = {extended: sinon.spy()};
        this.Person.extend(o);
        assertTrue(o.extended.calledWith(this.Person));
    },
    'test included should be called with class': function () {
        var o = {included: sinon.spy()};
        this.Person.include(o);
        assertTrue(o.included.calledWith(this.Person));
    }
});
TestCase('test proxy', {
    setUp: function () {
        this.Person = new Class();
    },
    'test should call onClick in context of element': function () {
        this.Person.extend({
            onClick: sinon.spy(),
            init: function () {
                this.element = {};
                this.element.onClick = this.onClick;
            }
        });
        this.Person.init();
        this.Person.element.onClick();
        assertTrue(this.Person.onClick.calledOn(this.Person.element));
    },
    'test should bind context': function () {
        this.Person.extend({
            onClick: sinon.spy(),
            init: function () {
                this.element = {};
                this.element.onClick = this.proxy(this.onClick);
            }
        });
        this.Person.init();
        this.Person.element.onClick();
        assertTrue(this.Person.onClick.calledOn(this.Person));
    }
});