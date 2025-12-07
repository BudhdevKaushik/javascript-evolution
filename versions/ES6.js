/**
 * ECMAScript 6 (ES6 / ES2015) - 2015
 *
 * ES6 was a MAJOR update to JavaScript, introducing significant new features
 * and syntax improvements. It was the biggest update to the language since ES5 (2009).
 * ES6 modernized JavaScript and made it more powerful and expressive.
 *
 * Key Changes:
 * - Block-scoped variables (let, const)
 * - Arrow functions
 * - Classes
 * - Modules
 * - Promises
 * - Template literals
 * - Destructuring
 * - Default parameters, rest/spread operators
 * - Iterators, generators, and for...of loops
 * - New data structures (Map, Set, WeakMap, WeakSet)
 * - Symbols
 * - Proxies and Reflect API
 * - Enhanced object literals
 * - And much more!
 */

console.log("=== ECMAScript 6 (ES6 / ES2015) - 2015 ===");
console.log("ES6 introduced major new features to JavaScript\n");

// ============================================
// 1. LET AND CONST - BLOCK-SCOPED VARIABLES
// ============================================

console.log("=== 1. Let and Const ===");

/**
 * PROBLEM: ES5 only had 'var' which is function-scoped and causes issues
 * SOLUTION: ES6 introduced 'let' (mutable) and 'const' (immutable) with block scope
 */

// NEW WAY (ES6): Using let for mutable variables
{
  let blockScoped = "I'm block scoped";
  console.log("Inside block:", blockScoped);
}
// console.log(blockScoped); // ReferenceError: blockScoped is not defined

// NEW WAY (ES6): Using const for constants
const PI = 3.14159;
console.log("PI:", PI);
// PI = 3.14; // TypeError: Assignment to constant variable

// NEW WAY (ES6): No hoisting issues with let
console.log("Let prevents hoisting issues");
// console.log(letVar); // ReferenceError: Cannot access before initialization
let letVar = "Safe from hoisting";

// OLD WAY (ES5): Using var (function-scoped, hoisting issues)
{
  var functionScoped = "I'm function scoped";
  console.log("Inside block:", functionScoped);
}
console.log("Outside block (var):", functionScoped); // Still accessible!

// OLD WAY (ES5): Var hoisting causes confusion
console.log("Var allows hoisting:", varExample); // undefined (not an error!)
var varExample = "Hoisted";

// OLD WAY (ES5): Simulating constants (by convention only)
var PI_OLD = 3.14159; // Nothing prevents reassignment
PI_OLD = 3.14; // No error, just convention
console.log("Old PI can be changed:", PI_OLD);

console.log("");

// ============================================
// 2. ARROW FUNCTIONS
// ============================================

console.log("=== 2. Arrow Functions ===");

/**
 * PROBLEM: ES5 function syntax is verbose, 'this' binding is confusing
 * SOLUTION: ES6 arrow functions provide concise syntax and lexical 'this'
 */

// NEW WAY (ES6): Arrow function - concise syntax
const add = (a, b) => a + b;
console.log("Arrow add(5, 3):", add(5, 3));

// NEW WAY (ES6): Single parameter doesn't need parentheses
const square = (x) => x * x;
console.log("Arrow square(4):", square(4));

// NEW WAY (ES6): No parameters need empty parentheses
const greet = () => "Hello!";
console.log("Arrow greet():", greet());

// NEW WAY (ES6): Lexical 'this' binding
const person = {
  name: "Alice",
  hobbies: ["reading", "coding"],
  showHobbies: function () {
    // Arrow function inherits 'this' from parent scope
    this.hobbies.forEach((hobby) => {
      console.log(this.name + " likes " + hobby);
    });
  },
};
person.showHobbies();

// OLD WAY (ES5): Traditional function expression
var addOld = function (a, b) {
  return a + b;
};
console.log("Old add(5, 3):", addOld(5, 3));

// OLD WAY (ES5): Verbose syntax
var squareOld = function (x) {
  return x * x;
};

// OLD WAY (ES5): 'this' binding requires workarounds
var personOld = {
  name: "Bob",
  hobbies: ["gaming", "music"],
  showHobbies: function () {
    var self = this; // Store 'this' reference
    this.hobbies.forEach(function (hobby) {
      console.log(self.name + " likes " + hobby); // Use 'self'
    });
  },
};
personOld.showHobbies();

console.log("");

// ============================================
// 3. TEMPLATE LITERALS (TEMPLATE STRINGS)
// ============================================

console.log("=== 3. Template Literals ===");

/**
 * PROBLEM: ES5 string concatenation is clunky and hard to read
 * SOLUTION: ES6 template literals with backticks allow embedded expressions
 */

// NEW WAY (ES6): Template literals with embedded expressions
const name = "John";
const age = 30;
const message = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(message);

// NEW WAY (ES6): Multi-line strings
const multiline = `
  This is a
  multiline string
  that preserves formatting
`;
console.log("Multiline:", multiline);

// NEW WAY (ES6): Expression evaluation
const a = 10;
const b = 20;
console.log(`Sum: ${a + b}, Product: ${a * b}`);

// NEW WAY (ES6): Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `**${values[i]}**` : "");
  }, "");
}
const highlighted = highlight`Name: ${name}, Age: ${age}`;
console.log("Tagged template:", highlighted);

// OLD WAY (ES5): String concatenation with +
var nameOld = "Jane";
var ageOld = 25;
var messageOld =
  "Hello, my name is " + nameOld + " and I am " + ageOld + " years old.";
console.log(messageOld);

// OLD WAY (ES5): Multi-line strings require escaping
var multilineOld =
  "This is a\n" + "multiline string\n" + "that uses concatenation";
console.log("Old multiline:", multilineOld);

// OLD WAY (ES5): Expression evaluation in strings
var aOld = 10;
var bOld = 20;
console.log("Sum: " + (aOld + bOld) + ", Product: " + aOld * bOld);

console.log("");

// ============================================
// 4. DESTRUCTURING ASSIGNMENT
// ============================================

console.log("=== 4. Destructuring ===");

/**
 * PROBLEM: ES5 requires verbose syntax to extract values from objects/arrays
 * SOLUTION: ES6 destructuring provides concise syntax to unpack values
 */

