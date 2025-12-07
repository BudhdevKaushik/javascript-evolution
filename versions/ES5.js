/**
 * ECMAScript 5 (ES5) - 2009
 *
 * ES5 was a major update to JavaScript that introduced many important features
 * including strict mode, JSON support, new array methods, property descriptors,
 * and Object methods. It significantly improved the language's capabilities
 * for professional development.
 *
 * Key Features:
 * - Strict Mode
 * - JSON support (JSON.parse, JSON.stringify)
 * - New Array methods (forEach, map, filter, reduce, etc.)
 * - Object methods (Object.create, Object.keys, Object.defineProperty, etc.)
 * - Property getters and setters
 * - Function.prototype.bind
 * - String.prototype.trim
 * - Array.isArray
 * - Property descriptors and attributes
 */

console.log("=== ECMAScript 5 (ES5) - 2009 ===");
console.log("ES5 introduced many powerful features for modern JavaScript\n");

// ============================================
// 1. STRICT MODE
// ============================================

console.log("=== 1. Strict Mode ===");

/**
 * NEW IN ES5: Strict mode
 *
 * Strict mode makes JavaScript more secure and prevents common mistakes.
 * It can be applied to entire scripts or individual functions.
 */

// Strict mode for entire script (would be at the top of file)
// "use strict";

// Strict mode for individual function
function strictFunction() {
  "use strict";

  // This would throw an error in strict mode:
  // undeclaredVar = 10; // ReferenceError: undeclaredVar is not defined

  var declaredVar = 10;
  console.log("In strict mode, must declare variables:", declaredVar);
}

strictFunction();

// Strict mode prevents accidental globals
function nonStrictExample() {
  var safeVar = "I'm declared";
  console.log("Non-strict mode allows more flexibility:", safeVar);
}

nonStrictExample();

console.log("\nStrict mode benefits:");
console.log("- Prevents accidental global variables");
console.log("- Throws errors for unsafe actions");
console.log("- Disables confusing features");
console.log("- Makes code more optimizable");

// ============================================
// 2. JSON SUPPORT
// ============================================

console.log("\n=== 2. JSON Support ===");

/**
 * NEW IN ES5: JSON.parse() and JSON.stringify()
 *
 * Native JSON support for parsing and serializing data.
 */

// JSON.stringify - Convert objects to JSON strings
var person = {
  name: "Alice",
  age: 30,
  city: "New York",
  hobbies: ["reading", "coding", "hiking"],
};

var jsonString = JSON.stringify(person);
console.log("JSON.stringify:", jsonString);

// Pretty printing with indentation
var prettyJson = JSON.stringify(person, null, 2);
console.log("\nPretty JSON:\n" + prettyJson);

// JSON.stringify with replacer function
var filteredJson = JSON.stringify(person, function (key, value) {
  // Filter out the age property
  if (key === "age") return undefined;
  return value;
});
console.log("\nFiltered JSON:", filteredJson);

// JSON.parse - Parse JSON strings to objects
var parsedPerson = JSON.parse(jsonString);
console.log("\nJSON.parse result:", parsedPerson);
console.log("Parsed name:", parsedPerson.name);

// JSON.parse with reviver function
var jsonWithDate = '{"name":"Bob","birthDate":"2000-01-01"}';
var personWithDate = JSON.parse(jsonWithDate, function (key, value) {
  if (key === "birthDate") {
    return new Date(value);
  }
  return value;
});
console.log("\nParsed with reviver:", personWithDate);

// ============================================
// 3. ARRAY METHODS - ITERATION
// ============================================

console.log("\n=== 3. Array Iteration Methods ===");

var numbers = [1, 2, 3, 4, 5];
var fruits = ["apple", "banana", "orange", "grape"];

/**
 * NEW IN ES5: Array.prototype.forEach()
 *
 * Executes a function for each array element.
 */

console.log("\nforEach:");
numbers.forEach(function (num, index) {
  console.log("Index " + index + ": " + num);
});

/**
 * NEW IN ES5: Array.prototype.map()
 *
 * Creates a new array with the results of calling a function on every element.
 */

console.log("\nmap:");
var doubled = numbers.map(function (num) {
  return num * 2;
});
console.log("Original:", numbers);
console.log("Doubled:", doubled);

