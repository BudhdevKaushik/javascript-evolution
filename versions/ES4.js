/**
 * ECMAScript 4 (ES4) - ABANDONED/NEVER RELEASED
 *
 * ES4 was a proposed major update to JavaScript that was worked on
 * between 1999-2008 but was ultimately ABANDONED due to disagreements
 * in the TC39 committee about the direction of the language.
 *
 * TIMELINE:
 * - 1999: Work begins on ES4 after ES3 release
 * - 2000-2007: Various proposals and heated debates
 * - July 2008: ES4 officially abandoned
 * - August 2008: Agreement to work on ES3.1 instead
 *
 * WHY IT FAILED:
 * - Too ambitious and complex
 * - Breaking changes to existing code
 * - Performance concerns
 * - Committee disagreements (Adobe/Mozilla vs Microsoft/Yahoo)
 * - Implementation difficulties
 *
 * NOTE: This file documents what ES4 WOULD HAVE BEEN.
 * None of these features became part of JavaScript at that time.
 */

console.log("=== ECMAScript 4 (ES4) - ABANDONED ===");
console.log("This version was never released!\n");

// ============================================
// 1. CLASSES (Proposed but never implemented)
// ============================================

console.log("=== 1. Classes (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Constructor functions and prototypes
 *
 * PROBLEM: Verbose, confusing for developers from other languages
 * Inheritance requires manual prototype chain setup
 *
 * ES4 PROPOSAL: True class-based OOP with class keyword
 */

console.log("--- OLD WAY (ES3) - What we had ---");

// ES3 way - Constructor function
function PersonES3(name, age) {
  this.name = name;
  this.age = age;
}

PersonES3.prototype.greet = function () {
  return "Hello, I'm " + this.name;
};

PersonES3.prototype.getAge = function () {
  return this.age;
};

var person1 = new PersonES3("Alice", 30);
console.log(person1.greet());
console.log("Age:", person1.getAge());

// ES3 inheritance - complex
function EmployeeES3(name, age, jobTitle) {
  PersonES3.call(this, name, age);
  this.jobTitle = jobTitle;
}

EmployeeES3.prototype = new PersonES3();
EmployeeES3.prototype.constructor = EmployeeES3;

EmployeeES3.prototype.getJobTitle = function () {
  return this.jobTitle;
};

var employee1 = new EmployeeES3("Bob", 25, "Developer");
console.log(employee1.greet());
console.log("Job:", employee1.getJobTitle());

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced true classes:");
console.log(`
class Person {
    var name: String;
    var age: Number;
    
    function Person(name: String, age: Number) {
        this.name = name;
        this.age = age;
    }
    
    function greet(): String {
        return "Hello, I'm " + this.name;
    }
    
    function getAge(): Number {
        return this.age;
    }
}

class Employee extends Person {
    var jobTitle: String;
    
    function Employee(name: String, age: Number, jobTitle: String) {
        super(name, age);
        this.jobTitle = jobTitle;
    }
    
    function getJobTitle(): String {
        return this.jobTitle;
    }
}

var emp = new Employee("Bob", 25, "Developer");
emp.greet();  // Inherited from Person
`);

console.log("STATUS: This syntax was NEVER implemented in ES4");
console.log("JavaScript continued using constructor functions until ES6");

// ============================================
// 2. STATIC TYPING (Proposed but never implemented)
// ============================================

console.log("\n=== 2. Static Typing (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Only dynamic typing
 *
 * PROBLEM: Type errors only discovered at runtime
 * No compile-time type checking
 *
 * ES4 PROPOSAL: Optional static type annotations
 */

console.log("--- OLD WAY (ES3) ---");

var num = 42;
console.log("Initial value:", num);

num = "Hello"; // Perfectly valid in ES3
console.log("Changed to string:", num);

num = true; // Also valid
console.log("Changed to boolean:", num);

// Type errors only caught at runtime
function addES3(a, b) {
  return a + b;
}

console.log("addES3(5, 3):", addES3(5, 3)); // 8
console.log("addES3('5', 3):", addES3("5", 3)); // "53" - unexpected!
console.log("addES3(5, '3'):", addES3(5, "3")); // "53" - type coercion

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have allowed type annotations:");
console.log(`
// Variable type annotations
var num: Number = 42;
var str: String = "Hello";
var bool: Boolean = true;
var arr: Array = [1, 2, 3];
var obj: Object = {name: "test"};

// Type errors would be caught:
// var x: Number = "string"; // Compile-time error!
// num = "Hello";            // Error - cannot assign string to Number

// Function type annotations
function add(a: Number, b: Number): Number {
    return a + b;
}

// Type checking on function calls
add(5, 3);      // OK
add("5", 3);    // Error - wrong type!

// Nullable types
var maybeNull: Number? = null;  // OK
var notNull: Number = null;     // Error

// Union types
var mixed: (Number | String) = 42;
mixed = "Hello";  // OK - both types allowed
mixed = true;     // Error - boolean not in union
`);

console.log("STATUS: Static typing was NEVER added to JavaScript");
console.log("ES3 dynamic typing continued until today");

// ============================================
// 3. INTERFACES (Proposed but never implemented)
// ============================================

console.log("\n=== 3. Interfaces (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Duck typing - no formal contracts
 *
 * PROBLEM: No way to enforce that objects implement certain methods
 *
 * ES4 PROPOSAL: Interface definitions for contracts
 */

console.log("--- OLD WAY (ES3) ---");

// ES3 - No interfaces, just checking manually
function startVehicle(vehicle) {
  if (typeof vehicle.start === "function") {
    vehicle.start();
  } else {
    console.log("Error: Object doesn't have start method");
  }
}

var car = {
  start: function () {
    console.log("Car started");
  },
};

var bicycle = {
  pedal: function () {
    console.log("Pedaling");
  },
};

startVehicle(car); // Works
startVehicle(bicycle); // Error - no start method

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced interfaces:");
console.log(`
// Define an interface
interface IVehicle {
    function start(): void;
    function stop(): void;
    function getSpeed(): Number;
}

// Class must implement all interface methods
class Car implements IVehicle {
    var speed: Number = 0;
    
    function start(): void {
        console.log("Car started");
    }
    
    function stop(): void {
        console.log("Car stopped");
        this.speed = 0;
    }
    
    function getSpeed(): Number {
        return this.speed;
    }
}

// Multiple interfaces
interface IElectric {
    function charge(): void;
    function getBatteryLevel(): Number;
}

class ElectricCar implements IVehicle, IElectric {
    // Must implement methods from both interfaces
}

// Compile-time checking
var vehicle: IVehicle = new Car();
vehicle.start();  // OK
`);

console.log("STATUS: Interfaces were NEVER added to JavaScript");

// ============================================
// 4. PACKAGES AND NAMESPACES (Proposed)
// ============================================

console.log("\n=== 4. Packages/Namespaces (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Global scope or manual namespace objects
 *
 * PROBLEM: Name collisions, no formal module system
 *
 * ES4 PROPOSAL: Package system for organizing code
 */

console.log("--- OLD WAY (ES3) ---");

// ES3 - Manual namespacing to avoid collisions
var MyApp = MyApp || {};

MyApp.Utils = {
  capitalize: function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  trim: function (str) {
    return str.replace(/^\s+|\s+$/g, "");
  },
};

MyApp.Models = {
  User: function (name) {
    this.name = name;
  },
};

console.log("Manual namespace:", MyApp.Utils.capitalize("hello"));

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced packages:");
console.log(`
// Define a package
package com.example.utils {
    
    // Public class visible outside package
    public class StringHelper {
        public static function capitalize(str: String): String {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        
        public static function trim(str: String): String {
            return str.replace(/^\\s+|\\s+$/g, "");
        }
    }
    
    // Internal class - only visible within package
    internal class InternalHelper {
        internal static function helper(): void {
            // Package-private helper
        }
    }
}

// Another package
package com.example.models {
    import com.example.utils.StringHelper;
    
    public class User {
        private var name: String;
        
        public function User(name: String) {
            this.name = StringHelper.capitalize(name);
        }
        
        public function getName(): String {
            return this.name;
        }
    }
}

// Usage:
import com.example.models.User;
import com.example.utils.*;

var user = new User("john");
var text = StringHelper.capitalize("hello");
`);

console.log("STATUS: Package system was NEVER added");
console.log("JavaScript continued with global scope until ES6 modules");

// ============================================
// 5. ACCESS MODIFIERS (Proposed)
// ============================================

console.log("\n=== 5. Access Modifiers (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Everything is public, convention-based privacy
 *
 * PROBLEM: No real encapsulation, only conventions (like _private)
 *
 * ES4 PROPOSAL: public, private, protected, internal modifiers
 */

console.log("--- OLD WAY (ES3) ---");

// ES3 - Convention-based privacy with underscore
function BankAccountES3(balance) {
  this._balance = balance; // Convention: underscore means "private"
}

BankAccountES3.prototype.getBalance = function () {
  return this._balance;
};

BankAccountES3.prototype.deposit = function (amount) {
  this._balance += amount;
};

var account = new BankAccountES3(1000);
console.log("Balance:", account.getBalance());

// But _balance is still accessible!
console.log("Direct access (should be private):", account._balance);
account._balance = 999999; // Can still modify!
console.log("Modified directly:", account._balance);

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced real access modifiers:");
console.log(`
class BankAccount {
    private var balance: Number;      // Only accessible within class
    protected var accountId: String;  // Accessible in subclasses
    public var accountName: String;   // Accessible everywhere
    internal var branchId: String;    // Accessible within package
    
    public function BankAccount(initialBalance: Number) {
        this.balance = initialBalance;
    }
    
    public function getBalance(): Number {
        return this.balance;  // OK - within class
    }
    
    public function deposit(amount: Number): void {
        this.balance += amount;  // OK - private member access
    }
    
    private function calculateInterest(): Number {
        return this.balance * 0.05;
    }
}

var account = new BankAccount(1000);
account.getBalance();     // OK - public method
account.deposit(500);     // OK - public method
account.balance;          // ERROR - private member!
account.calculateInterest();  // ERROR - private method!

// Inheritance with protected
class SavingsAccount extends BankAccount {
    public function transferToChecking(): void {
        // Can access protected members from parent
        var id = this.accountId;  // OK - protected
        var balance = this.balance;  // ERROR - private in parent
    }
}
`);

console.log("STATUS: Access modifiers were NEVER added to JavaScript");
console.log("Privacy still relies on conventions and closures");

// ============================================
// 6. GETTERS AND SETTERS (Proposed)
// ============================================

console.log("\n=== 6. Getters and Setters (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Regular methods for getting/setting
 *
 * PROBLEM: Verbose, looks like method calls not property access
 *
 * ES4 PROPOSAL: Property accessors with get/set
 */

console.log("--- OLD WAY (ES3) ---");

function RectangleES3(width, height) {
  this._width = width;
  this._height = height;
}

RectangleES3.prototype.getWidth = function () {
  return this._width;
};

RectangleES3.prototype.setWidth = function (value) {
  if (value > 0) {
    this._width = value;
  }
};

RectangleES3.prototype.getArea = function () {
  return this._width * this._height;
};

var rect = new RectangleES3(10, 5);
console.log("Width (method call):", rect.getWidth());
rect.setWidth(20);
console.log("Area:", rect.getArea());

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced getters and setters:");
console.log(`
class Rectangle {
    private var _width: Number;
    private var _height: Number;
    
    public function Rectangle(width: Number, height: Number) {
        this._width = width;
        this._height = height;
    }
    
    // Getter - looks like property access
    public function get width(): Number {
        return this._width;
    }
    
    // Setter - looks like property assignment
    public function set width(value: Number): void {
        if (value > 0) {
            this._width = value;
        }
    }
    
    public function get height(): Number {
        return this._height;
    }
    
    public function set height(value: Number): void {
        if (value > 0) {
            this._height = value;
        }
    }
    
    // Computed property
    public function get area(): Number {
        return this._width * this._height;
    }
}

var rect = new Rectangle(10, 5);
console.log(rect.width);    // Looks like property, but calls getter
rect.width = 20;            // Looks like assignment, but calls setter
console.log(rect.area);     // Computed property
`);

console.log("STATUS: This syntax was NEVER implemented in ES4");

// ============================================
// 7. CONST (Proposed)
// ============================================

console.log("\n=== 7. const Keyword (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Only 'var', no constants
 *
 * PROBLEM: No way to prevent variable reassignment
 * Convention to use UPPERCASE for constants
 *
 * ES4 PROPOSAL: const keyword for true constants
 */

console.log("--- OLD WAY (ES3) ---");

var PI = 3.14159; // Convention: UPPERCASE for constants
var MAX_SIZE = 100;

console.log("PI:", PI);
console.log("MAX_SIZE:", MAX_SIZE);

// But they can still be changed!
PI = 3;
MAX_SIZE = 1000;
console.log("PI changed to:", PI);
console.log("MAX_SIZE changed to:", MAX_SIZE);

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced const:");
console.log(`
const PI: Number = 3.14159;
const MAX_SIZE: Number = 100;
const APP_NAME: String = "MyApp";

console.log(PI);  // 3.14159

// These would cause errors:
PI = 3;            // ERROR: Cannot reassign const
MAX_SIZE = 1000;   // ERROR: Cannot reassign const

// const must be initialized
const VALUE;       // ERROR: const must be initialized
`);

console.log("STATUS: const was NOT added in ES4");
console.log("JavaScript continued with only 'var' until ES6");

// ============================================
// 8. LET (Proposed for block scope)
// ============================================

console.log("\n=== 8. let Keyword (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Only function scope with 'var'
 *
 * PROBLEM: Variables leak out of blocks, hoisting confusion
 *
 * ES4 PROPOSAL: let for block-scoped variables
 */

console.log("--- OLD WAY (ES3) ---");

// var is function-scoped, not block-scoped
for (var i = 0; i < 3; i++) {
  console.log("Inside loop:", i);
}
console.log("Outside loop (var leaks):", i); // i is still accessible!

if (true) {
  var x = 10;
}
console.log("Outside if block (var leaks):", x); // x is accessible

// Variable hoisting with var
console.log("Before declaration:", typeof hoisted); // undefined
var hoisted = "value";
console.log("After declaration:", hoisted);

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced let:");
console.log(`
// let is block-scoped
for (let i: Number = 0; i < 3; i++) {
    console.log(i);  // OK - inside block
}
console.log(i);  // ERROR - i is not defined outside loop

if (true) {
    let x: Number = 10;
    console.log(x);  // OK - inside block
}
console.log(x);  // ERROR - x is not defined outside block

// No hoisting with let
console.log(value);  // ERROR - cannot access before declaration
let value: String = "hello";

// Prevents duplicate declarations
let name: String = "John";
let name: String = "Jane";  // ERROR - already declared
`);

console.log("STATUS: let was NOT added in ES4");
console.log("'var' remained the only way to declare variables");

// ============================================
// 9. DESTRUCTURING (Proposed)
// ============================================

console.log("\n=== 9. Destructuring (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Manual extraction of values
 *
 * PROBLEM: Verbose when extracting multiple properties
 *
 * ES4 PROPOSAL: Pattern matching for assignments
 */

console.log("--- OLD WAY (ES3) ---");

var person = {
  name: "John",
  age: 30,
  city: "New York",
};

// ES3 - Manual extraction
var name = person.name;
var age = person.age;
var city = person.city;

console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);

// Array extraction
var numbers = [1, 2, 3, 4, 5];
var first = numbers[0];
var second = numbers[1];
var third = numbers[2];

console.log("First:", first);
console.log("Second:", second);

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced destructuring:");
console.log(`
// Object destructuring
var {name, age, city} = person;
console.log(name, age, city);  // Extracted in one line

// With type annotations
var {name: String, age: Number} = person;

// Renaming while destructuring
var {name: personName, age: personAge} = person;

// Default values
var {name, salary = 50000} = person;  // salary gets default if missing

// Array destructuring
var [first, second, third] = [1, 2, 3, 4, 5];

// Skip elements
var [first, , third] = [1, 2, 3];  // Skip second element

// Rest pattern
var [first, ...rest] = [1, 2, 3, 4, 5];  // rest = [2, 3, 4, 5]

// Nested destructuring
var user = {
    name: "John",
    address: {
        city: "New York",
        zip: "10001"
    }
};

var {name, address: {city, zip}} = user;

// Function parameters
function greet({name, age}: {name: String, age: Number}): void {
    console.log("Hello " + name + ", age " + age);
}
`);

console.log("STATUS: Destructuring was NOT added in ES4");

// ============================================
// 10. GENERATORS (Proposed)
// ============================================

console.log("\n=== 10. Generators (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Manual state management for iteration
 *
 * PROBLEM: Complex to create custom iterators
 *
 * ES4 PROPOSAL: Generator functions with yield
 */

console.log("--- OLD WAY (ES3) ---");

// ES3 - Manual iterator implementation
function createRangeIterator(start, end) {
  return {
    current: start,
    end: end,
    next: function () {
      if (this.current <= this.end) {
        return {
          value: this.current++,
          done: false,
        };
      }
      return {
        value: undefined,
        done: true,
      };
    },
  };
}

var iterator = createRangeIterator(1, 5);
var result = iterator.next();
while (!result.done) {
  console.log("Value:", result.value);
  result = iterator.next();
}

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced generators:");
console.log(`
// Generator function
function* range(start: Number, end: Number): Iterator {
    for (var i = start; i <= end; i++) {
        yield i;  // Pause and return value
    }
}

// Using generator
for (var num in range(1, 5)) {
    console.log(num);  // 1, 2, 3, 4, 5
}

// Generator returns iterator
var iter = range(1, 3);
console.log(iter.next());  // {value: 1, done: false}
console.log(iter.next());  // {value: 2, done: false}
console.log(iter.next());  // {value: 3, done: false}
console.log(iter.next());  // {value: undefined, done: true}

// Generator with state
function* counter(): Iterator {
    var count = 0;
    while (true) {
        yield count++;
    }
}

var c = counter();
console.log(c.next().value);  // 0
console.log(c.next().value);  // 1
console.log(c.next().value);  // 2
`);

console.log("STATUS: Generators were NOT added in ES4");

// ============================================
// 11. OPERATOR OVERLOADING (Proposed)
// ============================================

console.log("\n=== 11. Operator Overloading (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Can't customize operator behavior
 *
 * PROBLEM: Need verbose method calls for custom types
 *
 * ES4 PROPOSAL: Custom operator behavior for classes
 */

console.log("--- OLD WAY (ES3) ---");

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.toString = function () {
  return "(" + this.x + ", " + this.y + ")";
};

var v1 = new Vector(1, 2);
var v2 = new Vector(3, 4);
var v3 = v1.add(v2); // Verbose method call

console.log("v1:", v1.toString());
console.log("v2:", v2.toString());
console.log("v3:", v3.toString());

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have allowed operator overloading:");
console.log(`
class Vector {
    var x: Number;
    var y: Number;
    
    function Vector(x: Number, y: Number) {
        this.x = x;
        this.y = y;
    }
    
    // Overload + operator
    function operator+(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    
    // Overload - operator
    function operator-(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }
    
    // Overload * operator for scalar multiplication
    function operator*(scalar: Number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    
    // Overload == operator
    function operator==(other: Vector): Boolean {
        return this.x == other.x && this.y == other.y;
    }
    
    // Overload [] operator
    function operator[](index: Number): Number {
        if (index == 0) return this.x;
        if (index == 1) return this.y;
        throw new RangeError("Index out of bounds");
    }
}

// Usage would be natural
var v1 = new Vector(1, 2);
var v2 = new Vector(3, 4);
var v3 = v1 + v2;           // Calls operator+
var v4 = v1 - v2;           // Calls operator-
var v5 = v1 * 2;            // Calls operator*
var equals = v1 == v2;      // Calls operator==
var x = v1[0];              // Calls operator[]
`);

console.log("STATUS: Operator overloading was NEVER added");
console.log("Still not available in JavaScript today");

// ============================================
// 12. MULTIMETHODS/FUNCTION OVERLOADING (Proposed)
// ============================================

console.log("\n=== 12. Multimethods (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Manual type checking in functions
 *
 * PROBLEM: Need to manually check types and handle different cases
 *
 * ES4 PROPOSAL: Multiple function definitions based on parameter types
 */

console.log("--- OLD WAY (ES3) ---");

function processES3(value) {
  if (typeof value === "number") {
    return value * 2;
  } else if (typeof value === "string") {
    return value.toUpperCase();
  } else if (value instanceof Array) {
    return value.length;
  } else {
    return "Unknown type";
  }
}

console.log("Number:", processES3(42));
console.log("String:", processES3("hello"));
console.log("Array:", processES3([1, 2, 3]));

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have allowed function overloading:");
console.log(`
// Multiple definitions of same function with different signatures
function process(value: Number): Number {
    return value * 2;
}

function process(value: String): String {
    return value.toUpperCase();
}

function process(value: Array): Number {
    return value.length;
}

// Compiler selects correct version based on argument type
console.log(process(42));         // Calls Number version -> 84
console.log(process("hello"));    // Calls String version -> "HELLO"
console.log(process([1, 2, 3]));  // Calls Array version -> 3

// Works with classes too
class Calculator {
    function add(a: Number, b: Number): Number {
        return a + b;
    }
    
    function add(a: String, b: String): String {
        return a + b;
    }
    
    function add(a: Array, b: Array): Array {
        return a.concat(b);
    }
}

var calc = new Calculator();
calc.add(5, 3);           // -> 8
calc.add("Hello", "World");  // -> "HelloWorld"
calc.add([1, 2], [3, 4]);    // -> [1, 2, 3, 4]
`);

console.log("STATUS: Multimethods were NEVER added");
console.log("JavaScript still requires manual type checking");

// ============================================
// 13. DEFAULT PARAMETER VALUES (Proposed)
// ============================================

console.log("\n=== 13. Default Parameters (PROPOSED - NOT IMPLEMENTED) ===");

/**
 * OLD WAY (ES3): Manual default value handling
 *
 * PROBLEM: Verbose, need to check for undefined
 *
 * ES4 PROPOSAL: Default values in parameter list
 */

console.log("--- OLD WAY (ES3) ---");

function greetES3(name, greeting) {
  greeting = greeting || "Hello";
  return greeting + ", " + name + "!";
}

console.log(greetES3("Alice")); // Uses default
console.log(greetES3("Bob", "Hi")); // Uses provided value

// Problem with falsy values
function multiplyES3(a, b) {
  b = b || 1; // Problem: 0 is falsy!
  return a * b;
}

console.log(multiplyES3(5)); // 5 * 1 = 5
console.log(multiplyES3(5, 0)); // 5 * 1 = 5 (WRONG! Should be 0)

// Better ES3 approach
function multiplyBetter(a, b) {
  b = typeof b !== "undefined" ? b : 1;
  return a * b;
}

console.log(multiplyBetter(5, 0)); // Correctly returns 0

console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have allowed default parameters:");
console.log(`
function greet(name: String, greeting: String = "Hello"): String {
return greeting + ", " + name + "!";
}
console.log(greet("Alice"));          // "Hello, Alice!"
console.log(greet("Bob", "Hi"));      // "Hi, Bob!"
// Works correctly with falsy values
function multiply(a: Number, b: Number = 1): Number {
return a * b;
}
console.log(multiply(5));      // 5 * 1 = 5
console.log(multiply(5, 0));   // 5 * 0 = 0 (Correct!)
// Multiple default parameters
function createUser(
name: String,
age: Number = 18,
role: String = "user",
active: Boolean = true
): Object {
return {name: name, age: age, role: role, active: active};
}
createUser("John");  // Uses all defaults
createUser("Jane", 25);  // Overrides age
createUser("Bob", 30, "admin");  // Overrides age and role
`);
console.log("STATUS: Default parameters were NOT added in ES4");
// ============================================
// 14. REST PARAMETERS (Proposed)
// ============================================
console.log("\n=== 14. Rest Parameters (PROPOSED - NOT IMPLEMENTED) ===");
/**

OLD WAY (ES3): Use arguments object

PROBLEM: arguments is not a real array, awkward to use

ES4 PROPOSAL: Rest parameters with ...
*/

console.log("--- OLD WAY (ES3) ---");
function sumES3() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
console.log("Sum:", sumES3(1, 2, 3, 4, 5));
// arguments is not a real array
function demonstrateArguments() {
  console.log("typeof arguments:", typeof arguments);
  console.log("arguments instanceof Array:", arguments instanceof Array);
  // Can't use array methods directly
  // arguments.forEach(...);  // Error!

  // Need to convert to array
  var argsArray = [];
  for (var i = 0; i < arguments.length; i++) {
    argsArray.push(arguments[i]);
  }
  return argsArray;
}
console.log("Converted:", demonstrateArguments(1, 2, 3));
console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced rest parameters:");
console.log(`
// Collect remaining arguments into array
function sum(...numbers: Array): Number {
var total = 0;
for (var i = 0; i < numbers.length; i++) {
total += numbers[i];
}
return total;
}
console.log(sum(1, 2, 3, 4, 5));  // numbers = [1, 2, 3, 4, 5]
// Mix regular parameters with rest
function greetAll(greeting: String, ...names: Array): String {
var result = greeting + ": ";
for (var i = 0; i < names.length; i++) {
result += names[i];
if (i < names.length - 1) result += ", ";
}
return result;
}
console.log(greetAll("Hello", "Alice", "Bob", "Charlie"));
// -> "Hello: Alice, Bob, Charlie"
// Rest parameter is a real array
function demonstrateRest(...items: Array): void {
console.log(items instanceof Array);  // true
items.forEach(function(item) {
console.log(item);  // Array methods work!
});
}
`);
console.log("STATUS: Rest parameters were NOT added in ES4");
// ============================================
// 15. SEALED AND FINAL CLASSES (Proposed)
// ============================================
console.log("\n=== 15. Sealed/Final Classes (PROPOSED - NOT IMPLEMENTED) ===");
/**

OLD WAY (ES3): No way to prevent extension

PROBLEM: Any constructor can be extended

ES4 PROPOSAL: final and sealed keywords
*/

console.log("--- OLD WAY (ES3) ---");
function BaseClass() {
  this.value = 10;
}
// Can always extend in ES3
function ExtendedClass() {
  BaseClass.call(this);
  this.extra = 20;
}
ExtendedClass.prototype = new BaseClass();
ExtendedClass.prototype.constructor = ExtendedClass;
var instance = new ExtendedClass();
console.log("Can always extend in ES3:", instance.value, instance.extra);
console.log("\n--- ES4 PROPOSAL (NEVER IMPLEMENTED) ---");
console.log("ES4 would have introduced final and sealed:");
console.log(`
// final - Cannot be extended at all
final class FinalClass {
var value: Number;
function FinalClass() {
    this.value = 10;
}
}
// This would cause error:
// class Extended extends FinalClass { }  // ERROR!
// sealed - Can only be extended within same package
package com.example {
sealed class SealedClass {
var value: Number;
}
// OK - in same package
class InternalExtension extends SealedClass { }
}
// ERROR - outside package
class ExternalExtension extends SealedClass { }
// final methods - cannot be overridden
class BaseClass {
final function criticalMethod(): void {
// Cannot be overridden by subclasses
}
function normalMethod(): void {
    // Can be overridden
}
}
class DerivedClass extends BaseClass {
// ERROR - cannot override final method
// function criticalMethod(): void { }
// OK - can override normal method
function normalMethod(): void { }
}
`);
console.log("STATUS: final and sealed were NEVER added");
// ============================================
// 16. CONDITIONAL COMPILATION (Proposed)
// ============================================
console.log(
  "\n=== 16. Conditional Compilation (PROPOSED - NOT IMPLEMENTED) ==="
);
/**

ES4 PROPOSAL: Compile-time conditional code

PURPOSE: Include/exclude code based on build configuration
*/

console.log("ES4 proposed conditional compilation:");
console.log(`
// Set at compile time
const DEBUG: Boolean = true;
const PRODUCTION: Boolean = false;
// Code included only if condition is true
if (DEBUG) {
function debugLog(msg: String): void {
console.log("[DEBUG] " + msg);
}
}
// Code excluded in production builds
if (!PRODUCTION) {
// Development-only code
function runTests(): void {
// Test code here
}
}
// Conditional imports
if (DEBUG) {
import com.example.debugtools.*;
}
// Different code for different platforms
if (PLATFORM == "browser") {
// Browser-specific code
} else if (PLATFORM == "server") {
// Server-specific code
}
`);
console.log("STATUS: Conditional compilation was NEVER added");
console.log("Developers use build tools (webpack, etc.) instead");
// ============================================
// THE COMMITTEE SPLIT
// ============================================
console.log("\n=== THE COMMITTEE SPLIT ===");
console.log("\n📊 Two Camps Emerged:");
console.log("\n🔥 PRO-ES4 (Adobe, Mozilla):");
console.log("   - Wanted ambitious, modern language");
console.log("   - Believed JavaScript needed major upgrade");
console.log("   - Pushed for classes, types, packages");
console.log("   - Wanted to compete with ActionScript, Java");
console.log("\n❄️  ANTI-ES4 (Microsoft, Yahoo):");
console.log("   - Wanted incremental, conservative changes");
console.log("   - Worried about backward compatibility");
console.log("   - Concerned about performance impact");
console.log("   - Preferred gradual evolution");
console.log("\n💔 The Conflict:");
console.log("   - Years of heated debates (2000-2008)");
console.log("   - Could not reach consensus");
console.log("   - Two competing visions for JavaScript");
console.log("   - Risk of language fragmentation");
// ============================================
// WHY ES4 FAILED - DETAILED REASONS
// ============================================
console.log("\n=== WHY ES4 FAILED ===");
console.log("\n1. TOO AMBITIOUS:");
console.log("   - Tried to add 50+ major features");
console.log("   - Would fundamentally change the language");
console.log("   - Scope kept growing over 8+ years");
console.log("   - Became unmanageable");
console.log("\n2. BACKWARD COMPATIBILITY:");
console.log("   - Would break existing ES3 code");
console.log("   - Millions of websites would break");
console.log("   - Migration would be painful");
console.log("   - Unacceptable risk for web");
console.log("\n3. PERFORMANCE CONCERNS:");
console.log("   - Static typing overhead");
console.log("   - Complex runtime checks");
console.log("   - Would slow down JavaScript engines");
console.log("   - Engines optimized for ES3");
console.log("\n4. IMPLEMENTATION COMPLEXITY:");
console.log("   - Would take years to implement");
console.log("   - Browser vendors couldn't agree");
console.log("   - Testing would be massive");
console.log("   - Maintenance burden");
console.log("\n5. POLITICAL ISSUES:");
console.log("   - Committee deadlocked");
console.log("   - Corporate interests clashed");
console.log("   - No path to consensus");
console.log("   - Risk of fork in the language");
// ============================================
// THE OSLO MEETING - AUGUST 2008
// ============================================
console.log("\n=== THE OSLO MEETING - AUGUST 2008 ===");
console.log("\nThe committee met in Oslo and reached historic agreement:");
console.log("\n✅ AGREEMENTS:");
console.log("   1. Abandon ES4 completely");
console.log("   2. Focus on ES3.1 (incremental update)");
console.log("   3. ES3.1 would become ES5");
console.log("   4. Start fresh approach to language evolution");
console.log("   5. Consider ES4 ideas for future (Harmony)");
console.log("\n📋 THE HARMONY PLAN:");
console.log("   - Codename for future JavaScript development");
console.log("   - Balance between both camps");
console.log("   - Incremental improvements");
console.log("   - Backward compatible");
console.log("   - Cherry-pick best ES4 ideas");
console.log("\n🎯 IMMEDIATE ACTIONS:");
console.log("   - Finalize ES3.1/ES5 (released 2009)");
console.log("   - Create new proposal process");
console.log("   - Better committee coordination");
console.log("   - Focus on implementer feedback");
// ============================================
// LESSONS LEARNED
// ============================================
console.log("\n=== LESSONS LEARNED FROM ES4 ===");
console.log("\n1. 📐 SIZE MATTERS:");
console.log("   - Smaller, focused updates work better");
console.log("   - Big bang releases are risky");
console.log("   - Incremental progress wins");
console.log("\n2. 🔙 COMPATIBILITY IS CRUCIAL:");
console.log("   - Cannot break the web");
console.log("   - Backward compatibility non-negotiable");
console.log("   - Migration pain must be minimal");
console.log("\n3. 🤝 CONSENSUS REQUIRED:");
console.log("   - All stakeholders must agree");
console.log("   - Browser vendors must support");
console.log("   - Committee must be unified");
console.log("\n4. 🔬 IMPLEMENTATION FIRST:");
console.log("   - Prove features work in practice");
console.log("   - Get real-world feedback");
console.log("   - Prototype before standardizing");
console.log("\n5. 🎯 CLEAR SCOPE:");
console.log("   - Define clear goals");
console.log("   - Avoid scope creep");
console.log("   - Know when to stop");
// ============================================
// IMPACT ON MODERN JAVASCRIPT
// ============================================
console.log("\n=== IMPACT ON MODERN JAVASCRIPT ===");
console.log("\nThe ES4 failure shaped modern JavaScript development:");
console.log("\n📝 NEW PROCESS (Since 2009):");
console.log("   - Stage 0-4 proposal system");
console.log("   - Multiple browser implementations required");
console.log("   - Community feedback incorporated");
console.log("   - Yearly releases (predictable)");
console.log("   - Features independently reviewed");
console.log("\n✨ ES4 IDEAS THAT SURVIVED:");
console.log("   Many ES4 concepts eventually made it into JavaScript:");
console.log("   - Classes (ES6, different syntax)");
console.log("   - let/const (ES6)");
console.log("   - Destructuring (ES6)");
console.log("   - Default parameters (ES6)");
console.log("   - Rest parameters (ES6)");
console.log("   - Generators (ES6)");
console.log("   - Modules (ES6)");
console.log("   - Getters/setters (ES5)");
console.log("\n❌ ES4 IDEAS THAT NEVER CAME:");
console.log("   - Static typing (use TypeScript)");
console.log("   - Interfaces (use TypeScript)");
console.log("   - Packages (different module system)");
console.log("   - Operator overloading");
console.log("   - Multimethods");
console.log("   - final/sealed keywords");
// ============================================
// TIMELINE SUMMARY
// ============================================
console.log("\n=== COMPLETE TIMELINE ===");
console.log("1997: ES1 released");
console.log("1998: ES2 released (editorial)");
console.log("1999: ES3 released (major update)");
console.log("1999: ES4 work begins");
console.log("2000-2007: ES4 proposals and debates");
console.log("2008: Growing tensions in committee");
console.log("July 2008: ES4 effectively dead");
console.log("August 2008: Oslo meeting - formal abandonment");
console.log("2009: ES5 released (was ES3.1)");
console.log("2015: ES6 released (Harmony fulfilled)");
// ============================================
// SUMMARY
// ============================================
console.log("\n=== ES4 SUMMARY ===");
console.log("ECMAScript 4 (ES4) - ABANDONED 2008");
console.log("\n📊 SCOPE:");
console.log("   - Massive proposed update");
console.log("   - 50+ major features");
console.log("   - Would completely transform JavaScript");
console.log("   - 8+ years in development");
console.log("\n💔 FAILURE REASONS:");
console.log("   - Too ambitious");
console.log("   - Backward incompatible");
console.log("   - Committee deadlock");
console.log("   - Performance concerns");
console.log("   - Implementation complexity");
console.log("\n✅ POSITIVE OUTCOMES:");
console.log("   - Led to better TC39 process");
console.log("   - Ideas survived in later versions");
console.log("   - Taught valuable lessons");
console.log("   - United committee around Harmony");
console.log("   - Made JavaScript evolution sustainable");
console.log("\n🎓 KEY LESSON:");
console.log("   'Don't let perfect be the enemy of good.'");
console.log("   Incremental progress beats revolutionary change.");
console.log("\n=== ES4 Documentation Complete ===");
console.log("Next: ES5 (2009) - The version that actually shipped!");
