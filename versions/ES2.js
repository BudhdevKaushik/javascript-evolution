/**
 * ECMAScript 2 (ES2) - 1998
 *
 * ES2 was primarily an editorial release that aligned the ECMAScript specification
 * with the ISO/IEC 16262 international standard. It did not introduce significant
 * new features but made clarifications and corrections to the specification.
 *
 * Key Changes:
 * - Editorial corrections and clarifications
 * - Alignment with ISO/IEC 16262 standard
 * - Minor specification bug fixes
 * - Improved specification text for clarity
 */

console.log("=== ECMAScript 2 (ES2) - 1998 ===");
console.log("ES2 was mainly an editorial release with no major new features\n");

// ============================================
// 1. EDITORIAL CHANGES - SPECIFICATION CLARIFICATIONS
// ============================================

console.log("=== 1. Specification Clarifications ===");

/**
 * PROBLEM: ES1 had ambiguous specifications in some areas
 * SOLUTION: ES2 clarified the specification text without changing behavior
 *
 * These were documentation improvements, not functional changes.
 * The JavaScript language itself remained the same.
 */

console.log("No code changes - only specification text improvements");
console.log("Developers could continue writing code exactly as in ES1\n");

// ============================================
// 2. CONSISTENCY IN BEHAVIOR
// ============================================

console.log("=== 2. Consistency Improvements ===");

/**
 * ES2 ensured consistent behavior across implementations
 * by clarifying edge cases and ambiguous scenarios
 */

// Example: toString() behavior was clarified
var obj = { name: "test" };
console.log("Object toString():", obj.toString());

// Example: Type conversion rules were clarified
var num = 123;
var str = String(num);
console.log("Number to String:", str, "Type:", typeof str);

// Example: Comparison operations clarified
console.log("null == undefined:", null == undefined); // true (clarified)
console.log("null === undefined:", null === undefined); // false (clarified)

// ============================================
// 3. ERROR HANDLING CLARIFICATIONS
// ============================================

console.log("\n=== 3. Error Handling ===");

/**
 * OLD WAY (ES1): Some error conditions were not clearly specified
 * NEW WAY (ES2): Clarified when and how errors should be thrown
 */

// Example: Division by zero behavior (already worked in ES1, but clarified in ES2)
console.log("Division by zero:", 10 / 0); // Infinity (clarified)
console.log("Negative division by zero:", -10 / 0); // -Infinity (clarified)
console.log("Zero divided by zero:", 0 / 0); // NaN (clarified)

// Example: Invalid number operations
console.log("Math.sqrt(-1):", Math.sqrt(-1)); // NaN (clarified)

// ============================================
// 4. FUNCTION BEHAVIOR CLARIFICATIONS
// ============================================

console.log("\n=== 4. Function Behavior ===");

/**
 * ES2 clarified function parameter handling and scope rules
 */

// Function with fewer arguments than parameters
function greet(firstName, lastName) {
  console.log("First:", firstName);
  console.log("Last:", lastName); // undefined if not provided
  return firstName + " " + (lastName || "");
}

console.log("Function call with missing params:");
greet("John"); // lastName will be undefined (behavior clarified)

// Function with more arguments than parameters
function add(a, b) {
  // arguments object exists (clarified in specification)
  console.log("Arguments length:", arguments.length);
  return a + b;
}

console.log("\nFunction with extra arguments:");
var sum = add(5, 10, 20, 30); // Extra arguments ignored but accessible via arguments
console.log("Sum:", sum);

// ============================================
// 5. OBJECT PROPERTY ACCESS CLARIFICATIONS
// ============================================

console.log("\n=== 5. Object Property Access ===");

/**
 * ES2 clarified property access behavior and property descriptor rules
 */

var person = {
  name: "Alice",
  age: 25,
};

// Dot notation vs bracket notation (clarified)
console.log("Dot notation:", person.name);
console.log("Bracket notation:", person["name"]);

// Accessing non-existent properties (clarified to return undefined)
console.log("Non-existent property:", person.salary); // undefined

// Setting properties
person.city = "New York";
console.log("After adding property:", person);

