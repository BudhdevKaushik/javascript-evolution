/**
 * ECMAScript 7 (ES7 / ES2016) - 2016
 *
 * ES7 was a small release compared to ES6, introducing only two new features.
 * This marked the beginning of the yearly release cycle for JavaScript,
 * with smaller, incremental updates instead of large releases.
 *
 * Key Changes:
 * - Array.prototype.includes() method
 * - Exponentiation operator (**)
 *
 * Note: After ES6, ECMAScript adopted a yearly release cycle with smaller updates.
 * ES7 (ES2016) was the first release under this new process.
 */

console.log("=== ECMAScript 7 (ES7 / ES2016) - 2016 ===");
console.log("ES7 introduced 2 new features to JavaScript\n");

// ============================================
// 1. ARRAY.PROTOTYPE.INCLUDES()
// ============================================

console.log("=== 1. Array.prototype.includes() ===");

/**
 * PROBLEM: ES6 used indexOf() to check array membership, which has issues:
 *          - Returns -1 (not intuitive for boolean checks)
 *          - Doesn't handle NaN correctly
 *          - Less readable than a boolean method
 * SOLUTION: ES7 added includes() which returns true/false and handles NaN
 */

// NEW WAY (ES7): Array.includes()
const numbers = [1, 2, 3, 4, 5];
console.log("numbers.includes(3):", numbers.includes(3)); // true
console.log("numbers.includes(10):", numbers.includes(10)); // false

// NEW WAY (ES7): includes() with fromIndex parameter
const fruits = ["apple", "banana", "orange", "grape", "banana"];
console.log("fruits.includes('banana'):", fruits.includes("banana")); // true
console.log("fruits.includes('banana', 2):", fruits.includes("banana", 2)); // true (starts from index 2)
console.log("fruits.includes('banana', 5):", fruits.includes("banana", 5)); // false (starts after last banana)

// NEW WAY (ES7): Negative fromIndex (counts from end)
console.log("fruits.includes('grape', -2):", fruits.includes("grape", -2)); // true

// NEW WAY (ES7): includes() properly handles NaN
const values = [1, 2, NaN, 4, 5];
console.log("values.includes(NaN):", values.includes(NaN)); // true ✓
console.log("Is NaN in array?", values.includes(NaN)); // Much more readable!

// NEW WAY (ES7): includes() with undefined
const sparse = [1, , 3]; // Array with hole
console.log("sparse.includes(undefined):", sparse.includes(undefined)); // true

// NEW WAY (ES7): Case sensitivity
const words = ["Hello", "World"];
console.log("words.includes('hello'):", words.includes("hello")); // false (case-sensitive)
console.log("words.includes('Hello'):", words.includes("Hello")); // true

// NEW WAY (ES7): With objects (reference equality)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const objects = [obj1, obj2];
console.log("objects.includes(obj1):", objects.includes(obj1)); // true
console.log("objects.includes({ id: 1 }):", objects.includes({ id: 1 })); // false (different reference)

// NEW WAY (ES7): Practical example - checking permissions
const userPermissions = ["read", "write", "delete"];
const hasWritePermission = userPermissions.includes("write");
console.log("User has write permission:", hasWritePermission);

if (userPermissions.includes("admin")) {
  console.log("Admin access granted");
} else {
  console.log("Regular user access");
}

// NEW WAY (ES7): Checking multiple values
const allowedExtensions = [".jpg", ".png", ".gif", ".webp"];
const fileExtension = ".png";
if (allowedExtensions.includes(fileExtension)) {
  console.log("Valid image format");
}

// OLD WAY (ES5/ES6): Using indexOf()
var numbersOld = [1, 2, 3, 4, 5];
console.log("Old - indexOf(3) !== -1:", numbersOld.indexOf(3) !== -1); // true
console.log("Old - indexOf(10) !== -1:", numbersOld.indexOf(10) !== -1); // false

// OLD WAY (ES5/ES6): indexOf with fromIndex
var fruitsOld = ["apple", "banana", "orange", "grape", "banana"];
console.log(
  "Old - indexOf('banana', 2):",
  fruitsOld.indexOf("banana", 2) !== -1
);

// OLD WAY (ES5/ES6): indexOf FAILS with NaN
var valuesOld = [1, 2, NaN, 4, 5];
console.log("Old - indexOf(NaN):", valuesOld.indexOf(NaN)); // -1 (WRONG!) ✗
console.log("Old - indexOf(NaN) !== -1:", valuesOld.indexOf(NaN) !== -1); // false (INCORRECT!)