var upperFruits = fruits.map(function (fruit) {
  return fruit.toUpperCase();
});
console.log("Uppercase fruits:", upperFruits);

/**
 * NEW IN ES5: Array.prototype.filter()
 *
 * Creates a new array with elements that pass a test.
 */

console.log("\nfilter:");
var evenNumbers = numbers.filter(function (num) {
  return num % 2 === 0;
});
console.log("Even numbers:", evenNumbers);

var longFruits = fruits.filter(function (fruit) {
  return fruit.length > 5;
});
console.log("Fruits with > 5 letters:", longFruits);

/**
 * NEW IN ES5: Array.prototype.reduce()
 *
 * Reduces array to a single value by executing a reducer function.
 */

console.log("\nreduce:");
var sum = numbers.reduce(function (accumulator, current) {
  return accumulator + current;
}, 0);
console.log("Sum of numbers:", sum);

var product = numbers.reduce(function (acc, curr) {
  return acc * curr;
}, 1);
console.log("Product of numbers:", product);

// More complex reduce example
var items = [
  { name: "apple", price: 2 },
  { name: "banana", price: 1 },
  { name: "orange", price: 3 },
];

var totalPrice = items.reduce(function (total, item) {
  return total + item.price;
}, 0);
console.log("Total price:", totalPrice);

/**
 * NEW IN ES5: Array.prototype.reduceRight()
 *
 * Same as reduce but processes array from right to left.
 */

console.log("\nreduceRight:");
var letters = ["H", "e", "l", "l", "o"];
var reversed = letters.reduceRight(function (acc, letter) {
  return acc + letter;
}, "");
console.log("Reversed string:", reversed);

// ============================================
// 4. ARRAY METHODS - SEARCHING
// ============================================

console.log("\n=== 4. Array Search Methods ===");

/**
 * NEW IN ES5: Array.prototype.indexOf()
 *
 * Returns the first index at which an element is found.
 */

console.log("\nindexOf:");
console.log("Index of 3:", numbers.indexOf(3));
console.log("Index of 'banana':", fruits.indexOf("banana"));
console.log("Index of non-existent:", numbers.indexOf(10)); // -1

// With starting position
console.log(
  "Index of 2 starting from position 2:",
  [1, 2, 3, 2, 4].indexOf(2, 2)
);

/**
 * NEW IN ES5: Array.prototype.lastIndexOf()
 *
 * Returns the last index at which an element is found.
 */

console.log("\nlastIndexOf:");
var repeated = [1, 2, 3, 2, 4, 2];
console.log("Last index of 2:", repeated.lastIndexOf(2));
console.log("Array:", repeated);

/**
 * NEW IN ES5: Array.prototype.every()
 *
 * Tests whether all elements pass a test.
 */

console.log("\nevery:");
var allPositive = numbers.every(function (num) {
  return num > 0;
});
console.log("All numbers positive?", allPositive);

var allEven = numbers.every(function (num) {
  return num % 2 === 0;
});
console.log("All numbers even?", allEven);

/**
 * NEW IN ES5: Array.prototype.some()
 *
 * Tests whether at least one element passes a test.
 */

console.log("\nsome:");
var hasEven = numbers.some(function (num) {
  return num % 2 === 0;
});
console.log("Has even numbers?", hasEven);

var hasNegative = numbers.some(function (num) {
  return num < 0;
});
console.log("Has negative numbers?", hasNegative);

// ============================================
// 5. ARRAY.ISARRAY()
// ============================================

console.log("\n=== 5. Array.isArray() ===");

/**
 * NEW IN ES5: Array.isArray()
 *
 * Determines whether a value is an array.
 */

console.log("Array.isArray([1, 2, 3]):", Array.isArray([1, 2, 3]));
console.log("Array.isArray('array'):", Array.isArray("array"));
console.log("Array.isArray({}):", Array.isArray({}));
console.log("Array.isArray(null):", Array.isArray(null));

// This is better than instanceof Array
var arr = [1, 2, 3];
console.log("\nReliable array check:", Array.isArray(arr));

// ============================================
// 6. STRING METHODS
// ============================================

console.log("\n=== 6. String Methods ===");