// NEW WAY (ES6): Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log("First:", first, "Second:", second, "Rest:", rest);

// NEW WAY (ES6): Skipping elements
const [x, , z] = [10, 20, 30];
console.log("x:", x, "z:", z);

// NEW WAY (ES6): Object destructuring
const user = { username: "alice", email: "alice@example.com", age: 28 };
const { username, email } = user;
console.log("Username:", username, "Email:", email);

// NEW WAY (ES6): Renaming variables
const { username: userName, age: userAge } = user;
console.log("Renamed - userName:", userName, "userAge:", userAge);

// NEW WAY (ES6): Default values
const { username: un, role = "user" } = user;
console.log("Username:", un, "Role:", role);

// NEW WAY (ES6): Nested destructuring
const employee = {
  id: 1,
  info: { firstName: "John", lastName: "Doe" },
  position: "Developer",
};
const {
  info: { firstName, lastName },
} = employee;
console.log("Name:", firstName, lastName);

// OLD WAY (ES5): Manual array element extraction
var numbersOld = [1, 2, 3, 4, 5];
var firstOld = numbersOld[0];
var secondOld = numbersOld[1];
var restOld = numbersOld.slice(2);
console.log("Old - First:", firstOld, "Second:", secondOld, "Rest:", restOld);

// OLD WAY (ES5): Manual object property extraction
var userOld = { username: "bob", email: "bob@example.com", age: 30 };
var usernameOld = userOld.username;
var emailOld = userOld.email;
console.log("Old - Username:", usernameOld, "Email:", emailOld);

// OLD WAY (ES5): Renaming requires extra variables
var userNameOld = userOld.username;
var userAgeOld = userOld.age;
console.log("Old Renamed:", userNameOld, userAgeOld);

console.log("");

// ============================================
// 5. DEFAULT PARAMETERS
// ============================================

console.log("=== 5. Default Parameters ===");

/**
 * PROBLEM: ES5 requires manual checks for undefined parameters
 * SOLUTION: ES6 allows default values in function signatures
 */

// NEW WAY (ES6): Default parameters
function multiply(a, b = 1) {
  return a * b;
}
console.log("multiply(5):", multiply(5));
console.log("multiply(5, 3):", multiply(5, 3));

// NEW WAY (ES6): Complex default values
function createUser(name, role = "guest", active = true) {
  return { name, role, active };
}
console.log("User with defaults:", createUser("Alice"));
console.log("User custom:", createUser("Bob", "admin", false));

// NEW WAY (ES6): Default can reference other parameters
function greetUser(firstName, lastName, greeting = `Hello ${firstName}!`) {
  return greeting;
}
console.log(greetUser("John", "Doe"));

// OLD WAY (ES5): Manual undefined checks
function multiplyOld(a, b) {
  b = typeof b !== "undefined" ? b : 1;
  return a * b;
}
console.log("Old multiply(5):", multiplyOld(5));
console.log("Old multiply(5, 3):", multiplyOld(5, 3));

// OLD WAY (ES5): OR operator shortcut (but fails for falsy values)
function multiplyShortcut(a, b) {
  b = b || 1; // Problem: 0 is falsy!
  return a * b;
}
console.log("multiply(5, 0):", multiplyShortcut(5, 0)); // Returns 5, not 0!

console.log("");

// ============================================
// 6. REST PARAMETERS
// ============================================

console.log("=== 6. Rest Parameters ===");

/**
 * PROBLEM: ES5 uses 'arguments' object which is array-like, not a real array
 * SOLUTION: ES6 rest parameters (...) create real arrays
 */

// NEW WAY (ES6): Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log("sum(1, 2, 3, 4, 5):", sum(1, 2, 3, 4, 5));

// NEW WAY (ES6): Rest with other parameters
function introduce(greeting, ...names) {
  return `${greeting} ${names.join(", ")}!`;
}
console.log(introduce("Hello", "Alice", "Bob", "Charlie"));

// NEW WAY (ES6): Rest parameters are real arrays
function example(...args) {
  console.log("Is array?", Array.isArray(args)); // true
  console.log("Has map?", typeof args.map === "function"); // true
}
example(1, 2, 3);

// OLD WAY (ES5): Using arguments object
function sumOld() {
  var numbers = Array.prototype.slice.call(arguments);
  return numbers.reduce(function (total, num) {
    return total + num;
  }, 0);
}
console.log("Old sum(1, 2, 3, 4, 5):", sumOld(1, 2, 3, 4, 5));

// OLD WAY (ES5): arguments is array-like, not a real array
function exampleOld() {
  console.log("Is array?", Array.isArray(arguments)); // false
  console.log("Has map?", typeof arguments.map); // undefined
}
exampleOld(1, 2, 3);

console.log("");

// ============================================
// 7. SPREAD OPERATOR
// ============================================

console.log("=== 7. Spread Operator ===");

/**
 * PROBLEM: ES5 requires verbose methods to expand arrays/objects
 * SOLUTION: ES6 spread operator (...) expands iterables inline
 */

// NEW WAY (ES6): Spread in array literals
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
console.log("Spread array:", arr2);

// NEW WAY (ES6): Combining arrays
const combined = [...arr1, ...arr2];
console.log("Combined:", combined);

// NEW WAY (ES6): Spread in function calls
const nums = [5, 2, 8, 1, 9];
console.log("Max:", Math.max(...nums));

// NEW WAY (ES6): Copying arrays
const original = [1, 2, 3];
const copy = [...original];
console.log("Copy:", copy);

// NEW WAY (ES6): Spread with objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log("Spread object:", obj2);

// NEW WAY (ES6): Merging objects
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log("Merged settings:", settings);

// OLD WAY (ES5): Array concatenation
var arr1Old = [1, 2, 3];
var arr2Old = arr1Old.concat([4, 5, 6]);
console.log("Old concat:", arr2Old);

// OLD WAY (ES5): Combining multiple arrays
var combinedOld = arr1Old.concat(arr2Old);
console.log("Old combined:", combinedOld);

// OLD WAY (ES5): Apply for spreading
var numsOld = [5, 2, 8, 1, 9];
console.log("Old max:", Math.max.apply(null, numsOld));

