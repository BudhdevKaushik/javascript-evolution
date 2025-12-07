/**
 * ECMAScript 3 (ES3) - 1999
 *
 * ES3 was a major update that introduced several powerful features
 * making JavaScript much more robust and practical for real-world applications.
 *
 * Key Features:
 * - Regular Expressions
 * - Better string handling
 * - Try/Catch exception handling
 * - Switch statement improvements
 * - do-while loops
 * - In operator
 * - instanceof operator
 * - Array methods
 * - Better error handling
 */

console.log("=== ECMAScript 3 (ES3) - 1999 ===");
console.log("Major update with powerful new features\n");

// ============================================
// 1. REGULAR EXPRESSIONS
// ============================================

console.log("=== 1. Regular Expressions ===");

/**
 * OLD WAY (ES1/ES2): No built-in pattern matching
 * Had to use indexOf, substring, and manual string manipulation
 *
 * PROBLEM: Complex string validation and searching was difficult
 *
 * NEW WAY (ES3): Regular Expression support with RegExp object
 */

// OLD WAY - Without regex (ES1/ES2)
console.log("--- OLD WAY (ES1/ES2) ---");
var email = "user@example.com";
var hasAt = email.indexOf("@") !== -1;
var hasDot = email.indexOf(".") !== -1;
console.log("Email validation (manual):", hasAt && hasDot);

// NEW WAY - With regex (ES3)
console.log("\n--- NEW WAY (ES3) ---");
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log("Email validation (regex):", emailPattern.test("user@example.com"));

// Creating regex - two ways
var regex1 = /pattern/;
var regex2 = new RegExp("pattern");

// Common regex patterns
var phonePattern = /^\d{3}-\d{3}-\d{4}$/;
console.log("Phone validation:", phonePattern.test("123-456-7890"));

var urlPattern = /^https?:\/\/.+/;
console.log("URL validation:", urlPattern.test("https://example.com"));

// Regex methods
var text = "The quick brown fox jumps over the lazy dog";
console.log("\nRegex methods:");
console.log("test():", /quick/.test(text));
console.log("exec():", /brown/.exec(text));

// String methods with regex
console.log("\nString methods with regex:");
console.log("match():", text.match(/\w+/g));
console.log("search():", text.search(/fox/));
console.log("replace():", text.replace(/dog/, "cat"));

// Regex flags
console.log("\nRegex flags:");
var caseInsensitive = /hello/i;
console.log("Case insensitive:", caseInsensitive.test("HELLO"));

var global = /o/g;
console.log("Global match:", "hello".match(global));

var multiline = /^world/m;
console.log("Multiline test:", multiline.test("hello\nworld"));

// ============================================
// 2. TRY/CATCH/FINALLY - EXCEPTION HANDLING
// ============================================

console.log("\n=== 2. Exception Handling ===");

/**
 * OLD WAY (ES1/ES2): No structured error handling
 * Had to check return values or use conditional logic
 *
 * PROBLEM: Difficult to handle errors gracefully
 * Errors would crash the entire script
 *
 * NEW WAY (ES3): try/catch/finally blocks
 */

// OLD WAY - Without try/catch (ES1/ES2)
console.log("--- OLD WAY (ES1/ES2) ---");
function divideOld(a, b) {
  if (b === 0) {
    console.log("Error: Division by zero");
    return null;
  }
  return a / b;
}
console.log("Division result:", divideOld(10, 0));

// NEW WAY - With try/catch (ES3)
console.log("\n--- NEW WAY (ES3) ---");
function divideNew(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  } catch (error) {
    console.log("Caught error:", error.message);
    return null;
  } finally {
    console.log("Finally block always executes");
  }
}
console.log("Division result:", divideNew(10, 0));

// Different error types
console.log("\nError types:");
try {
  throw new Error("Generic error");
} catch (e) {
  console.log("Error caught:", e.message);
}

try {
  throw new TypeError("Type error");
} catch (e) {
  console.log("TypeError caught:", e.message);
}

try {
  throw new RangeError("Range error");
} catch (e) {
  console.log("RangeError caught:", e.message);
}

try {
  throw new SyntaxError("Syntax error");
} catch (e) {
  console.log("SyntaxError caught:", e.message);
}

