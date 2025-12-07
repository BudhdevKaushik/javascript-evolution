/**
 * ECMAScript 1 (ES1) - 1997
 * The first edition of ECMAScript - Foundation of JavaScript
 *
 * This was the initial standardization of JavaScript, establishing
 * the core language features that are still fundamental today.
 */

// ============================================
// 1. BASIC DATA TYPES
// ============================================

// Primitive Types
var numberType = 42;
var stringType = "Hello, World!";
var booleanType = true;
var nullType = null;
var undefinedType = undefined;

console.log("=== Basic Data Types ===");
console.log("Number:", numberType);
console.log("String:", stringType);
console.log("Boolean:", booleanType);
console.log("Null:", nullType);
console.log("Undefined:", undefinedType);

// ============================================
// 2. VARIABLES
// ============================================

console.log("\n=== Variables ===");
var name = "JavaScript";
var year = 1997;
var isStandard = true;

console.log("Language:", name);
console.log("Year:", year);
console.log("Is Standard:", isStandard);

// ============================================
// 3. OPERATORS
// ============================================

console.log("\n=== Operators ===");

// Arithmetic Operators
var a = 10;
var b = 3;
console.log("Addition:", a + b); // 13
console.log("Subtraction:", a - b); // 7
console.log("Multiplication:", a * b); // 30
console.log("Division:", a / b); // 3.333...
console.log("Modulus:", a % b); // 1

// Comparison Operators
console.log("Equal:", a == b); // false
console.log("Not Equal:", a != b); // true
console.log("Greater than:", a > b); // true
console.log("Less than:", a < b); // false
console.log("Greater or equal:", a >= b); // true
console.log("Less or equal:", a <= b); // false

// Logical Operators
console.log("AND:", true && false); // false
console.log("OR:", true || false); // true
console.log("NOT:", !true); // false

// ============================================
// 4. CONTROL STRUCTURES
// ============================================

console.log("\n=== Control Structures ===");

// If-Else Statement
var age = 18;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// Switch Statement
var day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Other day");
}

// ============================================
// 5. LOOPS
// ============================================

console.log("\n=== Loops ===");

// For Loop
console.log("For Loop:");
for (var i = 0; i < 5; i++) {
  console.log("Iteration:", i);
}

// While Loop
console.log("\nWhile Loop:");
var count = 0;
while (count < 3) {
  console.log("Count:", count);
  count++;
}

// Do-While Loop
console.log("\nDo-While Loop:");
var num = 0;
do {
  console.log("Number:", num);
  num++;
} while (num < 3);

// ============================================
// 6. FUNCTIONS
// ============================================

console.log("\n=== Functions ===");

// Function Declaration
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));

// Function with multiple parameters
function add(x, y) {
  return x + y;
}
console.log("Sum:", add(5, 3));

// Function without return (returns undefined)
function sayHi() {
  console.log("Hi there!");
}
sayHi();

// ============================================
// 7. OBJECTS
// ============================================

console.log("\n=== Objects ===");

// Object Literal
var person = {
  name: "John",
  age: 30,
  city: "New York",
};

console.log("Person:", person);
console.log("Name:", person.name);
console.log("Age:", person["age"]);

// Adding properties
person.country = "USA";
console.log("Updated Person:", person);

// Object with methods
var calculator = {
  value: 0,
  add: function (n) {
    this.value += n;
    return this.value;
  },
  reset: function () {
    this.value = 0;
  },
};

console.log("Calculator add:", calculator.add(5));
console.log("Calculator add:", calculator.add(3));

// ============================================
// 8. ARRAYS
// ============================================

console.log("\n=== Arrays ===");

// Array creation
var fruits = ["Apple", "Banana", "Orange"];
var numbers = [1, 2, 3, 4, 5];
var mixed = [1, "two", true, null];

console.log("Fruits:", fruits);
console.log("First fruit:", fruits[0]);
console.log("Array length:", fruits.length);

// Array methods
fruits.push("Mango"); // Add to end
console.log("After push:", fruits);

fruits.pop(); // Remove from end
console.log("After pop:", fruits);

fruits.unshift("Strawberry"); // Add to beginning
console.log("After unshift:", fruits);

fruits.shift(); // Remove from beginning
console.log("After shift:", fruits);

// Array iteration
console.log("\nIterating array:");
for (var i = 0; i < fruits.length; i++) {
  console.log(i + ":", fruits[i]);
}

// Array join and reverse
var joined = fruits.join(", ");
console.log("Joined:", joined);

fruits.reverse();
console.log("Reversed:", fruits);

// Array slice
var sliced = numbers.slice(1, 3);
console.log("Sliced:", sliced);

// ============================================
// 9. STRING METHODS
// ============================================

console.log("\n=== String Methods ===");

var text = "JavaScript";

console.log("Original:", text);
console.log("Length:", text.length);
console.log("charAt(0):", text.charAt(0));
console.log("indexOf('Script'):", text.indexOf("Script"));
console.log("substring(0, 4):", text.substring(0, 4));
console.log("toLowerCase():", text.toLowerCase());
console.log("toUpperCase():", text.toUpperCase());

// String concatenation
var firstName = "John";
var lastName = "Doe";
var fullName = firstName + " " + lastName;
console.log("Full Name:", fullName);

// More string methods
var sentence = "Hello World";
console.log("split(' '):", sentence.split(" "));
console.log("lastIndexOf('o'):", sentence.lastIndexOf("o"));

// ============================================
// 10. MATH OBJECT
// ============================================

console.log("\n=== Math Object ===");