// OLD WAY (ES5): Copying arrays
var originalOld = [1, 2, 3];
var copyOld = originalOld.slice();
console.log("Old copy:", copyOld);

// OLD WAY (ES5): Manual object merging
function extend(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultsOld = { theme: "light", lang: "en" };
var userPrefsOld = { theme: "dark" };
var settingsOld = extend({}, defaultsOld);
extend(settingsOld, userPrefsOld);
console.log("Old merged:", settingsOld);

console.log("");

// ============================================
// 8. ENHANCED OBJECT LITERALS
// ============================================

console.log("=== 8. Enhanced Object Literals ===");

/**
 * PROBLEM: ES5 object literals are verbose and repetitive
 * SOLUTION: ES6 adds shorthand properties, methods, and computed keys
 */

// NEW WAY (ES6): Property shorthand
const X = 10;
const y = 20;
const point = { X, y }; // Same as { x: x, y: y }
console.log("Point:", point);

// NEW WAY (ES6): Method shorthand
const calculator = {
  value: 0,
  add(n) {
    // Instead of add: function(n)
    this.value += n;
    return this;
  },
  multiply(n) {
    this.value *= n;
    return this;
  },
};
calculator.add(5).multiply(2);
console.log("Calculator value:", calculator.value);

// NEW WAY (ES6): Computed property names
const propName = "dynamicKey";
const obj = {
  [propName]: "value",
  ["computed" + "Key"]: "another value",
};
console.log("Computed properties:", obj);

// NEW WAY (ES6): All together
const id = 42;
const username2 = "john_doe";
const userData = {
  id,
  username2,
  getName() {
    return this.username2;
  },
  ["user_" + id]: true,
};
console.log("Enhanced object:", userData);

// OLD WAY (ES5): Explicit property assignment
var xOld = 10;
var yOld = 20;
var pointOld = { x: xOld, y: yOld };
console.log("Old point:", pointOld);

// OLD WAY (ES5): Function properties
var calculatorOld = {
  value: 0,
  add: function (n) {
    this.value += n;
    return this;
  },
  multiply: function (n) {
    this.value *= n;
    return this;
  },
};

// OLD WAY (ES5): Computed property names (manual)
var propNameOld = "dynamicKey";
var objOld = {};
objOld[propNameOld] = "value";
objOld["computed" + "Key"] = "another value";
console.log("Old computed:", objOld);

console.log("");

// ============================================
// 9. CLASSES
// ============================================

console.log("=== 9. Classes ===");

/**
 * PROBLEM: ES5 prototypal inheritance is complex and error-prone
 * SOLUTION: ES6 classes provide familiar OOP syntax (syntactic sugar over prototypes)
 */

// NEW WAY (ES6): Class syntax
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }

  static info() {
    console.log("Animals are living creatures");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks`);
  }

  wagTail() {
    console.log(`${this.name} wags tail`);
  }
}

const myDog = new Dog("Buddy", "Labrador");
myDog.speak();
myDog.wagTail();
Animal.info();

// NEW WAY (ES6): Getters and setters
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get area() {
    return this._width * this._height;
  }

  set width(value) {
    if (value > 0) this._width = value;
  }
}

const rect = new Rectangle(10, 5);
console.log("Rectangle area:", rect.area);

// OLD WAY (ES5): Constructor functions
function AnimalOld(name) {
  this.name = name;
}

AnimalOld.prototype.speak = function () {
  console.log(this.name + " makes a sound");
};

AnimalOld.info = function () {
  console.log("Animals are living creatures");
};

function DogOld(name, breed) {
  AnimalOld.call(this, name);
  this.breed = breed;
}

// OLD WAY (ES5): Manual prototype chain setup
DogOld.prototype = Object.create(AnimalOld.prototype);
DogOld.prototype.constructor = DogOld;

DogOld.prototype.speak = function () {
  console.log(this.name + " barks");
};

DogOld.prototype.wagTail = function () {
  console.log(this.name + " wags tail");
};

var myDogOld = new DogOld("Max", "Beagle");
myDogOld.speak();
myDogOld.wagTail();

console.log("");

// ============================================
// 10. MODULES (Import/Export)
// ============================================

console.log("=== 10. Modules ===");

/**
 * PROBLEM: ES5 had no native module system (relied on patterns or CommonJS)
 * SOLUTION: ES6 introduced native import/export syntax
 */

// NEW WAY (ES6): Named exports
// In a module file (math.js):
// export const PI = 3.14159;
// export function add(a, b) { return a + b; }
// export class Calculator { }

// NEW WAY (ES6): Default export
// export default class MyClass { }

// NEW WAY (ES6): Importing
// import MyClass from './myclass.js';
// import { PI, add } from './math.js';
// import * as Math from './math.js';

console.log("ES6 modules provide native import/export syntax");
console.log("Note: Modules execute in strict mode by default");

// OLD WAY (ES5): CommonJS (Node.js)
// module.exports = {
//   PI: 3.14159,
//   add: function(a, b) { return a + b; }
// };

// OLD WAY (ES5): Requiring modules
// var math = require('./math');
// console.log(math.PI);

// OLD WAY (ES5): IIFE module pattern (browsers)
// var MyModule = (function() {
//   var privateVar = 'private';
//
//   return {
//     publicMethod: function() {
//       return privateVar;
//     }
//   };
// })();

console.log("");

// ============================================
// 11. PROMISES
// ============================================

console.log("=== 11. Promises ===");

/**
 * PROBLEM: ES5 callbacks lead to "callback hell" and error handling issues
 * SOLUTION: ES6 Promises provide better async flow control
 */

// NEW WAY (ES6): Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data loaded successfully");
      } else {
        reject("Error loading data");
      }
    }, 1000);
  });
};

// NEW WAY (ES6): Using Promises
console.log("Fetching data with Promise...");
fetchData()
  .then((data) => {
    console.log("Success:", data);
    return "Next step";
  })
  .then((result) => {
    console.log("Chained:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Promise completed");
  });

// NEW WAY (ES6): Promise.all for parallel operations
const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(42);
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("foo"), 100)
);

Promise.all([promise1, promise2, promise3]).then((values) =>
  console.log("All promises:", values)
);

// NEW WAY (ES6): Promise.race
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("First"), 100)),
  new Promise((resolve) => setTimeout(() => resolve("Second"), 200)),
]).then((winner) => console.log("Race winner:", winner));

// OLD WAY (ES5): Callback pattern
function fetchDataOld(callback) {
  setTimeout(function () {
    var success = true;
    if (success) {
      callback(null, "Data loaded successfully");
    } else {
      callback("Error loading data", null);
    }
  }, 1000);
}

// OLD WAY (ES5): Callback hell
console.log("Using callbacks (old way)...");
fetchDataOld(function (error, data) {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success:", data);
    // Nested callbacks become messy
    fetchDataOld(function (error2, data2) {
      if (error2) {
        console.error("Error:", error2);
      } else {
        console.log("Nested success:", data2);
      }
    });
  }
});

console.log("");

// ============================================
// 12. SYMBOL
// ============================================

console.log("=== 12. Symbol ===");

/**
 * PROBLEM: ES5 has no way to create truly unique identifiers
 * SOLUTION: ES6 Symbol creates unique, immutable values
 */

// NEW WAY (ES6): Creating symbols
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log("sym1 === sym2:", sym1 === sym2); // false - each is unique

// NEW WAY (ES6): Symbols as object keys
const uniqueKey = Symbol("unique");
const objectWithSymbol = {
  [uniqueKey]: "This is private-ish",
  publicProp: "This is public",
};
console.log("Symbol property:", objectWithSymbol[uniqueKey]);

// NEW WAY (ES6): Symbols are not enumerable
console.log("Object keys:", Object.keys(objectWithSymbol)); // Doesn't include symbol
console.log("Symbol keys:", Object.getOwnPropertySymbols(objectWithSymbol));

// NEW WAY (ES6): Well-known symbols
const iterableObj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      },
    };
  },
};

for (const value of iterableObj) {
  console.log("Iterable value:", value);
}

// OLD WAY (ES5): No equivalent for true uniqueness
// Had to rely on conventions or complex workarounds
var uniqueIdCounter = 0;
function createUniqueId() {
  return "_unique_" + uniqueIdCounter++;
}
var id1 = createUniqueId();
var id2 = createUniqueId();
console.log("Old unique IDs:", id1, id2);

console.log("");

// ============================================
// 13. ITERATORS AND FOR...OF LOOPS
// ============================================

console.log("=== 13. Iterators and for...of ===");

/**
 * PROBLEM: ES5 for...in loops over object properties, not values
 * SOLUTION: ES6 for...of iterates over iterable values
 */

// NEW WAY (ES6): for...of with arrays
const colors = ["red", "green", "blue"];
console.log("For...of with array:");
for (const color of colors) {
  console.log(" -", color);
}

// NEW WAY (ES6): for...of with strings
const text = "Hello";
console.log("For...of with string:");
for (const char of text) {
  console.log(" -", char);
}

// NEW WAY (ES6): for...of with Maps
const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
console.log("For...of with Map:");
for (const [key, value] of map) {
  console.log(` - ${key}: ${value}`);
}

// NEW WAY (ES6): for...of with Sets
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
console.log("For...of with Set:");
for (const num of uniqueNumbers) {
  console.log(" -", num);
}

// OLD WAY (ES5): Traditional for loop
var colorsOld = ["red", "green", "blue"];
console.log("Old for loop:");
for (var i = 0; i < colorsOld.length; i++) {
  console.log(" -", colorsOld[i]);
}

// OLD WAY (ES5): forEach (can't break or return)
console.log("Old forEach:");
colorsOld.forEach(function (color) {
  console.log(" -", color);
});

// OLD WAY (ES5): for...in (iterates over keys, not values)
console.log("Old for...in (shows indices):");
for (var index in colorsOld) {
  console.log(" -", index, ":", colorsOld[index]);
}

console.log("");

// ============================================
// 14. GENERATORS
// ============================================

console.log("=== 14. Generators ===");

/**
 * PROBLEM: ES5 has no way to pause and resume function execution
 * SOLUTION: ES6 generators can yield multiple values over time
 */

// NEW WAY (ES6): Generator function
function* numberGenerator() {
  console.log("Starting generator");
  yield 1;
  console.log("After first yield");
  yield 2;
  console.log("After second yield");
  yield 3;
  console.log("Generator done");
}

const gen = numberGenerator();
console.log("First call:", gen.next()); // { value: 1, done: false }
console.log("Second call:", gen.next()); // { value: 2, done: false }
console.log("Third call:", gen.next()); // { value: 3, done: false }
console.log("Fourth call:", gen.next()); // { value: undefined, done: true }

// NEW WAY (ES6): Infinite generator
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const infinite = infiniteSequence();
console.log("Infinite:", infinite.next().value); // 0
console.log("Infinite:", infinite.next().value); // 1
console.log("Infinite:", infinite.next().value); // 2

// NEW WAY (ES6): Generator with parameters
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.log("Range generator:");
for (const num of range(1, 5)) {
  console.log(" -", num);
}

// OLD WAY (ES5): Manual state machine (complex and error-prone)
function numberGeneratorOld() {
  var state = 0;
  var done = false;

  return {
    next: function () {
      if (done) return { done: true };

      switch (state) {
        case 0:
          state++;
          return { value: 1, done: false };
        case 1:
          state++;
          return { value: 2, done: false };
        case 2:
          done = true;
          return { value: 3, done: false };
        default:
          return { done: true };
      }
    },
  };
}

var genOld = numberGeneratorOld();
console.log("Old generator:", genOld.next());
console.log("Old generator:", genOld.next());

console.log("");

// ============================================
// 15. MAP AND SET
// ============================================

console.log("=== 15. Map and Set ===");

/**
 * PROBLEM: ES5 objects as maps have limitations, no native Set
 * SOLUTION: ES6 provides Map and Set data structures
 */

// NEW WAY (ES6): Map - proper key-value store
const userMap = new Map();
userMap.set("id", 1);
userMap.set("name", "Alice");
userMap.set(123, "numeric key");
userMap.set({ key: "obj" }, "object key");

console.log("Map get 'name':", userMap.get("name"));
console.log("Map size:", userMap.size);
console.log("Map has 'id':", userMap.has("id"));

// NEW WAY (ES6): Map iteration
console.log("Map iteration:");
for (const [key, value] of userMap) {
  console.log(` - ${key}: ${value}`);
}

// NEW WAY (ES6): Map methods
userMap.forEach((value, key) => {
  console.log(` - forEach ${key}: ${value}`);
});

// NEW WAY (ES6): Set - unique values collection
const numberSet = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log("Set (removes duplicates):", Array.from(numberSet));
console.log("Set size:", numberSet.size);

// NEW WAY (ES6): Set operations
numberSet.add(6);
numberSet.add(3); // Won't add duplicate
console.log("After add:", Array.from(numberSet));
console.log("Has 3?", numberSet.has(3));
numberSet.delete(2);
console.log("After delete 2:", Array.from(numberSet));

// NEW WAY (ES6): Set iteration
console.log("Set iteration:");
for (const value of numberSet) {
  console.log(" -", value);
}

// OLD WAY (ES5): Object as map (limited)
var userMapOld = {};
userMapOld["id"] = 1;
userMapOld["name"] = "Bob";
userMapOld[123] = "numeric key"; // Converted to string!

console.log("Old map get 'name':", userMapOld["name"]);
console.log("Old map keys:", Object.keys(userMapOld).length);

// OLD WAY (ES5): Set simulation with objects
var numberSetOld = {};
var numberz = [1, 2, 3, 3, 4, 4, 5];
numberz.forEach(function (num) {
  numberSetOld[num] = true;
});

console.log("Old set keys:", Object.keys(numberSetOld));
console.log("Old set has 3?", numberSetOld[3] === true);

// OLD WAY (ES5): Or array with indexOf checks
var setArray = [];
function addToSet(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
addToSet(setArray, 1);
addToSet(setArray, 2);
addToSet(setArray, 2); // Won't add duplicate
console.log("Old array set:", setArray);

console.log("");

// ============================================
// 16. WEAKMAP AND WEAKSET
// ============================================

console.log("=== 16. WeakMap and WeakSet ===");

/**
 * PROBLEM: ES5 maps can cause memory leaks with object keys
 * SOLUTION: ES6 WeakMap/WeakSet allow garbage collection of keys
 */

// NEW WAY (ES6): WeakMap - object keys only, allows GC
const weakMap = new WeakMap();
let objKey = { id: 1 };
weakMap.set(objKey, "metadata");
console.log("WeakMap get:", weakMap.get(objKey));
console.log("WeakMap has:", weakMap.has(objKey));

// When objKey is no longer referenced elsewhere, it can be garbage collected
// objKey = null; // Now the entry can be GC'd

// NEW WAY (ES6): WeakSet - object values only
const weakSet = new WeakSet();
let objValue = { name: "test" };
weakSet.add(objValue);
console.log("WeakSet has:", weakSet.has(objValue));

// NEW WAY (ES6): Use case - private data
const privateData = new WeakMap();

class Person {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }
}

const personInstance = new Person("Charlie");
console.log("Private name:", personInstance.getName());

// OLD WAY (ES5): No equivalent - had to use patterns or risk memory leaks
// Using regular objects could cause memory leaks
var oldPrivateData = {};
var counter = 0;

function PersonOld(name) {
  var id = counter++;
  this._id = id;
  oldPrivateData[id] = { name: name };
}

PersonOld.prototype.getName = function () {
  return oldPrivateData[this._id].name;
};

console.log("");

// ============================================
// 17. PROXY
// ============================================

console.log("=== 17. Proxy ===");

/**
 * PROBLEM: ES5 has limited ability to intercept object operations
 * SOLUTION: ES6 Proxy can intercept and customize object behavior
 */

// NEW WAY (ES6): Proxy for property access
const targetObj = { message: "Hello", count: 0 };
const handler = {
  get(target, prop) {
    console.log(`Getting property: ${prop}`);
    return prop in target ? target[prop] : "Property not found";
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const proxy = new Proxy(targetObj, handler);
console.log("Proxy access:", proxy.message);
console.log("Proxy unknown:", proxy.unknown);
proxy.count = 5;

// NEW WAY (ES6): Validation proxy
const validatedUser = new Proxy(
  {},
  {
    set(target, prop, value) {
      if (prop === "age") {
        if (typeof value !== "number" || value < 0) {
          throw new TypeError("Age must be a positive number");
        }
      }
      target[prop] = value;
      return true;
    },
  }
);

validatedUser.name = "David";
validatedUser.age = 30;
console.log("Validated user:", validatedUser);
// validatedUser.age = -5; // Would throw error

// NEW WAY (ES6): Array negative indexing
function createArray(...elements) {
  return new Proxy(elements, {
    get(target, prop) {
      const index = Number(prop);
      if (index < 0) {
        return target[target.length + index];
      }
      return target[prop];
    },
  });
}

const arr = createArray(1, 2, 3, 4, 5);
console.log("Array[-1]:", arr[-1]); // 5
console.log("Array[-2]:", arr[-2]); // 4

// OLD WAY (ES5): Limited to getters/setters (only for defined properties)
var oldObj = {
  _message: "Hello",
  get message() {
    console.log("Getting message (old way)");
    return this._message;
  },
  set message(value) {
    console.log("Setting message (old way)");
    this._message = value;
  },
};

console.log("Old getter:", oldObj.message);
oldObj.message = "Goodbye";

console.log("");

// ============================================
// 18. REFLECT API
// ============================================

console.log("=== 18. Reflect API ===");

/**
 * PROBLEM: ES5 object operations are spread across different methods
 * SOLUTION: ES6 Reflect provides unified API for object operations
 */

// NEW WAY (ES6): Reflect methods
const reflectObj = { x: 1, y: 2 };

console.log("Reflect.has:", Reflect.has(reflectObj, "x"));
console.log("Reflect.get:", Reflect.get(reflectObj, "x"));
Reflect.set(reflectObj, "z", 3);
console.log("After Reflect.set:", reflectObj);

// NEW WAY (ES6): Reflect.deleteProperty
Reflect.deleteProperty(reflectObj, "y");
console.log("After Reflect.deleteProperty:", reflectObj);

// NEW WAY (ES6): Reflect.ownKeys (includes symbols)
const symKey = Symbol("sym");
const objWithSym = { a: 1, [symKey]: 2 };
console.log("Reflect.ownKeys:", Reflect.ownKeys(objWithSym));

// NEW WAY (ES6): Reflect with Proxy
const reflected = new Proxy(
  {},
  {
    get(target, prop, receiver) {
      console.log(`Reflect get: ${prop}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      console.log(`Reflect set: ${prop} = ${value}`);
      return Reflect.set(target, prop, value, receiver);
    },
  }
);