// Nested try/catch
try {
  try {
    throw new Error("Inner error");
  } catch (innerError) {
    console.log("Inner catch:", innerError.message);
    throw new Error("Outer error");
  }
} catch (outerError) {
  console.log("Outer catch:", outerError.message);
}

// ============================================
// 3. IN OPERATOR
// ============================================

console.log("\n=== 3. 'in' Operator ===");

/**
 * OLD WAY (ES1/ES2): Check if property exists using typeof or hasOwnProperty
 *
 * PROBLEM: Verbose and not intuitive
 *
 * NEW WAY (ES3): 'in' operator for property checking
 */

var person = {
  name: "John",
  age: 30,
};

// OLD WAY - Without 'in' operator (ES1/ES2)
console.log("--- OLD WAY (ES1/ES2) ---");
console.log("Check with typeof:", typeof person.name !== "undefined");
console.log("Check with hasOwnProperty:", person.hasOwnProperty("name"));

// NEW WAY - With 'in' operator (ES3)
console.log("\n--- NEW WAY (ES3) ---");
console.log("'name' in person:", "name" in person);
console.log("'salary' in person:", "salary" in person);

// Works with arrays
var arr = [1, 2, 3];
console.log("\nArray checks:");
console.log("0 in arr:", 0 in arr);
console.log("5 in arr:", 5 in arr);
console.log("'length' in arr:", "length" in arr);

// Checks prototype chain too
console.log("\nPrototype chain check:");
console.log("'toString' in person:", "toString" in person);

// ============================================
// 4. INSTANCEOF OPERATOR
// ============================================

console.log("\n=== 4. 'instanceof' Operator ===");

/**
 * OLD WAY (ES1/ES2): Check constructor property manually
 *
 * PROBLEM: Not reliable, can be modified
 *
 * NEW WAY (ES3): 'instanceof' operator for type checking
 */

function Animal(name) {
  this.name = name;
}

var dog = new Animal("Buddy");
var arr = [1, 2, 3];
var today = new Date();

// OLD WAY - Without instanceof (ES1/ES2)
console.log("--- OLD WAY (ES1/ES2) ---");
console.log("Check constructor:", dog.constructor === Animal);

// NEW WAY - With instanceof (ES3)
console.log("\n--- NEW WAY (ES3) ---");
console.log("dog instanceof Animal:", dog instanceof Animal);
console.log("dog instanceof Object:", dog instanceof Object);
console.log("arr instanceof Array:", arr instanceof Array);
console.log("today instanceof Date:", today instanceof Date);

// Inheritance check
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
Dog.prototype = new Animal();

var myDog = new Dog("Max", "Labrador");
console.log("\nInheritance check:");
console.log("myDog instanceof Dog:", myDog instanceof Dog);
console.log("myDog instanceof Animal:", myDog instanceof Animal);
console.log("myDog instanceof Object:", myDog instanceof Object);

// ============================================
// 5. BETTER STRING HANDLING
// ============================================

console.log("\n=== 5. Enhanced String Methods ===");

/**
 * NEW IN ES3: Additional string methods for better manipulation
 */

var str = "JavaScript";

console.log("Original string:", str);

// New string methods in ES3
console.log("\nES3 String methods:");
console.log("toLocaleLowerCase():", str.toLocaleLowerCase());
console.log("toLocaleUpperCase():", str.toLocaleUpperCase());

// concat method
var str1 = "Hello";
var str2 = "World";
console.log("\nconcat():", str1.concat(" ", str2));

// localeCompare
console.log("\nlocaleCompare():");
console.log("'a'.localeCompare('b'):", "a".localeCompare("b")); // -1
console.log("'b'.localeCompare('a'):", "b".localeCompare("a")); // 1
console.log("'a'.localeCompare('a'):", "a".localeCompare("a")); // 0

// match with regex
var text = "The year is 2024";
console.log("\nmatch():", text.match(/\d+/));

// replace with function
var greeting = "Hello World";
var replaced = greeting.replace(/\w+/g, function (match) {
  return match.toUpperCase();
});
console.log("replace with function:", replaced);

// ============================================
// 6. ARRAY METHODS
// ============================================

console.log("\n=== 6. New Array Methods ===");

/**
 * NEW IN ES3: Powerful array manipulation methods
 */

var numbers = [1, 2, 3, 4, 5];
var fruits = ["apple", "banana", "orange"];