// ============================================
// 6. ARRAY BEHAVIOR CLARIFICATIONS
// ============================================

console.log("\n=== 6. Array Behavior ===");

/**
 * ES2 clarified array length property behavior and sparse arrays
 */

var arr = [1, 2, 3];
console.log("Initial array:", arr);
console.log("Length:", arr.length);

// Setting length property (behavior clarified)
arr.length = 5;
console.log("After setting length to 5:", arr);
console.log("arr[4]:", arr[4]); // undefined (clarified)

// Sparse arrays (behavior clarified)
var sparse = [];
sparse[0] = "first";
sparse[5] = "sixth";
console.log("Sparse array:", sparse);
console.log("Sparse length:", sparse.length); // 6 (clarified)

// ============================================
// 7. STRING OPERATIONS CLARIFICATIONS
// ============================================

console.log("\n=== 7. String Operations ===");

/**
 * ES2 clarified string comparison and concatenation behavior
 */

var str1 = "Hello";
var str2 = "World";

// String concatenation (behavior clarified)
var combined = str1 + " " + str2;
console.log("Concatenation:", combined);

// String comparison (lexicographic order clarified)
console.log("'a' < 'b':", "a" < "b"); // true
console.log("'apple' < 'banana':", "apple" < "banana"); // true

// Empty string behavior (clarified)
var empty = "";
console.log("Empty string length:", empty.length); // 0
console.log("Empty string == false:", empty == false); // true (clarified)

// ============================================
// 8. NUMBER OPERATIONS CLARIFICATIONS
// ============================================

console.log("\n=== 8. Number Operations ===");

/**
 * ES2 clarified special number values and their behavior
 */

// Special number values (behavior clarified)
console.log("Infinity:", Infinity);
console.log("Infinity + 1:", Infinity + 1); // Infinity
console.log("Infinity - Infinity:", Infinity - Infinity); // NaN

console.log("\nNaN behavior:");
console.log("NaN === NaN:", NaN === NaN); // false (clarified)
console.log("isNaN(NaN):", isNaN(NaN)); // true

// Number precision (behavior clarified)
console.log("\nNumber precision:");
console.log("0.1 + 0.2:", 0.1 + 0.2); // 0.30000000000000004 (clarified)
console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3); // false (clarified)

// ============================================
// 9. BOOLEAN CONTEXT CLARIFICATIONS
// ============================================

console.log("\n=== 9. Boolean Context ===");

/**
 * ES2 clarified truthy and falsy value behavior
 */

// Falsy values (behavior clarified)
console.log("Falsy values in boolean context:");
console.log("Boolean(false):", Boolean(false));
console.log("Boolean(0):", Boolean(0));
console.log("Boolean(''):", Boolean(""));
console.log("Boolean(null):", Boolean(null));
console.log("Boolean(undefined):", Boolean(undefined));
console.log("Boolean(NaN):", Boolean(NaN));

// Truthy values (all other values - clarified)
console.log("\nTruthy values:");
console.log("Boolean('0'):", Boolean("0")); // true (clarified)
console.log("Boolean('false'):", Boolean("false")); // true (clarified)
console.log("Boolean([]):", Boolean([])); // true (clarified)
console.log("Boolean({}):", Boolean({})); // true (clarified)

// ============================================
// 10. THIS BINDING CLARIFICATIONS
// ============================================

console.log("\n=== 10. 'this' Binding ===");

/**
 * ES2 clarified 'this' binding behavior in different contexts
 */

// Global context (clarified)
function globalFunction() {
  // In browsers: 'this' refers to window
  // Behavior was clarified in specification
  return typeof this;
}
console.log("'this' in global function:", globalFunction());

// Object method context (clarified)
var calculator = {
  value: 10,
  getValue: function () {
    return this.value; // 'this' refers to calculator object
  },
};
console.log("'this' in object method:", calculator.getValue());

// Constructor context (clarified)
function Counter(initial) {
  this.count = initial; // 'this' refers to new instance
}
var counter = new Counter(5);
console.log("'this' in constructor:", counter.count);

// ============================================
// 11. PROTOTYPE CHAIN CLARIFICATIONS
// ============================================