/**
 * NEW IN ES5: String.prototype.trim()
 *
 * Removes whitespace from both ends of a string.
 */

console.log("\ntrim:");
var paddedString = "   Hello World   ";
console.log("Original: '" + paddedString + "'");
console.log("Trimmed: '" + paddedString.trim() + "'");

var tabString = "\t\tSpaces\t\t";
console.log("With tabs: '" + tabString + "'");
console.log("Trimmed: '" + tabString.trim() + "'");

// ============================================
// 7. OBJECT.CREATE()
// ============================================

console.log("\n=== 7. Object.create() ===");

/**
 * NEW IN ES5: Object.create()
 *
 * Creates a new object with specified prototype.
 */

// Create object with null prototype (no inherited properties)
var pureObject = Object.create(null);
pureObject.name = "Pure";
console.log("Pure object:", pureObject);
console.log("Has toString?", pureObject.toString); // undefined

// Create object inheriting from another object
var animal = {
  type: "Animal",
  speak: function () {
    return this.name + " makes a sound";
  },
};

var dog = Object.create(animal);
dog.name = "Buddy";
dog.breed = "Golden Retriever";

console.log("\nDog object:", dog);
console.log("Dog speaks:", dog.speak());
console.log("Dog type:", dog.type); // Inherited from animal