// concat - join arrays
console.log("concat():", numbers.concat([6, 7, 8]));
console.log("Multiple arrays:", [1, 2].concat([3, 4], [5, 6]));

// slice - extract portion
console.log("\nslice(1, 3):", numbers.slice(1, 3));
console.log("slice(-2):", numbers.slice(-2));

// splice - add/remove elements
var arr1 = [1, 2, 3, 4, 5];
console.log("\nOriginal:", arr1);
arr1.splice(2, 1); // Remove 1 element at index 2
console.log("After splice(2, 1):", arr1);

var arr2 = [1, 2, 5];
arr2.splice(2, 0, 3, 4); // Insert 3, 4 at index 2
console.log("After splice(2, 0, 3, 4):", arr2);

// toString and toLocaleString
console.log("\ntoString():", numbers.toString());
console.log("toLocaleString():", numbers.toLocaleString());

// concat with non-arrays
console.log("\nconcat with values:", [1, 2].concat(3, 4, [5, 6]));

// ============================================
// 7. BETTER ERROR OBJECTS
// ============================================

console.log("\n=== 7. Error Objects ===");

/**
 * NEW IN ES3: Structured error types
 */

console.log("Error types in ES3:");

// Generic Error
var err1 = new Error("Something went wrong");
console.log("Error:", err1.message);

// EvalError
var err2 = new EvalError("Eval error occurred");
console.log("EvalError:", err2.message);

// RangeError
var err3 = new RangeError("Number out of range");
console.log("RangeError:", err3.message);

// ReferenceError
var err4 = new ReferenceError("Variable not found");
console.log("ReferenceError:", err4.message);

// SyntaxError
var err5 = new SyntaxError("Invalid syntax");
console.log("SyntaxError:", err5.message);

// TypeError
var err6 = new TypeError("Wrong type");
console.log("TypeError:", err6.message);

// URIError
var err7 = new URIError("Invalid URI");
console.log("URIError:", err7.message);

// Custom error properties
var customError = new Error("Custom error");
customError.code = 500;
customError.details = "Server error";
console.log("\nCustom error:", customError.message);
console.log("Custom properties:", customError.code, customError.details);

// ============================================
// 8. DO-WHILE LOOP (clarified/standardized)
// ============================================

console.log("\n=== 8. do-while Loop ===");

/**
 * ES3 standardized the do-while loop behavior
 */

console.log("do-while loop:");
var counter = 0;
do {
  console.log("Counter:", counter);
  counter++;
} while (counter < 3);

// Executes at least once even if condition is false
console.log("\nExecutes at least once:");
var num = 10;
do {
  console.log("This runs once even though num >= 10");
} while (num < 10);

// ============================================
// 9. SWITCH STATEMENT IMPROVEMENTS
// ============================================

console.log("\n=== 9. Switch Statement Improvements ===");

/**
 * ES3 clarified switch statement behavior and fall-through
 */

var grade = "B";
var message = "";

switch (grade) {
  case "A":
    message = "Excellent!";
    break;
  case "B":
    message = "Good job!";
    break;
  case "C":
    message = "Well done";
    break;
  case "D":
    message = "You passed";
    break;
  case "F":
    message = "Better try again";
    break;
  default:
    message = "Invalid grade";
}

console.log("Grade message:", message);

// Fall-through behavior
var day = 3;
var dayType = "";

switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    dayType = "Weekday";
    break;
  case 6:
  case 7:
    dayType = "Weekend";
    break;
  default:
    dayType = "Invalid day";
}

console.log("Day type:", dayType);

// ============================================
// 10. OBJECT METHODS IMPROVEMENTS
// ============================================

console.log("\n=== 10. Object Methods ===");

/**
 * ES3 added better object introspection methods
 */

var car = {
  brand: "Toyota",
  model: "Camry",
  year: 2020,
};

// hasOwnProperty - check own property (not inherited)
console.log("hasOwnProperty('brand'):", car.hasOwnProperty("brand"));
console.log("hasOwnProperty('toString'):", car.hasOwnProperty("toString"));

// propertyIsEnumerable
console.log(
  "\npropertyIsEnumerable('brand'):",
  car.propertyIsEnumerable("brand")
);
console.log(
  "propertyIsEnumerable('constructor'):",
  car.propertyIsEnumerable("constructor")
);