console.log("Math.PI:", Math.PI);
console.log("Math.E:", Math.E);
console.log("Math.abs(-5):", Math.abs(-5));
console.log("Math.ceil(4.3):", Math.ceil(4.3));
console.log("Math.floor(4.7):", Math.floor(4.7));
console.log("Math.round(4.5):", Math.round(4.5));
console.log("Math.max(1, 5, 3):", Math.max(1, 5, 3));
console.log("Math.min(1, 5, 3):", Math.min(1, 5, 3));
console.log("Math.random():", Math.random());
console.log("Math.sqrt(16):", Math.sqrt(16));
console.log("Math.pow(2, 3):", Math.pow(2, 3));
console.log("Math.sin(Math.PI/2):", Math.sin(Math.PI / 2));
console.log("Math.cos(0):", Math.cos(0));

// ============================================
// 11. DATE OBJECT
// ============================================

console.log("\n=== Date Object ===");

var now = new Date();
console.log("Current Date:", now);
console.log("Year:", now.getFullYear());
console.log("Month:", now.getMonth()); // 0-11
console.log("Date:", now.getDate());
console.log("Day:", now.getDay()); // 0-6 (Sunday-Saturday)
console.log("Hours:", now.getHours());
console.log("Minutes:", now.getMinutes());
console.log("Seconds:", now.getSeconds());
console.log("Milliseconds:", now.getMilliseconds());
console.log("Time (ms):", now.getTime());

// Create specific date
var birthday = new Date(1997, 5, 1); // June 1, 1997
console.log("Birthday:", birthday);

// Set methods
var customDate = new Date();
customDate.setFullYear(2000);
customDate.setMonth(0);
customDate.setDate(1);
console.log("Custom Date:", customDate);

// ============================================
// 12. TYPE CONVERSION
// ============================================

console.log("\n=== Type Conversion ===");

// String to Number
var strNum = "123";
console.log("parseInt:", parseInt(strNum));
console.log("parseFloat:", parseFloat("123.45"));
console.log("parseInt with radix:", parseInt("FF", 16));

// Number to String
var num = 456;
console.log("String conversion:", num.toString());
console.log("String concatenation:", "" + num);

// Boolean conversion
console.log("Boolean(1):", Boolean(1));
console.log("Boolean(0):", Boolean(0));
console.log("Boolean(''):", Boolean(""));
console.log("Boolean('text'):", Boolean("text"));

// ============================================
// 13. TYPEOF OPERATOR
// ============================================

console.log("\n=== typeof Operator ===");

console.log("typeof 42:", typeof 42);
console.log("typeof 'hello':", typeof "hello");
console.log("typeof true:", typeof true);
console.log("typeof undefined:", typeof undefined);
console.log("typeof null:", typeof null); // "object" (historical bug)
console.log("typeof {}:", typeof {});
console.log("typeof []:", typeof []); // "object"
console.log("typeof function(){}:", typeof function () {});

// ============================================
// 14. SCOPE
// ============================================

console.log("\n=== Scope ===");

var globalVar = "I'm global";

function testScope() {
  var localVar = "I'm local";
  console.log("Inside function - global:", globalVar);
  console.log("Inside function - local:", localVar);
}

testScope();
console.log("Outside function - global:", globalVar);
// console.log(localVar); // Would cause error - localVar is not defined

// ============================================
// 15. CONSTRUCTOR FUNCTIONS
// ============================================

console.log("\n=== Constructor Functions ===");

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    return "Hello, I'm " + this.name;
  };
}

var person1 = new Person("Alice", 25);
var person2 = new Person("Bob", 30);

console.log(person1.name, person1.age);
console.log(person1.greet());
console.log(person2.name, person2.age);
console.log(person2.greet());

// ============================================
// 16. THIS KEYWORD
// ============================================

console.log("\n=== this Keyword ===");

var car = {
  brand: "Toyota",
  model: "Camry",
  getInfo: function () {
    return this.brand + " " + this.model;
  },
};

console.log(car.getInfo());

// ============================================
// 17. PROTOTYPE
// ============================================

console.log("\n=== Prototype ===");

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return this.name + " makes a sound";
};

var dog = new Animal("Dog");
console.log(dog.speak());

// ============================================
// 18. EVAL (Use with caution!)
// ============================================

console.log("\n=== eval() ===");

var x = 10;
var y = 20;
var result = eval("x + y");
console.log("eval result:", result);

// Note: eval() is generally discouraged in modern JavaScript

// ============================================
// 19. ISNAN AND ISFINITE
// ============================================

console.log("\n=== isNaN and isFinite ===");

console.log("isNaN(123):", isNaN(123));
console.log("isNaN('hello'):", isNaN("hello"));
console.log("isNaN(NaN):", isNaN(NaN));

console.log("isFinite(123):", isFinite(123));
console.log("isFinite(Infinity):", isFinite(Infinity));
console.log("isFinite(NaN):", isFinite(NaN));

// ============================================
// 20. ESCAPE AND UNESCAPE
// ============================================

console.log("\n=== escape and unescape ===");

var original = "Hello World!";
var escaped = escape(original);
var unescaped = unescape(escaped);

console.log("Original:", original);
console.log("Escaped:", escaped);
console.log("Unescaped:", unescaped);

// ============================================
// 21. VOID OPERATOR
// ============================================

console.log("\n=== void Operator ===");

var value = void 0;
console.log("void(0):", value); // undefined

function testVoid() {
  return void console.log("This runs but returns undefined");
}
console.log("testVoid():", testVoid());

console.log("\n=== ES1 Features Complete ===");
console.log("ES1 established the foundation of JavaScript!");