reflected.name = "Reflect Example";
console.log(reflected.name);

// OLD WAY (ES5): Multiple different syntaxes
var oldReflect = { x: 1, y: 2 };

console.log("Old 'in' operator:", "x" in oldReflect);
console.log("Old bracket access:", oldReflect["x"]);
oldReflect["z"] = 3;
console.log("After old set:", oldReflect);

delete oldReflect["y"];
console.log("After old delete:", oldReflect);

console.log("Old Object.keys:", Object.keys(oldReflect));

console.log("");

// ============================================
// 19. BINARY AND OCTAL LITERALS
// ============================================

console.log("=== 19. Binary and Octal Literals ===");

/**
 * PROBLEM: ES5 requires parseInt for binary/octal, octal is confusing
 * SOLUTION: ES6 adds 0b and 0o prefixes for clarity
 */

// NEW WAY (ES6): Binary literals
const binary1 = 0b1010; // 10
const binary2 = 0b11111111; // 255
console.log("Binary 0b1010:", binary1);
console.log("Binary 0b11111111:", binary2);

// NEW WAY (ES6): Octal literals
const octal1 = 0o744; // 484
const octal2 = 0o10; // 8
console.log("Octal 0o744:", octal1);
console.log("Octal 0o10:", octal2);

// NEW WAY (ES6): Mixing number systems
const permissions = {
  read: 0b100, // 4
  write: 0b010, // 2
  execute: 0b001, // 1
};
const fullPermission =
  permissions.read | permissions.write | permissions.execute;