// isPrototypeOf
var Animal = function () {};
var dog = new Animal();
console.log(
  "\nAnimal.prototype.isPrototypeOf(dog):",
  Animal.prototype.isPrototypeOf(dog)
);

// ============================================
// 11. FUNCTION.PROTOTYPE.APPLY AND CALL
// ============================================

console.log("\n=== 11. apply() and call() Methods ===");

/**
 * NEW IN ES3: Function context manipulation
 */

function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

var person1 = { name: "Alice" };
var person2 = { name: "Bob" };

// call - invoke with specific context
console.log("call():", greet.call(person1, "Hello", "!"));
console.log("call():", greet.call(person2, "Hi", "."));

// apply - invoke with arguments array
console.log("\napply():", greet.apply(person1, ["Hello", "!"]));
console.log("apply():", greet.apply(person2, ["Hi", "."]));

// Practical use - finding max in array
var nums = [5, 2, 9, 1, 7];
console.log("\nMax using apply:", Math.max.apply(null, nums));
console.log("Min using apply:", Math.min.apply(null, nums));

// ============================================
// 12. ENCODE/DECODE URI FUNCTIONS
// ============================================

console.log("\n=== 12. URI Encoding/Decoding ===");

/**
 * NEW IN ES3: URI handling functions
 */

var url = "https://example.com/search?q=hello world&lang=en";
var uri = "hello world!@#$%";

// encodeURI - encode full URI
console.log("encodeURI():", encodeURI(url));

// encodeURIComponent - encode URI component
console.log("encodeURIComponent():", encodeURIComponent(uri));

// decodeURI
var encoded = encodeURI(url);
console.log("\ndecodeURI():", decodeURI(encoded));

// decodeURIComponent
var encodedComponent = encodeURIComponent(uri);
console.log("decodeURIComponent():", decodeURIComponent(encodedComponent));

// OLD escape/unescape (deprecated in ES3, use encode/decode instead)
console.log("\nOld escape (deprecated):", escape("hello world"));
console.log("Old unescape (deprecated):", unescape(escape("hello world")));

// ============================================
// 13. NUMBER METHODS
// ============================================

console.log("\n=== 13. Number Methods ===");

/**
 * ES3 added number formatting methods
 */

var num = 12345.6789;

console.log("Original number:", num);
console.log("toFixed(2):", num.toFixed(2));
console.log("toExponential(2):", num.toExponential(2));
console.log("toPrecision(4):", num.toPrecision(4));

// Number constants
console.log("\nNumber constants:");
console.log("Number.MAX_VALUE:", Number.MAX_VALUE);
console.log("Number.MIN_VALUE:", Number.MIN_VALUE);
console.log("Number.NaN:", Number.NaN);
console.log("Number.POSITIVE_INFINITY:", Number.POSITIVE_INFINITY);
console.log("Number.NEGATIVE_INFINITY:", Number.NEGATIVE_INFINITY);

// ============================================
// 14. BETTER PROTOTYPE HANDLING
// ============================================

console.log("\n=== 14. Prototype Improvements ===");

/**
 * ES3 clarified prototype chain and inheritance
 */

function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.getType = function () {
  return this.type;
};

function Car(type, brand) {
  Vehicle.call(this, type);
  this.brand = brand;
}

// Set up inheritance
Car.prototype = new Vehicle();
Car.prototype.constructor = Car;

Car.prototype.getBrand = function () {
  return this.brand;
};

var myCar = new Car("Sedan", "Honda");
console.log("Car type:", myCar.getType());
console.log("Car brand:", myCar.getBrand());
console.log("instanceof Vehicle:", myCar instanceof Vehicle);
console.log("instanceof Car:", myCar instanceof Car);

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES3 SUMMARY ===");
console.log("ES3 (1999) Major Features:");
console.log("✓ Regular Expressions - Pattern matching");
console.log("✓ try/catch/finally - Exception handling");
console.log("✓ 'in' operator - Property existence check");
console.log("✓ 'instanceof' operator - Type checking");
console.log("✓ Enhanced string methods");
console.log("✓ New array methods (concat, slice, splice)");
console.log("✓ Structured error types");
console.log("✓ apply() and call() methods");
console.log("✓ URI encode/decode functions");
console.log("✓ Number formatting methods");
console.log("✓ Better prototype handling");

console.log("\n=== ES3 Features Complete ===");
console.log("ES3 made JavaScript a mature, production-ready language!");