// Create with property descriptors
var person2 = Object.create(Object.prototype, {
  name: {
    value: "John",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  age: {
    value: 30,
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

console.log("\nPerson with descriptors:", person2);

// ============================================
// 8. OBJECT.KEYS()
// ============================================

console.log("\n=== 8. Object.keys() ===");

/**
 * NEW IN ES5: Object.keys()
 *
 * Returns an array of object's own enumerable property names.
 */

var car = {
  brand: "Toyota",
  model: "Camry",
  year: 2020,
  color: "blue",
};

var keys = Object.keys(car);
console.log("Object keys:", keys);

// Using with forEach
console.log("\nIterating over keys:");
Object.keys(car).forEach(function (key) {
  console.log(key + ": " + car[key]);
});

// Count properties
console.log("\nNumber of properties:", Object.keys(car).length);

// ============================================
// 9. OBJECT.DEFINEPROPERTY()
// ============================================

console.log("\n=== 9. Object.defineProperty() ===");

/**
 * NEW IN ES5: Object.defineProperty()
 *
 * Defines a new property or modifies an existing property with specific attributes.
 */

var product = {};

// Define a simple property
Object.defineProperty(product, "name", {
  value: "Laptop",
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log("Product name:", product.name);

// Define a read-only property
Object.defineProperty(product, "id", {
  value: 12345,
  writable: false, // Cannot be changed
  enumerable: true,
  configurable: false,
});

console.log("Product ID:", product.id);
// product.id = 99999; // Silently fails in non-strict mode

// Define a non-enumerable property
Object.defineProperty(product, "internalCode", {
  value: "XYZ-123",
  writable: true,
  enumerable: false, // Won't show in for...in or Object.keys()
  configurable: true,
});

console.log("\nEnumerable keys:", Object.keys(product));
console.log("But internalCode exists:", product.internalCode);

// ============================================
// 10. OBJECT.DEFINEPROPERTIES()
// ============================================

console.log("\n=== 10. Object.defineProperties() ===");

/**
 * NEW IN ES5: Object.defineProperties()
 *
 * Defines multiple properties at once.
 */

var book = {};

Object.defineProperties(book, {
  title: {
    value: "JavaScript Guide",
    writable: true,
    enumerable: true,
  },
  author: {
    value: "John Doe",
    writable: true,
    enumerable: true,
  },
  isbn: {
    value: "123-456-789",
    writable: false,
    enumerable: true,
  },
  pages: {
    value: 350,
    writable: true,
    enumerable: true,
  },
});

console.log("Book:", book);
console.log("Book keys:", Object.keys(book));

// ============================================
// 11. PROPERTY GETTERS AND SETTERS
// ============================================

console.log("\n=== 11. Property Getters and Setters ===");

/**
 * NEW IN ES5: Getter and setter functions
 *
 * Define computed properties with get and set accessors.
 */

var circle = {
  _radius: 5, // Private by convention

  get radius() {
    console.log("Getting radius");
    return this._radius;
  },

  set radius(value) {
    console.log("Setting radius to", value);
    if (value > 0) {
      this._radius = value;
    } else {
      console.log("Radius must be positive");
    }
  },

  get area() {
    return Math.PI * this._radius * this._radius;
  },

  get circumference() {
    return 2 * Math.PI * this._radius;
  },
};

console.log("\nInitial radius:", circle.radius);
console.log("Area:", circle.area);
console.log("Circumference:", circle.circumference);

circle.radius = 10;
console.log("New area:", circle.area);

circle.radius = -5; // Won't set negative value

// Defining getter/setter with Object.defineProperty
var temperature = {};

Object.defineProperty(temperature, "celsius", {
  get: function () {
    return this._celsius || 0;
  },
  set: function (value) {
    this._celsius = value;
    this._fahrenheit = (value * 9) / 5 + 32;
  },
  enumerable: true,
});

Object.defineProperty(temperature, "fahrenheit", {
  get: function () {
    return this._fahrenheit || 32;
  },
  set: function (value) {
    this._fahrenheit = value;
    this._celsius = ((value - 32) * 5) / 9;
  },
  enumerable: true,
});

console.log("\nTemperature conversion:");
temperature.celsius = 25;
console.log("25°C =", temperature.fahrenheit + "°F");

temperature.fahrenheit = 100;
console.log("100°F =", temperature.celsius + "°C");

// ============================================
// 12. OBJECT.GETOWNPROPERTYDESCRIPTOR()
// ============================================

console.log("\n=== 12. Object.getOwnPropertyDescriptor() ===");

/**
 * NEW IN ES5: Object.getOwnPropertyDescriptor()
 *
 * Returns property descriptor for own property.
 */

var sample = {
  name: "Sample",
};

Object.defineProperty(sample, "id", {
  value: 100,
  writable: false,
  enumerable: true,
  configurable: false,
});

var nameDescriptor = Object.getOwnPropertyDescriptor(sample, "name");
console.log("Name descriptor:", nameDescriptor);

var idDescriptor = Object.getOwnPropertyDescriptor(sample, "id");
console.log("ID descriptor:", idDescriptor);

// ============================================
// 13. OBJECT.GETOWNPROPERTYNAMES()
// ============================================

console.log("\n=== 13. Object.getOwnPropertyNames() ===");

/**
 * NEW IN ES5: Object.getOwnPropertyNames()
 *
 * Returns all own properties (including non-enumerable).
 */

var obj = {
  visible1: "I'm enumerable",
  visible2: "Me too",
};

Object.defineProperty(obj, "hidden", {
  value: "I'm not enumerable",
  enumerable: false,
});

console.log("Object.keys():", Object.keys(obj));
console.log("Object.getOwnPropertyNames():", Object.getOwnPropertyNames(obj));

// ============================================
// 14. OBJECT.PREVENTEXTENSIONS()
// ============================================

console.log("\n=== 14. Object.preventExtensions() ===");

/**
 * NEW IN ES5: Object.preventExtensions()
 *
 * Prevents new properties from being added to an object.
 */

var user = {
  name: "Alice",
  age: 25,
};

console.log("Can extend?", Object.isExtensible(user));

Object.preventExtensions(user);
console.log("After preventExtensions, can extend?", Object.isExtensible(user));

user.city = "New York"; // Silently fails
console.log("Tried to add city:", user.city); // undefined

user.name = "Bob"; // Can still modify existing properties
console.log("Modified name:", user.name);

// ============================================
// 15. OBJECT.SEAL()
// ============================================

console.log("\n=== 15. Object.seal() ===");

/**
 * NEW IN ES5: Object.seal()
 *
 * Prevents adding/removing properties, but allows modifying existing ones.
 */

var account = {
  username: "john_doe",
  balance: 1000,
};

console.log("Is sealed?", Object.isSealed(account));

Object.seal(account);
console.log("After seal, is sealed?", Object.isSealed(account));

account.email = "john@example.com"; // Cannot add
console.log("Tried to add email:", account.email); // undefined

account.balance = 1500; // Can modify
console.log("Modified balance:", account.balance);

// ============================================
// 16. OBJECT.FREEZE()
// ============================================

console.log("\n=== 16. Object.freeze() ===");

/**
 * NEW IN ES5: Object.freeze()
 *
 * Makes object completely immutable - cannot add, remove, or modify properties.
 */

var config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

console.log("Is frozen?", Object.isFrozen(config));

Object.freeze(config);
console.log("After freeze, is frozen?", Object.isFrozen(config));

config.apiUrl = "https://newapi.com"; // Cannot modify
console.log("Tried to modify apiUrl:", config.apiUrl); // Original value

config.retries = 3; // Cannot add
console.log("Tried to add retries:", config.retries); // undefined

// Note: Freeze is shallow
var settings = {
  theme: "dark",
  preferences: {
    notifications: true,
  },
};

Object.freeze(settings);
settings.theme = "light"; // Cannot modify
settings.preferences.notifications = false; // CAN modify nested object!
console.log(
  "\nShallow freeze - nested object modified:",
  settings.preferences.notifications
);

// ============================================
// 17. FUNCTION.PROTOTYPE.BIND()
// ============================================

console.log("\n=== 17. Function.prototype.bind() ===");

/**
 * NEW IN ES5: Function.prototype.bind()
 *
 * Creates a new function with a fixed 'this' value.
 */

var module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

console.log("Direct call:", module.getX());

var unboundGetX = module.getX;
console.log("Unbound call:", unboundGetX()); // undefined (this is not module)

// Bind to fix 'this'
var boundGetX = unboundGetX.bind(module);
console.log("Bound call:", boundGetX());

// Bind with arguments
function multiply(a, b) {
  return a * b;
}

var double = multiply.bind(null, 2);
console.log("\nDouble 5:", double(5)); // 2 * 5 = 10
console.log("Double 10:", double(10)); // 2 * 10 = 20

// Practical example: event handlers
var button = {
  label: "Click me",
  click: function () {
    console.log("Button '" + this.label + "' clicked");
  },
};

// Without bind, 'this' would be wrong
var clickHandler = button.click.bind(button);
setTimeout(clickHandler, 100);

// ============================================
// 18. DATE.NOW()
// ============================================

console.log("\n=== 18. Date.now() ===");

/**
 * NEW IN ES5: Date.now()
 *
 * Returns current timestamp in milliseconds.
 */

var timestamp = Date.now();
console.log("Current timestamp:", timestamp);

// Measure execution time
var start = Date.now();
var sum2 = 0;
for (var i = 0; i < 1000000; i++) {
  sum2 += i;
}
var end = Date.now();
console.log("Execution time:", end - start + "ms");

// ============================================
// 19. DATE.PROTOTYPE.TOISOSTRING()
// ============================================

console.log("\n=== 19. Date.prototype.toISOString() ===");

/**
 * NEW IN ES5: Date.prototype.toISOString()
 *
 * Returns date in ISO 8601 format.
 */

var now = new Date();
console.log("ISO string:", now.toISOString());

var specificDate = new Date(2024, 0, 15, 14, 30, 0);
console.log("Specific date ISO:", specificDate.toISOString());

// ============================================
// 20. DATE.PROTOTYPE.TOJSON()
// ============================================

console.log("\n=== 20. Date.prototype.toJSON() ===");

/**
 * NEW IN ES5: Date.prototype.toJSON()
 *
 * Returns JSON representation of date (ISO string).
 */

var event = {
  name: "Conference",
  date: new Date(2024, 5, 15),
};

var eventJson = JSON.stringify(event);
console.log("Event JSON:", eventJson);

// ============================================
// 21. PROPERTY ATTRIBUTES
// ============================================

console.log("\n=== 21. Property Attributes ===");

/**
 * NEW IN ES5: Property attributes (writable, enumerable, configurable)
 *
 * Control property behavior with fine-grained attributes.
 */

var demo = {};

// Writable: Can the value be changed?
Object.defineProperty(demo, "readOnly", {
  value: "Cannot change me",
  writable: false,
});

console.log("Read-only:", demo.readOnly);
demo.readOnly = "Try to change";
console.log("After assignment:", demo.readOnly); // Still original value

// Enumerable: Does it show up in loops?
Object.defineProperty(demo, "secret", {
  value: "Hidden property",
  enumerable: false,
});

Object.defineProperty(demo, "visible", {
  value: "Visible property",
  enumerable: true,
});

console.log("\nKeys of demo:", Object.keys(demo));
console.log("Secret still accessible:", demo.secret);

// Configurable: Can property be deleted or reconfigured?
Object.defineProperty(demo, "permanent", {
  value: "Cannot delete me",
  configurable: false,
});

delete demo.permanent;
console.log("\nAfter delete attempt:", demo.permanent); // Still there

// ============================================
// 22. RESERVED WORDS AS PROPERTY NAMES
// ============================================

console.log("\n=== 22. Reserved Words as Properties ===");

/**
 * NEW IN ES5: Can use reserved words as property names
 *
 * ES5 allows reserved words as object property names.
 */

var obj2 = {
  class: "MyClass",
  function: "MyFunction",
  var: "MyVar",
  if: "conditional",
  for: "loop",
};

console.log("Reserved word properties:", obj2);
console.log("Access 'class':", obj2.class);
console.log("Access 'function':", obj2["function"]);

// ============================================
// 23. TRAILING COMMAS IN LITERALS
// ============================================

console.log("\n=== 23. Trailing Commas ===");

/**
 * NEW IN ES5: Trailing commas allowed in object and array literals
 *
 * Makes adding properties easier and cleaner diffs in version control.
 */

var arrayWithTrailing = [
  1,
  2,
  3, // Trailing comma is OK
];

var objectWithTrailing = {
  a: 1,
  b: 2,
  c: 3, // Trailing comma is OK
};

console.log("Array:", arrayWithTrailing);
console.log("Object:", objectWithTrailing);

// ============================================
// 24. ACCESSOR PROPERTIES
// ============================================

console.log("\n=== 24. Accessor Properties ===");

/**
 * NEW IN ES5: Accessor properties (get/set in object literals)
 *
 * Define getters and setters directly in object literals.
 */

var rectangle = {
  width: 10,
  height: 5,

  get area() {
    return this.width * this.height;
  },

  get perimeter() {
    return 2 * (this.width + this.height);
  },

  set dimensions(value) {
    var dims = value.split("x");
    this.width = parseInt(dims[0]);
    this.height = parseInt(dims[1]);
  },
};

console.log("Rectangle area:", rectangle.area);
console.log("Rectangle perimeter:", rectangle.perimeter);

rectangle.dimensions = "20x10";
console.log("After setting dimensions:");
console.log("New area:", rectangle.area);
console.log("New perimeter:", rectangle.perimeter);

// ============================================
// 25. UNDEFINED IN ARRAY HOLES
// ============================================

console.log("\n=== 25. Array Holes Behavior ===");

/**
 * ES5 clarified behavior of array holes (sparse arrays)
 */

var sparse2 = [1, , 3, , 5]; // Array with holes
console.log("Sparse array:", sparse2);
console.log("Length:", sparse2.length);

// forEach skips holes
console.log("\nforEach on sparse array:");
sparse2.forEach(function (val, idx) {
  console.log("Index", idx + ":", val);
});

// map also skips holes
var mapped = sparse2.map(function (val) {
  return val * 2;
});
console.log("Mapped sparse:", mapped);

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES5 SUMMARY ===");
console.log("ES5 (2009) introduced major improvements:");
console.log("\n1. Strict Mode - safer JavaScript");
console.log("2. JSON support - native JSON.parse/stringify");
console.log("3. Array methods - forEach, map, filter, reduce, etc.");
console.log("4. Object methods - create, keys, defineProperty, etc.");
console.log("5. Property descriptors - fine-grained control");
console.log("6. Getters and setters - computed properties");
console.log("7. Function.bind - control 'this' binding");
console.log("8. String.trim - whitespace removal");
console.log("9. Array.isArray - reliable array detection");
console.log("10. Object protection - freeze, seal, preventExtensions");

console.log("\n=== Practical Impact ===");
console.log("ES5 enabled:");
console.log("- More functional programming patterns");
console.log("- Better object-oriented programming");
console.log("- Safer code with strict mode");
console.log("- Native JSON handling");
console.log("- Cleaner array manipulation");
console.log("- Better property control");
console.log("- More maintainable code");

console.log("\n=== ES5 Features Complete ===");