console.log(
  "Full permission:",
  fullPermission,
  "Binary:",
  fullPermission.toString(2)
);

// OLD WAY (ES5): parseInt for binary
var binaryOld1 = parseInt("1010", 2);
var binaryOld2 = parseInt("11111111", 2);
console.log("Old binary:", binaryOld1);
console.log("Old binary:", binaryOld2);

// OLD WAY (ES5): parseInt for octal (or confusing 0 prefix)
var octalOld1 = parseInt("744", 8);
var octalOld2 = 0o10; // This is 8, but confusing!
console.log("Old octal:", octalOld1);
console.log("Old octal 010:", octalOld2);

console.log("");

// ============================================
// 20. ENHANCED ARRAY METHODS
// ============================================

console.log("=== 20. Enhanced Array Methods ===");

/**
 * PROBLEM: ES5 lacks convenient array search and manipulation methods
 * SOLUTION: ES6 adds find, findIndex, fill, copyWithin, and more
 */

// NEW WAY (ES6): Array.find
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const foundUser = users.find((user) => user.id === 2);
console.log("Array.find:", foundUser);

// NEW WAY (ES6): Array.findIndex
const foundIndex = users.findIndex((user) => user.name === "Charlie");
console.log("Array.findIndex:", foundIndex);

// NEW WAY (ES6): Array.fill
const filled = new Array(5).fill(0);
console.log("Array.fill:", filled);