console.log("\n=== 11. Prototype Chain ===");

/**
 * ES2 clarified prototype chain lookup behavior
 */

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return this.name + " makes a sound";
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Prototype chain (behavior clarified in ES2)
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  return this.name + " barks!";
};

var myDog = new Dog("Buddy", "Golden Retriever");
console.log("Dog name:", myDog.name);
console.log("Dog speak:", myDog.speak()); // From Animal prototype
console.log("Dog bark:", myDog.bark()); // From Dog prototype

// ============================================
// 12. SCOPE CHAIN CLARIFICATIONS
// ============================================

console.log("\n=== 12. Scope Chain ===");

/**
 * ES2 clarified scope chain and variable lookup behavior
 */

var outerVar = "outer";

function outerFunction() {
  var middleVar = "middle";

  function innerFunction() {
    var innerVar = "inner";
    // Scope chain lookup order clarified:
    // 1. innerFunction scope
    // 2. outerFunction scope
    // 3. Global scope
    console.log("Inner:", innerVar);
    console.log("Middle:", middleVar);
    console.log("Outer:", outerVar);
  }

  innerFunction();
}

outerFunction();

// ============================================
// 13. TYPE COERCION CLARIFICATIONS
// ============================================

console.log("\n=== 13. Type Coercion ===");

/**
 * ES2 clarified automatic type conversion rules
 */

// String coercion (clarified)
console.log("String coercion:");
console.log("'5' + 3:", "5" + 3); // "53" (string concatenation)
console.log("'5' - 3:", "5" - 3); // 2 (numeric subtraction)
console.log("'5' * '2':", "5" * "2"); // 10 (numeric multiplication)

// Boolean coercion in operations (clarified)
console.log("\nBoolean coercion:");
console.log("true + true:", true + true); // 2
console.log("true + false:", true + false); // 1
console.log("'5' + true:", "5" + true); // "5true"

// ============================================
// 14. EQUALITY COMPARISON CLARIFICATIONS
// ============================================

console.log("\n=== 14. Equality Comparison ===");

/**
 * ES2 clarified == (loose equality) vs === (strict equality) behavior
 */

console.log("Loose equality (==):");
console.log("5 == '5':", 5 == "5"); // true (type coercion)
console.log("0 == false:", 0 == false); // true
console.log("null == undefined:", null == undefined); // true

console.log("\nStrict equality (===):");
console.log("5 === '5':", 5 === "5"); // false (no type coercion)
console.log("0 === false:", 0 === false); // false
console.log("null === undefined:", null === undefined); // false

// ============================================
// 15. FUNCTION HOISTING CLARIFICATIONS
// ============================================

console.log("\n=== 15. Hoisting Behavior ===");

/**
 * ES2 clarified hoisting behavior for variables and functions
 */

// Function declaration hoisting (clarified)
console.log("Call before declaration:", hoistedFunction());

function hoistedFunction() {
  return "I'm hoisted!";
}

// Variable hoisting (clarified)
console.log("Variable before declaration:", typeof hoistedVar); // undefined
var hoistedVar = "I'm assigned later";
console.log("Variable after assignment:", hoistedVar);

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES2 SUMMARY ===");
console.log("ES2 (1998) was primarily an editorial release:");
console.log("- No new syntax or features added");
console.log("- Clarified existing behaviors and edge cases");
console.log("- Aligned ECMAScript with ISO/IEC 16262 standard");
console.log("- Fixed specification ambiguities");
console.log("- Improved consistency across implementations");
console.log("\nDevelopers could write ES2 code exactly like ES1 code!");
console.log(
  "The changes were in the specification document, not the language itself."
);

// ============================================
// PRACTICAL NOTE FOR DEVELOPERS
// ============================================

console.log("\n=== Practical Impact ===");
console.log("For developers, ES2 meant:");
console.log("1. Better specification documentation");
console.log("2. More consistent JavaScript engine behavior");
console.log("3. Clearer understanding of edge cases");
console.log("4. No need to learn new syntax or features");
console.log("5. Same code worked in both ES1 and ES2");

console.log("\n=== ES2 Features Complete ===");
