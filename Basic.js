/*
 * create object with below methods
 */
//factory mode, create object in this way won't be able
//to identify specific object type.
function createPerson(name, age, gender)
{
    var o = new object();
    o.name = name;
    o.age = age;
    o.gender = gender;
    o.sayHello = function()
    {
        alert("Hello " + this.name);
    }
    return o;
}

//constructor has no return value, to create the object,
//we have to use new.
function Person(name, age, gender)
{
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHello = function()
    {
        alert("Hello " + this.name);
    }
}
var person = new Person("owen", 23, "male");
//now it's able to recognize the type
alert(person instanceof Person);
alert(person.constructor == Person);

//any function could be treated as constructor, and
//any constructor could be treated as normal function.
//if call the constructor as function, all the properties
//will be added as properties of global execution context
Person("ricy", 23, "male");
window.sayHello();

/*
 * every object created via Person constructor will create
 * a new function object, the truth is there is no need and
 * the sayHello should be shared for all the objects.
 */

/*
 * previous sample code shows every function is an object and maintains
 * arguments, this, length etc. properties. one of important property that
 * didn't mention is prototype.
 *
 * prototype is an object, we can assign a lot of properties to it. when
 * accessing property of an object, js would first check the object(instance),
 * if that property doesn't exist in the instance, then check the prototype object
 */
function Person(){}
Person.prototype.name = "owen";
Person.prototype.age = 23;
Person.prototype.gender = "male";
Person.prototype.sayHello = function(){ alert("Hello " + this.name); }
//by the time we create function Person, js created prototype object for us 
//and set the object's constructor property to function Person
alert(Person.prototype.constructor); //function Person(){}

var person = new Person();
//first check object person, since constructor has no definition of sayHello,
//then check prototype object
person.sayHello(); //Hello owen

//two ways to check prototype object
alert(Person.prototype.isPrototypeOf(person));
alert(Object.getPrototypeOf(person) == Person.prototype);

person.name = "Ricy"; //overwrite the value in prototype
alert(person.name); //Ricy
delete person.name;
alert(person.name); //owen

//check whether the property exists in instance or prototype
alert("name" in Person); //true no matter in instance or prototype
alert(person.hasOwnProperty("name")); //true only when in instance

person.dept = "Java Engeneer";
//every property in instance and prototype will be accessed
for(var pro in person)
    alert(pro);

/*
 * an eeasier way to create prototype object is to assign an json
 * object to it. which overwrite the prototype object js created for us
 * and reset the prototype object's constructor property to Object(instead of Person).
 */

Person.prototype = {
    name:"owen",
    age:23,
    gender:"male",
    sayHello:function(){
        alert("Hello " + this.name);
    }
}
alert(Person.prototype.constructor); //function Object

/*
 * creating prototype object with json object disconnect the prototype object with
 * constructor Person, to solve the problmen, we can explicitly set constructor property
 * in json object.
 */
Person.prototype = {
    constructor:Person,
    name:"owen",
    age:23,
    gender:"male",
    sayHello:function(){
        alert("Hello " + this.name);
    }
}
alert(Person.prototype.constructor); //function Person

/*
 * since prototype object is shared and accessable for all the instances,
 * it would cause problem sometimes especially when property is reference value 
 */
Person.prototype = {
    constructor:Person,
    name:"owen",
    age:23,
    gender:"male",
    friends:["vincent","ricy"],
    sayHello:function(){
        alert("Hello " + this.name);
    }
}
var person1 = new Person();
var person2 = new Person();
alert(person1.friends); //vincent, ricy
alert(person2.friends); //vincent, ricy
person1.friends.push("alice");
//any change of the reference value would affect other instances
alert(person2.friends); //vincent, ricy, alice

//to solve above problem, reference value (those not intended to share)
//should be in constructor