const partial = [1, 2, 3, 4, 5].fill(9, 2, 4);
console.log("Array.fill(9, 2, 4):", partial);

// NEW WAY (ES6): Array.copyWithin
const copyTest = [1, 2, 3, 4, 5].copyWithin(0, 3);
console.log("Array.copyWithin:", copyTest);

// NEW WAY (ES6): Array.from
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const realArray = Array.from(arrayLike);
console.log("Array.from:", realArray);

const rangeArray = Array.from({ length: 5 }, (_, i) => i + 1);
console.log("Array.from range:", rangeArray);

// NEW WAY (ES6): Array.of
const arrOf = Array.of(7); // [7]
const arrOf2 = Array.of(1, 2, 3);
console.log("Array.of(7):", arrOf);
console.log("Array.of(1,2,3):", arrOf2);

// OLD WAY (ES5): Manual find with loop
var usersOld = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
var foundUserOld;
for (var i = 0; i < usersOld.length; i++) {
  if (usersOld[i].id === 2) {
    foundUserOld = usersOld[i];
    break;
  }
}
console.log("Old find:", foundUserOld);

// OLD WAY (ES5): Manual fill
var filledOld = [];
for (var i = 0; i < 5; i++) {
  filledOld.push(0);
}
console.log("Old fill:", filledOld);

// OLD WAY (ES5): Converting array-like to array
var arrayLikeOld = { 0: "a", 1: "b", 2: "c", length: 3 };
var realArrayOld = Array.prototype.slice.call(arrayLikeOld);
console.log("Old array-like:", realArrayOld);

console.log("");

// ============================================
// 21. STRING METHODS
// ============================================

console.log("=== 21. String Methods ===");

/**
 * PROBLEM: ES5 string methods are limited for common operations
 * SOLUTION: ES6 adds startsWith, endsWith, includes, repeat
 */

// NEW WAY (ES6): String.startsWith
const url = "https://example.com";
console.log("startsWith 'https':", url.startsWith("https"));
console.log("startsWith 'example' at 8:", url.startsWith("example", 8));

// NEW WAY (ES6): String.endsWith
const filename = "document.pdf";
console.log("endsWith '.pdf':", filename.endsWith(".pdf"));

// NEW WAY (ES6): String.includes
const message2 = "Hello, World!";
console.log("includes 'World':", message2.includes("World"));
console.log("includes 'world':", message2.includes("world")); // Case sensitive

// NEW WAY (ES6): String.repeat
const repeated = "Ha".repeat(3);
console.log("'Ha'.repeat(3):", repeated);

const line = "-".repeat(20);
console.log("Line:", line);