// OLD WAY (ES5/ES6): Manual NaN check required
function containsNaN(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (Number.isNaN(arr[i])) {
      return true;
    }
  }
  return false;
}
console.log("Old - manual NaN check:", containsNaN(valuesOld)); // true (but verbose!)

// OLD WAY (ES5/ES6): Less readable boolean check
var userPermissionsOld = ["read", "write", "delete"];
var hasWritePermissionOld = userPermissionsOld.indexOf("write") !== -1; // Less clear
console.log("Old - has write permission:", hasWritePermissionOld);

if (userPermissionsOld.indexOf("admin") !== -1) {
  console.log("Admin access granted");
} else {
  console.log("Regular user access");
}

// OLD WAY (ES5/ES6): Using some() as alternative
var hasWrite = userPermissionsOld.some(function (permission) {
  return permission === "write";
});
console.log("Old - using some():", hasWrite); // Works but verbose for simple checks

console.log("");

// ============================================
// 2. EXPONENTIATION OPERATOR (**)
// ============================================

console.log("=== 2. Exponentiation Operator (**) ===");

/**
 * PROBLEM: ES5/ES6 required Math.pow() for exponentiation, which is verbose
 * SOLUTION: ES7 added the ** operator for cleaner exponentiation syntax
 */

// NEW WAY (ES7): Exponentiation operator
console.log("2 ** 3:", 2 ** 3); // 8
console.log("5 ** 2:", 5 ** 2); // 25
console.log("10 ** 3:", 10 ** 3); // 1000

// NEW WAY (ES7): With negative exponents
console.log("2 ** -1:", 2 ** -1); // 0.5
console.log("10 ** -2:", 10 ** -2); // 0.01

// NEW WAY (ES7): With decimals
console.log("4 ** 0.5:", 4 ** 0.5); // 2 (square root)
console.log("27 ** (1/3):", 27 ** (1 / 3)); // 3 (cube root)
console.log("2.5 ** 2:", 2.5 ** 2); // 6.25

// NEW WAY (ES7): Exponentiation assignment operator
let base = 3;
base **= 2; // Same as: base = base ** 2
console.log("After 3 **= 2:", base); // 9

let value = 2;
value **= 3;
console.log("After 2 **= 3:", value); // 8

// NEW WAY (ES7): Chaining (right-associative)
console.log("2 ** 3 ** 2:", 2 ** (3 ** 2)); // 512 (evaluated as 2 ** (3 ** 2) = 2 ** 9)
console.log("Explanation: 3 ** 2 = 9, then 2 ** 9 = 512");

// NEW WAY (ES7): In expressions
const radius = 5;
const area = Math.PI * radius ** 2; // Much cleaner!
console.log("Circle area (r=5):", area.toFixed(2));

// NEW WAY (ES7): Scientific calculations
const speed = 3 * 10 ** 8; // Speed of light: 3 × 10^8 m/s
console.log("Speed of light:", speed, "m/s");

const planckLength = 1.616 * 10 ** -35; // Planck length in meters
console.log("Planck length:", planckLength, "m");

// NEW WAY (ES7): Compound interest calculation
function calculateCompoundInterest(principal, rate, time) {
  return principal * (1 + rate) ** time;
}
const investment = calculateCompoundInterest(1000, 0.05, 10);
console.log("Investment after 10 years:", investment.toFixed(2));

// NEW WAY (ES7): Power of 2 checks (common in CS)
const powers = [2 ** 0, 2 ** 1, 2 ** 2, 2 ** 3, 2 ** 4];
console.log("Powers of 2:", powers); // [1, 2, 4, 8, 16]

// NEW WAY (ES7): Geometric sequences
function geometricSequence(start, ratio, terms) {
  const sequence = [];
  for (let i = 0; i < terms; i++) {
    sequence.push(start * ratio ** i);
  }
  return sequence;
}
console.log("Geometric sequence:", geometricSequence(2, 3, 5)); // [2, 6, 18, 54, 162]

// NEW WAY (ES7): With negative base (needs parentheses)
console.log("(-2) ** 3:", (-2) ** 3); // -8
console.log("(-2) ** 2:", (-2) ** 2); // 4
// console.log("-2 ** 2"); // SyntaxError! Must use parentheses with negative base

// OLD WAY (ES5/ES6): Using Math.pow()
console.log("Old - Math.pow(2, 3):", Math.pow(2, 3)); // 8
console.log("Old - Math.pow(5, 2):", Math.pow(5, 2)); // 25
console.log("Old - Math.pow(10, 3):", Math.pow(10, 3)); // 1000

// OLD WAY (ES5/ES6): With negative exponents
console.log("Old - Math.pow(2, -1):", Math.pow(2, -1)); // 0.5
console.log("Old - Math.pow(10, -2):", Math.pow(10, -2)); // 0.01