// NEW WAY (ES6): String.padStart and String.padEnd (ES2017 but related)
// const padded = "5".padStart(3, "0"); // "005"
// const padded2 = "Hi".padEnd(10, "!"); // "Hi!!!!!!!!"

// OLD WAY (ES5): Manual startsWith check
var urlOld = "https://example.com";
console.log("Old startsWith:", urlOld.indexOf("https") === 0);
console.log("Old startsWith at 8:", urlOld.indexOf("example") === 8);

// OLD WAY (ES5): Manual endsWith check
var filenameOld = "document.pdf";
var extension = ".pdf";
console.log(
  "Old endsWith:",
  filenameOld.indexOf(extension) === filenameOld.length - extension.length
);

// OLD WAY (ES5): Manual includes check
var messageOld = "Hello, World!";
console.log("Old includes:", messageOld.indexOf("World") !== -1);

// OLD WAY (ES5): Manual repeat
function repeat(str, count) {
  var result = "";
  for (var i = 0; i < count; i++) {
    result += str;
  }
  return result;
}
console.log("Old repeat:", repeat("Ha", 3));

console.log("");

// ============================================
// 22. NUMBER METHODS AND CONSTANTS
// ============================================

console.log("=== 22. Number Methods ===");

/**
 * PROBLEM: ES5 global functions isNaN/isFinite have quirks
 * SOLUTION: ES6 adds Number methods and useful constants
 */

// NEW WAY (ES6): Number.isNaN (doesn't coerce)
console.log("Number.isNaN(NaN):", Number.isNaN(NaN)); // true
console.log("Number.isNaN('NaN'):", Number.isNaN("NaN")); // false (no coercion!)

// NEW WAY (ES6): Number.isFinite
console.log("Number.isFinite(100):", Number.isFinite(100)); // true
console.log("Number.isFinite(Infinity):", Number.isFinite(Infinity)); // false
console.log("Number.isFinite('100'):", Number.isFinite("100")); // false (no coercion!)

// NEW WAY (ES6): Number.isInteger
console.log("Number.isInteger(10):", Number.isInteger(10)); // true
console.log("Number.isInteger(10.5):", Number.isInteger(10.5)); // false

// NEW WAY (ES6): Number.isSafeInteger
console.log("Number.isSafeInteger(100):", Number.isSafeInteger(100)); // true
console.log(
  "Number.isSafeInteger(9007199254740992):",
  Number.isSafeInteger(9007199254740992)
); // false

// NEW WAY (ES6): Number constants
console.log("Number.EPSILON:", Number.EPSILON);
console.log("Number.MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
console.log("Number.MIN_SAFE_INTEGER:", Number.MIN_SAFE_INTEGER);

// NEW WAY (ES6): Number.parseInt/parseFloat (same as global)
console.log("Number.parseInt('42'):", Number.parseInt("42"));
console.log("Number.parseFloat('3.14'):", Number.parseFloat("3.14"));

// OLD WAY (ES5): Global isNaN (coerces values)
console.log("Old isNaN(NaN):", isNaN(NaN)); // true
console.log("Old isNaN('NaN'):", isNaN("NaN")); // true (coerces!)

// OLD WAY (ES5): Global isFinite (coerces values)
console.log("Old isFinite(100):", isFinite(100)); // true
console.log("Old isFinite('100'):", isFinite("100")); // true (coerces!)

// OLD WAY (ES5): Manual integer check
function isInteger(value) {
  return (
    typeof value === "number" && isFinite(value) && Math.floor(value) === value
  );
}
console.log("Old isInteger(10):", isInteger(10));
console.log("Old isInteger(10.5):", isInteger(10.5));

console.log("");

// ============================================
// 23. OBJECT METHODS
// ============================================

console.log("=== 23. Object Methods ===");

/**
 * PROBLEM: ES5 lacks convenient methods for object manipulation
 * SOLUTION: ES6 adds Object.assign, Object.is, and more
 */

// NEW WAY (ES6): Object.assign (shallow copy/merge)
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign({}, target, source);
console.log("Object.assign:", result);

// NEW WAY (ES6): Object.assign for cloning
const original2 = { name: "test", value: 42 };
const clone = Object.assign({}, original2);
console.log("Cloned object:", clone);

// NEW WAY (ES6): Object.is (better equality check)
console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN)); // true (unlike ===)
console.log("Object.is(+0, -0):", Object.is(+0, -0)); // false (unlike ===)
console.log("Object.is(5, 5):", Object.is(5, 5)); // true

// NEW WAY (ES6): Object.setPrototypeOf
const proto = {
  greet() {
    return "Hello";
  },
};
const obj3 = { name: "test" };
Object.setPrototypeOf(obj3, proto);
console.log("After setPrototypeOf:", obj3.greet());

// NEW WAY (ES6): Object.getOwnPropertySymbols
const symProp = Symbol("test");
const objWithSymProp = { [symProp]: "value", regular: "prop" };
console.log("Symbol properties:", Object.getOwnPropertySymbols(objWithSymProp));

// OLD WAY (ES5): Manual object merging
function extend2(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}

var targetOld = { a: 1, b: 2 };
var sourceOld = { b: 3, c: 4 };
var resultOld = extend2({}, targetOld);
extend2(resultOld, sourceOld);
console.log("Old merge:", resultOld);

// OLD WAY (ES5): Equality checks
console.log("Old NaN === NaN:", NaN === NaN); // false (problematic!)
console.log("Old +0 === -0:", +0 === -0); // true (sometimes unwanted)

// OLD WAY (ES5): Setting prototype
var protoOld = {
  greet: function () {
    return "Hello";
  },
};
var objOld2 = { name: "test" };
objOld2.__proto__ = protoOld; // Non-standard but widely supported
console.log("Old setPrototype:", objOld2.greet());

console.log("");

// ============================================
// 24. TAIL CALL OPTIMIZATION
// ============================================

console.log("=== 24. Tail Call Optimization (TCO) ===");

/**
 * PROBLEM: ES5 recursive functions can cause stack overflow
 * SOLUTION: ES6 spec includes tail call optimization (limited support)
 */

// NEW WAY (ES6): Tail-recursive function (optimizable)
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc); // Tail call
}

console.log("Factorial(5):", factorial(5));