// OLD WAY (ES5/ES6): With decimals
console.log("Old - Math.pow(4, 0.5):", Math.pow(4, 0.5)); // 2
console.log("Old - Math.pow(27, 1/3):", Math.pow(27, 1 / 3)); // 3

// OLD WAY (ES5/ES6): Assignment (verbose)
var baseOld = 3;
baseOld = Math.pow(baseOld, 2);
console.log("Old - after Math.pow(3, 2):", baseOld); // 9

// OLD WAY (ES5/ES6): In expressions (less readable)
var radiusOld = 5;
var areaOld = Math.PI * Math.pow(radiusOld, 2);
console.log("Old - circle area:", areaOld.toFixed(2));

// OLD WAY (ES5/ES6): Scientific calculations (verbose)
var speedOld = 3 * Math.pow(10, 8);
console.log("Old - speed of light:", speedOld, "m/s");

// OLD WAY (ES5/ES6): Compound interest (verbose)
function calculateCompoundInterestOld(principal, rate, time) {
  return principal * Math.pow(1 + rate, time);
}
var investmentOld = calculateCompoundInterestOld(1000, 0.05, 10);
console.log("Old - investment:", investmentOld.toFixed(2));

// OLD WAY (ES5/ES6): Powers of 2 (verbose)
var powersOld = [
  Math.pow(2, 0),
  Math.pow(2, 1),
  Math.pow(2, 2),
  Math.pow(2, 3),
  Math.pow(2, 4),
];
console.log("Old - powers of 2:", powersOld);

console.log("");

// ============================================
// COMPARISON: WHY THESE FEATURES MATTER
// ============================================

console.log("=== Why These Features Matter ===");

console.log("\n1. Array.includes() Benefits:");
console.log("   ✓ More intuitive - returns boolean directly");
console.log("   ✓ Handles NaN correctly (indexOf doesn't)");
console.log("   ✓ More readable in conditional statements");
console.log("   ✓ Consistent with String.includes() from ES6");
console.log("   ✓ Better semantic meaning");

console.log("\n2. Exponentiation Operator Benefits:");
console.log("   ✓ More concise syntax");
console.log("   ✓ More readable, especially in complex formulas");
console.log("   ✓ Consistent with other mathematical operators");
console.log("   ✓ Assignment operator (**=) available");
console.log("   ✓ Aligns with mathematical notation");

console.log("");

// ============================================
// PRACTICAL EXAMPLES
// ============================================

console.log("=== Practical Examples ===");

// Example 1: Form validation with includes()
console.log("\nExample 1: Form Validation");
const validCountries = ["USA", "Canada", "Mexico", "UK", "Germany"];
const userCountry = "Canada";

if (validCountries.includes(userCountry)) {
  console.log("✓ Valid country selected");
} else {
  console.log("✗ Invalid country");
}

// Example 2: Feature detection
console.log("\nExample 2: Feature Detection");
const supportedFeatures = ["darkMode", "notifications", "geolocation"];
const requestedFeature = "darkMode";

if (supportedFeatures.includes(requestedFeature)) {
  console.log("✓ Feature is supported");
} else {
  console.log("✗ Feature not available");
}

// Example 3: Scientific calculation with exponentiation
console.log("\nExample 3: Physics - Kinetic Energy");
function kineticEnergy(mass, velocity) {
  return 0.5 * mass * velocity ** 2;
}
const energy = kineticEnergy(10, 5);
console.log("Kinetic energy:", energy, "joules");

// Example 4: Exponential growth modeling
console.log("\nExample 4: Population Growth");
function populationGrowth(initial, rate, years) {
  return initial * (1 + rate) ** years;
}
const population = populationGrowth(1000000, 0.02, 10);
console.log("Population after 10 years:", Math.round(population));

// Example 5: Filtering with includes()
console.log("\nExample 5: Content Filtering");
const bannedWords = ["spam", "scam", "fake"];
const messages = [
  "Hello, how are you?",
  "Check this spam offer!",
  "This is a scam website",
  "Great product, highly recommended",
];

const filteredMessages = messages.filter((msg) => {
  const lowerMsg = msg.toLowerCase();
  return !bannedWords.some((word) => lowerMsg.includes(word));
});

console.log("Filtered messages:", filteredMessages);

// Example 6: Binary search depth calculation
console.log("\nExample 6: Binary Search Tree Depth");
function maxNodesAtDepth(depth) {
  return 2 ** depth;
}
console.log("Max nodes at depth 5:", maxNodesAtDepth(5)); // 32