// NEW WAY (ES6): Tail-recursive sum
function sum2(n, acc = 0) {
  if (n === 0) return acc;
  return sum2(n - 1, acc + n); // Tail call
}

console.log("Sum(100):", sum2(100));

// Note: TCO support is limited in practice
console.log("Note: TCO support varies by JavaScript engine");

// OLD WAY (ES5): Non-tail-recursive (stack grows)
function factorialOld(n) {
  if (n <= 1) return 1;
  return n * factorialOld(n - 1); // Not tail call
}

console.log("Old factorial(5):", factorialOld(5));

// OLD WAY (ES5): Iterative approach to avoid stack issues
function factorialIterative(n) {
  var result = 1;
  for (var i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log("Iterative factorial(5):", factorialIterative(5));

console.log("");

// ============================================
// 25. UNICODE IMPROVEMENTS
// ============================================

console.log("=== 25. Unicode Improvements ===");

/**
 * PROBLEM: ES5 has limited Unicode support, issues with surrogate pairs
 * SOLUTION: ES6 improves Unicode handling and adds code point methods
 */

// NEW WAY (ES6): Unicode code point escapes
const emoji = "\u{1F600}"; // 😀
console.log("Unicode emoji:", emoji);

// NEW WAY (ES6): String.fromCodePoint
const smiley = String.fromCodePoint(0x1f600);
console.log("fromCodePoint:", smiley);

// NEW WAY (ES6): String.codePointAt
const str3 = "😀A";
console.log("codePointAt(0):", str3.codePointAt(0));
console.log("codePointAt(2):", str3.codePointAt(2));

// NEW WAY (ES6): Unicode flag in regex
const regex = /\u{1F600}/u;
console.log("Unicode regex test:", regex.test("😀"));

// NEW WAY (ES6): Proper length with spread
const emojiStr = "😀😃😄";
console.log("String length:", emojiStr.length); // 6 (wrong!)
console.log("Spread length:", [...emojiStr].length); // 3 (correct!)

// OLD WAY (ES5): Limited Unicode (only BMP)
var heart = "\u2665"; // ♥ (only works for BMP characters)
console.log("Old Unicode:", heart);

// OLD WAY (ES5): String.fromCharCode (limited)
var smileyOld = String.fromCharCode(0xd83d, 0xde00); // Surrogate pair
console.log("Old fromCharCode:", smileyOld);

// OLD WAY (ES5): String.charCodeAt (issues with surrogate pairs)
var strOld = "😀A";
console.log("Old charCodeAt(0):", strOld.charCodeAt(0)); // Only first half

console.log("");

// ============================================
// 26. PROPER TAIL CALLS AND STRICT MODE
// ============================================

console.log("=== 26. Strict Mode Enhancements ===");

/**
 * ES6 modules are automatically in strict mode
 * ES6 adds restrictions in strict mode for better code quality
 */

// NEW WAY (ES6): Modules are automatically strict
// In a module, "use strict" is implied

// NEW WAY (ES6): Block-scoped function declarations in strict mode
console.log("In strict mode, function declarations are block-scoped");

if (true) {
  function blockFunc() {
    return "I'm block-scoped in strict mode";
  }
  console.log(blockFunc());
}
// In strict mode: blockFunc is not accessible here (block-scoped)

// OLD WAY (ES5): Must explicitly use strict mode
(function () {
  "use strict";
  // Strict mode code here
  var test = "Strict mode";
  console.log("Old strict mode:", test);
})();

console.log("");

// ============================================
// 27. ENHANCED REGEX
// ============================================

console.log("=== 27. Enhanced Regular Expressions ===");

/**
 * PROBLEM: ES5 regex has limitations with flags and Unicode
 * SOLUTION: ES6 adds new flags and improvements
 */

// NEW WAY (ES6): Sticky flag (y)
const pattern = /\d+/y;
const text2 = "123 456 789";
pattern.lastIndex = 0;
console.log("Sticky match 1:", pattern.exec(text2)); // ["123"]
console.log("Sticky match 2:", pattern.exec(text2)); // null (not at position 3)

// NEW WAY (ES6): Unicode flag (u)
const unicodePattern = /^\u{1F600}$/u;
console.log("Unicode pattern:", unicodePattern.test("😀"));

// NEW WAY (ES6): Flags property
const regex2 = /test/gi;
console.log("Regex flags:", regex2.flags); // "gi"

// OLD WAY (ES5): Limited flags (g, i, m)
var patternOld = /\d+/g;
var textOld = "123 456 789";
console.log("Old regex:", patternOld.exec(textOld));

console.log("");

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES6 SUMMARY ===");
console.log("ES6 (2015) was a MAJOR JavaScript update featuring:");
console.log("✓ let/const for block-scoped variables");
console.log("✓ Arrow functions with lexical 'this'");
console.log("✓ Classes for OOP");
console.log("✓ Template literals");
console.log("✓ Destructuring assignment");
console.log("✓ Default, rest, and spread operators");
console.log("✓ Promises for async operations");
console.log("✓ Modules (import/export)");
console.log("✓ Iterators, generators, for...of");
console.log("✓ Map, Set, WeakMap, WeakSet");
console.log("✓ Symbols");
console.log("✓ Proxy and Reflect");
console.log("✓ Binary and octal literals");
console.log("✓ Enhanced array, string, number, object methods");
console.log("✓ Unicode improvements");
console.log("✓ Tail call optimization (in spec)");
console.log("✓ Enhanced regular expressions");

console.log("\n=== Practical Impact ===");
console.log("For developers, ES6 meant:");
console.log("1. More expressive and readable code");
console.log("2. Better async programming with Promises");
console.log("3. Modern OOP with classes");
console.log("4. Improved scoping with let/const");
console.log("5. Native module system");
console.log("6. Powerful new data structures");
console.log("7. Better functional programming support");
console.log("8. Foundation for modern JavaScript development");

console.log("\n=== Browser Support Note ===");
console.log("ES6 features were gradually adopted:");
console.log("- Modern browsers: Full support");
console.log("- Older browsers: Requires transpilation (Babel)");
console.log("- Node.js: Good support from v6+");
console.log("- Use feature detection or transpilers for compatibility");

console.log("\n=== ES6 Features Complete ===");