// Example 7: Data size calculations
console.log("\nExample 7: Data Size Calculations");
const kilobyte = 2 ** 10; // 1024
const megabyte = 2 ** 20; // 1,048,576
const gigabyte = 2 ** 30; // 1,073,741,824
console.log("1 KB:", kilobyte, "bytes");
console.log("1 MB:", megabyte, "bytes");
console.log("1 GB:", gigabyte, "bytes");

console.log("");

// ============================================
// EDGE CASES AND GOTCHAS
// ============================================

console.log("=== Edge Cases and Gotchas ===");

// Gotcha 1: includes() uses SameValueZero comparison
console.log("\nGotcha 1: includes() treats +0 and -0 as equal");
console.log("[+0].includes(-0):", [+0].includes(-0)); // true

// Gotcha 2: Exponentiation is right-associative
console.log("\nGotcha 2: Exponentiation is right-associative");
console.log("2 ** 2 ** 3:", 2 ** (2 ** 3)); // 256, not 64
console.log("Evaluated as: 2 ** (2 ** 3) = 2 ** 8 = 256");
console.log("Use parentheses: (2 ** 2) ** 3 =", (2 ** 2) ** 3); // 64

// Gotcha 3: Unary minus requires parentheses
console.log("\nGotcha 3: Negative base needs parentheses");
console.log("(-3) ** 2:", (-3) ** 2); // 9
// console.log("-3 ** 2"); // SyntaxError!

// Gotcha 4: includes() with object references
console.log("\nGotcha 4: includes() uses reference equality for objects");
const arr1 = [{ id: 1 }, { id: 2 }];
console.log("arr.includes({ id: 1 }):", arr1.includes({ id: 1 })); // false

// Gotcha 5: Very large exponents
console.log("\nGotcha 5: Very large exponents can cause Infinity");
console.log("10 ** 308:", 10 ** 308); // Large number
console.log("10 ** 309:", 10 ** 309); // Infinity

console.log("");

// ============================================
// BROWSER COMPATIBILITY NOTES
// ============================================

console.log("=== Browser Compatibility ===");

console.log("\nArray.includes() support:");
console.log("- Chrome: 47+");
console.log("- Firefox: 43+");
console.log("- Safari: 9+");
console.log("- Edge: 14+");
console.log("- Node.js: 6.0+");

console.log("\nExponentiation operator support:");
console.log("- Chrome: 52+");
console.log("- Firefox: 52+");
console.log("- Safari: 10.1+");
console.log("- Edge: 14+");
console.log("- Node.js: 7.0+");

console.log("\nPolyfill option: Use Babel for older environments");

console.log("");

// ============================================
// POLYFILLS
// ============================================

console.log("=== Polyfills (for older browsers) ===");

// Polyfill for Array.includes()
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);
    var len = o.length >>> 0;

    if (len === 0) return false;

    var n = fromIndex | 0;
    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    while (k < len) {
      if (
        o[k] === searchElement ||
        (Number.isNaN(o[k]) && Number.isNaN(searchElement))
      ) {
        return true;
      }
      k++;
    }
    return false;
  };
}

console.log("Polyfills added for legacy browser support");

// Note: Exponentiation operator cannot be polyfilled (syntax feature)
// Use Math.pow() for older browsers or transpile with Babel

console.log("");

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES7 SUMMARY ===");
console.log("ES7 (2016) was a small but important release featuring:");
console.log("✓ Array.prototype.includes() - Better array membership testing");
console.log("✓ Exponentiation operator (**) - Cleaner power calculations");

console.log("\n=== Release Cycle Change ===");
console.log("ES7 marked the beginning of yearly ECMAScript releases:");
console.log("- Smaller, incremental updates instead of large releases");
console.log("- Predictable yearly schedule (ES2016, ES2017, ES2018, etc.)");
console.log("- Features are added when ready, not waiting for major versions");
console.log("- Easier for developers to keep up with changes");

console.log("\n=== Practical Impact ===");
console.log("For developers, ES7 meant:");
console.log("1. Cleaner array membership checks with includes()");
console.log("2. More readable mathematical expressions with **");
console.log("3. Better NaN handling in array searches");
console.log("4. Consistency with other modern languages");
console.log("5. Small but frequently used improvements");
console.log("6. Easy adoption due to limited scope");

console.log("\n=== Migration Notes ===");
console.log("Upgrading from ES6 to ES7:");
console.log("- Replace indexOf() !== -1 with includes() where appropriate");
console.log("- Replace Math.pow() with ** operator for better readability");
console.log("- Both features have excellent polyfill/transpiler support");
console.log("- Minimal breaking changes, fully backward compatible");

console.log("\n=== ES7 Features Complete ===");
