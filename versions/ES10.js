/**
 * ECMAScript 10 (ES10 / ES2019) - 2019
 *
 * ES10 continued the yearly release cycle with focus on array manipulation,
 * object utilities, and string handling improvements. It introduced several
 * quality-of-life features that made JavaScript more developer-friendly.
 *
 * Key Changes:
 * - Array.prototype.flat() and flatMap()
 * - Object.fromEntries()
 * - String.prototype.trimStart() and trimEnd()
 * - Optional catch binding
 * - Function.prototype.toString() revision
 * - Symbol.prototype.description
 * - Well-formed JSON.stringify()
 * - Array.prototype.sort() stability
 *
 * Note: ES10 focused on making common operations simpler and more intuitive.
 */

console.log("=== ECMAScript 10 (ES10 / ES2019) - 2019 ===");
console.log("ES10 introduced developer-friendly improvements\n");

// ============================================
// 1. ARRAY.PROTOTYPE.FLAT()
// ============================================

console.log("=== 1. Array.prototype.flat() ===");

/**
 * PROBLEM: Flattening nested arrays required custom functions or libraries
 * SOLUTION: ES10 added flat() to flatten arrays to specified depth
 */

// NEW WAY (ES10): Basic flattening
console.log("\n--- Basic Array Flattening ---");

const arr1 = [1, 2, [3, 4]];
console.log("One level:", arr1.flat());
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
console.log("Default (1 level):", arr2.flat());
// [1, 2, 3, 4, [5, 6]]

// NEW WAY (ES10): Flattening with depth
console.log("\n--- Flattening with Depth ---");

const arr3 = [1, 2, [3, 4, [5, 6]]];
console.log("Depth 2:", arr3.flat(2));
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, [2, [3, [4, [5]]]]];
console.log("Depth 3:", arr4.flat(3));
// [1, 2, 3, 4, [5]]

// NEW WAY (ES10): Flattening completely with Infinity
const deepNested = [1, [2, [3, [4, [5, [6]]]]]];
console.log("Infinity depth:", deepNested.flat(Infinity));
// [1, 2, 3, 4, 5, 6]

// NEW WAY (ES10): Removing empty slots
console.log("\n--- Removing Empty Slots ---");

const arrWithHoles = [1, 2, , 4, 5];
console.log("Original with holes:", arrWithHoles);
console.log("After flat():", arrWithHoles.flat());
// [1, 2, 4, 5] - holes removed!

// NEW WAY (ES10): Practical example - flattening categories
console.log("\n--- Practical: Category Flattening ---");

const categories = [
  ["Electronics", "Computers"],
  ["Books", "Fiction", "Non-Fiction"],
  ["Clothing"],
];
const allCategories = categories.flat();
console.log("All categories:", allCategories);

// NEW WAY (ES10): Flattening user permissions
const userPermissions = [["read", "write"], ["delete"], ["admin", "superuser"]];
const flatPermissions = userPermissions.flat();
console.log("Flat permissions:", flatPermissions);

// NEW WAY (ES10): With mixed types
const mixed = [1, [2, "three"], [[4, 5]], null, undefined];
console.log("Mixed types flattened:", mixed.flat(2));

// NEW WAY (ES10): Chaining with other methods
const numbers = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const doubled = numbers.flat().map((x) => x * 2);
console.log("Flattened and doubled:", doubled);

// OLD WAY (ES9 and earlier): Manual flattening with reduce
console.log("\n--- Old Way: Manual Flattening ---");

const arr1Old = [1, 2, [3, 4]];
const flatOld = arr1Old.reduce((acc, val) => acc.concat(val), []);
console.log("Old - Manual flat:", flatOld);

// OLD WAY: Recursive flattening
function flattenDeep(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}

const deepOld = [1, [2, [3, [4]]]];
console.log("Old - Recursive:", flattenDeep(deepOld));

// OLD WAY: Using libraries (lodash)
// const flatLodash = _.flatten(arr);
console.log("Old - Required libraries like lodash");

console.log("");

// ============================================
// 2. ARRAY.PROTOTYPE.FLATMAP()
// ============================================

console.log("=== 2. Array.prototype.flatMap() ===");

/**
 * PROBLEM: map() followed by flat() was a common pattern but inefficient
 * SOLUTION: ES10 added flatMap() which maps and flattens in one operation
 */

// NEW WAY (ES10): Basic flatMap
console.log("\n--- Basic flatMap ---");

const arr5 = [1, 2, 3, 4];
const result1 = arr5.flatMap((x) => [x, x * 2]);
console.log("flatMap result:", result1);
// [1, 2, 2, 4, 3, 6, 4, 8]

// NEW WAY (ES10): Comparison with map + flat
console.log("\n--- flatMap vs map + flat ---");

const arr6 = [1, 2, 3];
const withMap = arr6.map((x) => [x, x * 2]).flat();
const withFlatMap = arr6.flatMap((x) => [x, x * 2]);
console.log("map + flat:", withMap);
console.log("flatMap:", withFlatMap);
console.log(
  "Same result:",
  JSON.stringify(withMap) === JSON.stringify(withFlatMap)
);

// NEW WAY (ES10): Splitting strings
console.log("\n--- Splitting Strings ---");

const sentences = ["hello world", "how are you"];
const words = sentences.flatMap((sentence) => sentence.split(" "));
console.log("All words:", words);
// ["hello", "world", "how", "are", "you"]

// NEW WAY (ES10): Filtering and mapping
console.log("\n--- Filter and Map Combined ---");

const numbers2 = [1, 2, 3, 4, 5];
const evenDoubled = numbers2.flatMap((x) => (x % 2 === 0 ? [x * 2] : []));
console.log("Even numbers doubled:", evenDoubled);
// [4, 8]

// NEW WAY (ES10): Expanding data structures
console.log("\n--- Expanding Data ---");

const orders = [
  { id: 1, items: ["apple", "banana"] },
  { id: 2, items: ["orange"] },
  { id: 3, items: ["grape", "melon", "kiwi"] },
];

const allItems = orders.flatMap((order) => order.items);
console.log("All items:", allItems);

// NEW WAY (ES10): Duplicating elements
const arr7 = [1, 2, 3];
const duplicated = arr7.flatMap((x) => [x, x]);
console.log("Duplicated:", duplicated);
// [1, 1, 2, 2, 3, 3]

// NEW WAY (ES10): Converting to tags
console.log("\n--- Practical: Tag Generation ---");

const products = [
  { name: "Laptop", tags: ["electronics", "computers"] },
  { name: "Book", tags: ["media", "books"] },
];

const allTags = products.flatMap((p) => p.tags);
console.log("All tags:", allTags);

// NEW WAY (ES10): Conditional expansion
const data = [1, 2, 3, 4];
const expanded = data.flatMap((x) => {
  if (x > 2) {
    return [x, x * 10];
  }
  return [x];
});
console.log("Conditional expansion:", expanded);

// NEW WAY (ES10): Only flattens one level
const arr8 = [1, 2, 3];
const nested2 = arr8.flatMap((x) => [[x * 2]]);
console.log("Only 1 level flat:", nested2);
// [[2], [4], [6]] - inner arrays remain

// OLD WAY (ES9 and earlier): map + flat
console.log("\n--- Old Way: map + flat ---");

const arr5Old = [1, 2, 3, 4];
const resultOld = arr5Old.map((x) => [x, x * 2]).flat();
console.log("Old - map + flat:", resultOld);

// OLD WAY: Manual implementation
const sentencesOld = ["hello world", "how are you"];
const wordsOld = [];
sentencesOld.forEach((sentence) => {
  wordsOld.push(...sentence.split(" "));
});
console.log("Old - Manual:", wordsOld);

// OLD WAY: Using reduce
const numbersOld = [1, 2, 3, 4, 5];
const evenDoubledOld = numbersOld.reduce((acc, x) => {
  if (x % 2 === 0) {
    acc.push(x * 2);
  }
  return acc;
}, []);
console.log("Old - Reduce:", evenDoubledOld);

console.log("");

// ============================================
// 3. OBJECT.FROMENTRIES()
// ============================================

console.log("=== 3. Object.fromEntries() ===");

/**
 * PROBLEM: No easy way to convert key-value pairs back to objects
 * SOLUTION: ES10 added Object.fromEntries() (reverse of Object.entries())
 */

// NEW WAY (ES10): Basic conversion
console.log("\n--- Basic fromEntries ---");

const entries = [
  ["name", "Alice"],
  ["age", 30],
  ["city", "NYC"],
];
const obj = Object.fromEntries(entries);
console.log("From entries:", obj);
// { name: 'Alice', age: 30, city: 'NYC' }

// NEW WAY (ES10): Converting Map to Object
console.log("\n--- Map to Object ---");

const map = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const objFromMap = Object.fromEntries(map);
console.log("From Map:", objFromMap);
// { foo: 'bar', baz: 42 }

// NEW WAY (ES10): Transforming object values
console.log("\n--- Transforming Objects ---");

const prices = { apple: 2, banana: 1, orange: 3 };
const doublePrices = Object.fromEntries(
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
console.log("Doubled prices:", doublePrices);

// NEW WAY (ES10): Filtering object properties
console.log("\n--- Filtering Properties ---");

const user = {
  name: "Bob",
  age: 25,
  password: "secret",
  email: "bob@example.com",
};
const publicUser = Object.fromEntries(
  Object.entries(user).filter(([key]) => key !== "password")
);
console.log("Filtered user:", publicUser);

// NEW WAY (ES10): Converting query string to object
console.log("\n--- Query String to Object ---");

const params = new URLSearchParams("name=Alice&age=30&city=NYC");
const queryObj = Object.fromEntries(params);
console.log("Query object:", queryObj);

// NEW WAY (ES10): Inverting key-value pairs
console.log("\n--- Inverting Object ---");

const original = { a: "1", b: "2", c: "3" };
const inverted = Object.fromEntries(
  Object.entries(original).map(([key, value]) => [value, key])
);
console.log("Inverted:", inverted);
// { '1': 'a', '2': 'b', '3': 'c' }

// NEW WAY (ES10): Creating object from array of objects
console.log("\n--- Array to Keyed Object ---");

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const usersById = Object.fromEntries(users.map((user) => [user.id, user]));
console.log("Users by ID:", usersById);

// NEW WAY (ES10): Uppercasing keys
const settings = { theme: "dark", language: "en" };
const upperKeys = Object.fromEntries(
  Object.entries(settings).map(([key, value]) => [key.toUpperCase(), value])
);
console.log("Upper keys:", upperKeys);

// NEW WAY (ES10): Removing null/undefined values
const data2 = { a: 1, b: null, c: 3, d: undefined, e: 5 };
const cleanedData2 = Object.fromEntries(
  Object.entries(data2).filter(([, value]) => value != null)
);
console.log("Cleaned data:", cleanedData2);

// NEW WAY (ES10): Default values for missing properties
const defaults2 = { theme: "light", size: "medium", color: "blue" };
const userSettings = { theme: "dark" };
const finalSettings = Object.fromEntries(
  Object.entries(defaults2).map(([key, value]) => [
    key,
    userSettings[key] || value,
  ])
);
console.log("With defaults:", finalSettings);

// OLD WAY (ES9 and earlier): Manual object construction
console.log("\n--- Old Way: Manual Construction ---");

const entriesOld = [
  ["name", "Alice"],
  ["age", 30],
  ["city", "NYC"],
];
const objOld = {};
entriesOld.forEach(([key, value]) => {
  objOld[key] = value;
});
console.log("Old - Manual:", objOld);

// OLD WAY: Using reduce
const objReduce = entriesOld.reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});
console.log("Old - Reduce:", objReduce);

// OLD WAY: Map to object (manual)
const mapOld = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const objFromMapOld = {};
mapOld.forEach((value, key) => {
  objFromMapOld[key] = value;
});
console.log("Old - From Map:", objFromMapOld);

console.log("");

// ============================================
// 4. STRING.PROTOTYPE.TRIMSTART() AND TRIMEND()
// ============================================

console.log("=== 4. String.prototype.trimStart() and trimEnd() ===");

/**
 * PROBLEM: trim() removes from both ends, no way to trim only one side
 * SOLUTION: ES10 added trimStart() and trimEnd() for targeted trimming
 */

// NEW WAY (ES10): trimStart()
console.log("\n--- trimStart() ---");

const str1 = "   Hello World";
console.log("Original:", `"${str1}"`);
console.log("trimStart:", `"${str1.trimStart()}"`);
// "Hello World"

// NEW WAY (ES10): trimEnd()
const str2 = "Hello World   ";
console.log("Original:", `"${str2}"`);
console.log("trimEnd:", `"${str2.trimEnd()}"`);
// "Hello World"

// NEW WAY (ES10): Comparison with trim()
console.log("\n--- Comparison ---");

const str3 = "   Hello World   ";
console.log("Original:", `"${str3}"`);
console.log("trim():", `"${str3.trim()}"`);
console.log("trimStart():", `"${str3.trimStart()}"`);
console.log("trimEnd():", `"${str3.trimEnd()}"`);

// NEW WAY (ES10): Preserving intentional whitespace
console.log("\n--- Preserving Whitespace ---");

const indented = "    function() {";
const cleaned = indented.trimStart();
console.log("Removed indent:", `"${cleaned}"`);

const trailing = "console.log('test');    ";
const cleanedEnd = trailing.trimEnd();
console.log("Removed trailing:", `"${cleanedEnd}"`);

// NEW WAY (ES10): Processing user input
console.log("\n--- User Input Processing ---");

const userInput = "  john@example.com  ";
const email = userInput.trim(); // Still use trim() for both ends
console.log("Email:", email);

const leftAligned = "Hello   ";
const rightTrimmed = leftAligned.trimEnd();
console.log("Right trimmed:", `"${rightTrimmed}"`);

// NEW WAY (ES10): Code formatting
const code = "    const x = 10;";
const unindented = code.trimStart();
console.log("Unindented code:", unindented);

// NEW WAY (ES10): Processing multi-line strings
const multiline = `
    Line 1
    Line 2
    Line 3
`;
const lines = multiline.split("\n").map((line) => line.trimStart());
console.log("Processed lines:", lines);

// NEW WAY (ES10): Aliases (trimLeft and trimRight still work)
const str4 = "   test   ";
console.log("\n--- Aliases ---");
console.log("trimLeft:", `"${str4.trimLeft()}"`); // Same as trimStart
console.log("trimRight:", `"${str4.trimRight()}"`); // Same as trimEnd

// NEW WAY (ES10): Handling tabs and newlines
const whitespace = "\t\n  Hello  \t\n";
console.log("Original:", JSON.stringify(whitespace));
console.log("trimStart:", JSON.stringify(whitespace.trimStart()));
console.log("trimEnd:", JSON.stringify(whitespace.trimEnd()));

// OLD WAY (ES5-ES9): Using trim() or regex
console.log("\n--- Old Way: Regex ---");

const str1Old = "   Hello World";
const trimmedStart = str1Old.replace(/^\s+/, "");
console.log("Old - trimStart:", `"${trimmedStart}"`);

const str2Old = "Hello World   ";
const trimmedEnd = str2Old.replace(/\s+$/, "");
console.log("Old - trimEnd:", `"${trimmedEnd}"`);

// OLD WAY: Manual implementation
function trimStart(str) {
  return str.replace(/^\s+/, "");
}

function trimEnd(str) {
  return str.replace(/\s+$/, "");
}

console.log("Old - Custom trimStart:", `"${trimStart("   Hello")}"`);
console.log("Old - Custom trimEnd:", `"${trimEnd("Hello   ")}"`);

console.log("");

// ============================================
// 5. OPTIONAL CATCH BINDING
// ============================================

console.log("=== 5. Optional Catch Binding ===");

/**
 * PROBLEM: Had to specify error parameter even when not used
 * SOLUTION: ES10 made catch parameter optional
 */

// NEW WAY (ES10): Catch without parameter
console.log("\n--- Optional Catch Binding ---");

try {
  JSON.parse("invalid json");
} catch {
  // No error parameter needed!
  console.log("JSON parsing failed");
}

// NEW WAY (ES10): When you don't need error details
try {
  const result = riskyOperation();
  console.log("Success:", result);
} catch {
  console.log("Operation failed, using default");
  const result = getDefaultValue();
}

function riskyOperation() {
  throw new Error("Something went wrong");
}

function getDefaultValue() {
  return "default";
}

// NEW WAY (ES10): Feature detection
console.log("\n--- Feature Detection ---");

let hasLocalStorage = false;
try {
  localStorage.setItem("test", "test");
  localStorage.removeItem("test");
  hasLocalStorage = true;
} catch {
  // Browser doesn't support localStorage or it's disabled
  hasLocalStorage = false;
}
console.log("Has localStorage:", hasLocalStorage);

// NEW WAY (ES10): Suppressing errors
try {
  // Attempt optional enhancement
  enableAdvancedFeature();
} catch {
  // Silently fail, feature not critical
  console.log("Advanced feature not available");
}

function enableAdvancedFeature() {
  throw new Error("Not supported");
}

// NEW WAY (ES10): Checking API availability
let canUseNotifications = false;
try {
  new Notification("Test");
  canUseNotifications = true;
} catch {
  canUseNotifications = false;
}
console.log("Can use notifications:", canUseNotifications);

// NEW WAY (ES10): Still can use parameter when needed
console.log("\n--- With Parameter When Needed ---");

try {
  JSON.parse("invalid");
} catch (error) {
  // Use parameter when you need error details
  console.log("Error details:", error.message);
}

// OLD WAY (ES5-ES9): Required parameter
console.log("\n--- Old Way: Required Parameter ---");

try {
  JSON.parse("invalid json");
} catch (e) {
  // Had to specify parameter even if unused
  console.log("Old - Parsing failed");
}

try {
  const result = riskyOperation();
} catch (err) {
  // Parameter required but not used
  console.log("Old - Operation failed");
}

console.log("");

// ============================================
// 6. FUNCTION.PROTOTYPE.TOSTRING() REVISION
// ============================================

console.log("=== 6. Function.prototype.toString() Revision ===");

/**
 * PROBLEM: toString() didn't always return exact source code
 * SOLUTION: ES10 requires exact source code including whitespace and comments
 */

// NEW WAY (ES10): Exact source reproduction
console.log("\n--- Exact Source Reproduction ---");

function myFunction() {
  // This is a comment
  return 42;
}

console.log("Function toString:");
console.log(myFunction.toString());
// Shows exact source including comment

// NEW WAY (ES10): Arrow functions
const arrowFunc = (x, y) => x + y;
console.log("\nArrow function:");
console.log(arrowFunc.toString());

// NEW WAY (ES10): Methods
const obj2 = {
  method() {
    return "hello";
  },
};
console.log("\nObject method:");
console.log(obj2.method.toString());

// NEW WAY (ES10): Class methods
class MyClass {
  constructor() {
    this.value = 42;
  }

  getValue() {
    return this.value;
  }
}

console.log("\nClass method:");
console.log(MyClass.prototype.getValue.toString());

// NEW WAY (ES10): Async functions
async function asyncFunc() {
  return await Promise.resolve(42);
}
console.log("\nAsync function:");
console.log(asyncFunc.toString());

// NEW WAY (ES10): Generator functions
function* generatorFunc() {
  yield 1;
  yield 2;
}
console.log("\nGenerator:");
console.log(generatorFunc.toString());

// NEW WAY (ES10): Native functions
console.log("\nNative function:");
console.log(Math.max.toString());
// "[native code]" for built-in functions

// OLD WAY (ES5-ES9): Inconsistent representation
console.log("\n--- Old Behavior ---");
console.log(
  "Previously, toString() might not include comments or exact whitespace"
);
console.log("Now it must return the exact source code as written");

console.log("");

// ============================================
// 7. SYMBOL.PROTOTYPE.DESCRIPTION
// ============================================

console.log("=== 7. Symbol.prototype.description ===");

/**
 * PROBLEM: No direct way to get symbol description, had to parse toString()
 * SOLUTION: ES10 added description property to symbols
 */

// NEW WAY (ES10): Getting symbol description
console.log("\n--- Symbol Description ---");

const sym1 = Symbol("my symbol");
console.log("Description:", sym1.description); // "my symbol"

const sym2 = Symbol();
console.log("No description:", sym2.description); // undefined

// NEW WAY (ES10): Comparison
const sym3 = Symbol("test");
console.log("\n--- toString() vs description ---");
console.log("toString():", sym3.toString()); // "Symbol(test)"
console.log("description:", sym3.description); // "test"

// NEW WAY (ES10): Using in debugging
console.log("\n--- Debugging Use ---");

const symbols = [Symbol("user"), Symbol("admin"), Symbol("guest")];

symbols.forEach((sym) => {
  console.log("Symbol description:", sym.description);
});

// NEW WAY (ES10): Well-known symbols
console.log("\n--- Well-known Symbols ---");

console.log("iterator:", Symbol.iterator.description);
console.log("toStringTag:", Symbol.toStringTag.description);
console.log("hasInstance:", Symbol.hasInstance.description);

// NEW WAY (ES10): Practical use - logging
function logSymbol(sym) {
  if (sym.description) {
    console.log(`Symbol: ${sym.description}`);
  } else {
    console.log("Symbol: (no description)");
  }
}

logSymbol(Symbol("test"));
logSymbol(Symbol());

// OLD WAY (ES5-ES9): Parsing toString()
console.log("\n--- Old Way: Parsing toString() ---");

const symOld = Symbol("my symbol");
const strOld = symOld.toString(); // "Symbol(my symbol)"
const descOld = strOld.slice(7, -1); // Extract description
console.log("Old - Extracted description:", descOld);

// OLD WAY: No way to distinguish undefined description vs "undefined" string
const sym4 = Symbol("undefined");
const sym5 = Symbol();
console.log("Old - Both look similar:");
console.log(sym4.toString());
console.log(sym5.toString());

console.log("");

// ============================================
// 8. WELL-FORMED JSON.STRINGIFY()
// ============================================

console.log("=== 8. Well-formed JSON.stringify() ===");

/**
 * PROBLEM: JSON.stringify() could return ill-formed Unicode strings
 * SOLUTION: ES10 ensures well-formed UTF-8 output (escapes lone surrogates)
 */

// NEW WAY (ES10): Well-formed output
console.log("\n--- Well-formed JSON ---");

// Lone surrogates are now escaped
console.log("U+D800:", JSON.stringify("\uD800"));
// "\ud800" (escaped)

console.log("U+DFFF:", JSON.stringify("\uDFFF"));
// "\udfff" (escaped)

// NEW WAY (ES10): Valid surrogate pairs unchanged
console.log("\n--- Valid Pairs ---");

console.log("Emoji:", JSON.stringify("😀")); // "😀" (unchanged)
console.log("Chinese:", JSON.stringify("你好")); // "你好" (unchanged)

// NEW WAY (ES10): Mixed content
const mixed2 = "Hello \uD800 World";
console.log("Mixed:", JSON.stringify(mixed2));

// OLD WAY (ES5-ES9): Could produce ill-formed strings
console.log("\n--- Old Behavior ---");
console.log("Previously, lone surrogates might not be escaped properly");
console.log("This could cause issues when transmitting JSON");

console.log("");

// ============================================
// 9. STABLE ARRAY.PROTOTYPE.SORT()
// ============================================

console.log("=== 9. Stable Array.prototype.sort() ===");

/**
 * PROBLEM: sort() stability was not guaranteed (equal elements might reorder)
 * SOLUTION: ES10 mandates stable sort (equal elements keep relative order)
 */

// NEW WAY (ES10): Stable sorting
console.log("\n--- Stable Sort ---");

const students = [
  { name: "Alice", grade: 90 },
  { name: "Bob", grade: 85 },
  { name: "Charlie", grade: 90 },
  { name: "Diana", grade: 85 },
  { name: "Eve", grade: 90 },
];

const sorted = students.slice().sort((a, b) => b.grade - a.grade);
console.log("Sorted by grade:");
sorted.forEach((s) => console.log(`  ${s.name}: ${s.grade}`));
// Alice, Charlie, and Eve (all 90) maintain their original order

// NEW WAY (ES10): Multi-level sorting
console.log("\n--- Multi-level Sort ---");

const items = [
  { category: "A", name: "Item 3", price: 10 },
  { category: "B", name: "Item 1", price: 20 },
  { category: "A", name: "Item 2", price: 10 },
  { category: "B", name: "Item 4", price: 20 },
];

// Sort by price, items with same price keep original order
const sortedItems = items.slice().sort((a, b) => a.price - b.price);
console.log("Sorted by price:");
sortedItems.forEach((item) => console.log(`  ${item.name}: $${item.price}`));

// NEW WAY (ES10): Preserving order in tie-breaks
const data3 = [
  { id: 1, priority: 2 },
  { id: 2, priority: 1 },
  { id: 3, priority: 2 },
  { id: 4, priority: 1 },
  { id: 5, priority: 2 },
];

const sorted2 = data3.slice().sort((a, b) => a.priority - b.priority);
console.log("\nSorted by priority:");
sorted2.forEach((d) => console.log(`  ID ${d.id}: Priority ${d.priority}`));
// IDs 2,4 come before 1,3,5, but within each priority, original order preserved

// OLD WAY (ES5-ES9): Unstable sort
console.log("\n--- Old Behavior ---");
console.log("Previously, elements with equal sort keys might be reordered");
console.log("Now, stable sort guarantees original order is preserved");

console.log("");

// ============================================
// PRACTICAL EXAMPLES
// ============================================

console.log("=== Practical Examples ===");

// Example 1: Flattening and processing nested data
console.log("\n--- Example 1: Processing Nested Orders ---");

const orders2 = [
  {
    id: 1,
    items: [
      { name: "Apple", qty: 2 },
      { name: "Banana", qty: 3 },
    ],
  },
  { id: 2, items: [{ name: "Orange", qty: 1 }] },
  {
    id: 3,
    items: [
      { name: "Grape", qty: 5 },
      { name: "Melon", qty: 1 },
    ],
  },
];

const allOrderItems = orders2.flatMap((order) => order.items);
console.log("All items:", allOrderItems);

const itemNames = allOrderItems.map((item) => item.name);
console.log("Item names:", itemNames);

// Example 2: URL query parameters
console.log("\n--- Example 2: Query Parameters ---");

function parseQueryString(url) {
  const params = new URLSearchParams(url.split("?")[1]);
  return Object.fromEntries(params);
}

const url2 = "https://example.com?name=John&age=30&city=NYC";
const queryParams = parseQueryString(url2);
console.log("Parsed params:", queryParams);

// Example 3: Data transformation pipeline
console.log("\n--- Example 3: Transform Pipeline ---");

const products2 = {
  laptop: 999,
  mouse: 25,
  keyboard: 75,
  monitor: 299,
};

// Apply discount and filter
const discounted = Object.fromEntries(
  Object.entries(products2)
    .map(([name, price]) => [name, price * 0.9])
    .filter(([, price]) => price >= 50)
);

console.log("Discounted (≥$50):", discounted);

// Example 4: Text processing
console.log("\n--- Example 4: Text Processing ---");

const textLines = ["   First line   ", "Second line", "   Third line"];

const processed = textLines
  .map((line) => line.trimStart())
  .filter((line) => line.length > 0);

console.log("Processed lines:", processed);

// Example 5: Safe JSON parsing
console.log("\n--- Example 5: Safe JSON Parsing ---");

function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
}

const result2 = safeJsonParse("invalid json", { error: true });
console.log("Safe parse result:", result2);

const result3 = safeJsonParse('{"valid": true}');
console.log("Valid parse:", result3);

// Example 6: Nested array operations
console.log("\n--- Example 6: Nested Comments ---");

const comments = [
  { id: 1, text: "Comment 1", replies: ["Reply 1.1", "Reply 1.2"] },
  { id: 2, text: "Comment 2", replies: ["Reply 2.1"] },
  { id: 3, text: "Comment 3", replies: [] },
];

const allTexts = [
  ...comments.map((c) => c.text),
  ...comments.flatMap((c) => c.replies),
];

console.log("All texts:", allTexts);

// Example 7: Object filtering and transformation
console.log("\n--- Example 7: User Preferences ---");

const userPrefs2 = {
  theme: "dark",
  fontSize: 14,
  notifications: true,
  beta: false,
  experimental: null,
};

// Remove falsy values and transform
const activePrefs = Object.fromEntries(
  Object.entries(userPrefs2)
    .filter(([, value]) => value)
    .map(([key, value]) => [key.toUpperCase(), value])
);

console.log("Active preferences:", activePrefs);

// Example 8: CSV parsing simulation
console.log("\n--- Example 8: CSV Processing ---");

const csvData = `name,age,city
Alice,30,NYC
Bob,25,LA
Charlie,35,Chicago`;

const rows = csvData.split("\n").map((row) => row.trim());
const headers = rows[0].split(",");
const dataRows = rows.slice(1);

const parsedData = dataRows.map((row) => {
  const values = row.split(",");
  return Object.fromEntries(headers.map((header, i) => [header, values[i]]));
});

console.log("Parsed CSV:", parsedData);

// Example 9: Grouping with flatMap
console.log("\n--- Example 9: Tag Grouping ---");

const posts = [
  { title: "Post 1", tags: ["javascript", "web"] },
  { title: "Post 2", tags: ["python", "data"] },
  { title: "Post 3", tags: ["javascript", "node"] },
];

const tagCounts = posts
  .flatMap((post) => post.tags)
  .reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

console.log("Tag counts:", tagCounts);

// Example 10: Matrix flattening
console.log("\n--- Example 10: Matrix Operations ---");

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const flattened = matrix.flat();
console.log("Flattened matrix:", flattened);

const sum = flattened.reduce((a, b) => a + b, 0);
console.log("Sum of all elements:", sum);

console.log("");

// ============================================
// EDGE CASES AND GOTCHAS
// ============================================

console.log("=== Edge Cases and Gotchas ===");

// Gotcha 1: flat() depth default is 1
console.log("\n--- Gotcha 1: flat() depth ---");

const deep = [1, [2, [3, [4]]]];
console.log("flat() default:", deep.flat());
// [1, 2, [3, [4]]] - only one level
console.log("Need Infinity for all:", deep.flat(Infinity));

// Gotcha 2: flatMap() only flattens one level
console.log("\n--- Gotcha 2: flatMap() depth limit ---");

const arr9 = [1, 2, 3];
const result4 = arr9.flatMap((x) => [[x]]);
console.log("flatMap with nested:", result4);
// [[1], [2], [3]] - inner arrays not flattened

// Gotcha 3: flat() removes empty slots but keeps null/undefined
console.log("\n--- Gotcha 3: Empty slots vs null ---");

const arr10 = [1, , 3, null, undefined];
console.log("Original:", arr10);
console.log("After flat():", arr10.flat());
// [1, 3, null, undefined] - hole removed, null/undefined kept

// Gotcha 4: Object.fromEntries() with duplicate keys
console.log("\n--- Gotcha 4: Duplicate keys ---");

const entries2 = [
  ["a", 1],
  ["b", 2],
  ["a", 3],
];
const obj3 = Object.fromEntries(entries2);
console.log("Duplicate keys:", obj3);
// { a: 3, b: 2 } - last value wins

// Gotcha 5: trimStart/trimEnd don't modify original
console.log("\n--- Gotcha 5: Immutability ---");

const str5 = "   hello   ";
const trimmed = str5.trimStart();
console.log("Original:", `"${str5}"`);
console.log("Trimmed:", `"${trimmed}"`);
console.log("Original unchanged:", str5 === "   hello   ");

// Gotcha 6: Symbol.description is a property, not a method
console.log("\n--- Gotcha 6: description property ---");

const sym6 = Symbol("test");
console.log("Property:", sym6.description); // Correct
// console.log("Method:", sym6.description()); // ERROR!

// Gotcha 7: Optional catch binding - can't reference error
console.log("\n--- Gotcha 7: No error reference ---");

try {
  throw new Error("Detailed error message");
} catch {
  // console.log(error.message); // ERROR! No 'error' variable
  console.log("Error occurred but can't access details");
}

// Gotcha 8: flatMap callback receives index and array
console.log("\n--- Gotcha 8: flatMap parameters ---");

const arr11 = ["a", "b", "c"];
arr11.flatMap((item, index, array) => {
  console.log(`Item: ${item}, Index: ${index}, Array length: ${array.length}`);
  return [item, item.toUpperCase()];
});

// Gotcha 9: Object.fromEntries() accepts iterables
console.log("\n--- Gotcha 9: Accepts any iterable ---");

// Works with arrays
const fromArray = Object.fromEntries([["a", 1]]);
console.log("From array:", fromArray);

// Works with Maps
const fromMap2 = Object.fromEntries(new Map([["b", 2]]));
console.log("From Map:", fromMap2);

// Works with custom iterables
const iterable = {
  *[Symbol.iterator]() {
    yield ["c", 3];
    yield ["d", 4];
  },
};
const fromIterable = Object.fromEntries(iterable);
console.log("From iterable:", fromIterable);

// Gotcha 10: Stable sort performance
console.log("\n--- Gotcha 10: Sort stability ---");

const data4 = [
  { name: "A", order: 1 },
  { name: "B", order: 1 },
  { name: "C", order: 1 },
];

const sorted3 = data4.sort((a, b) => a.order - b.order);
console.log("Stable sort preserves order:");
sorted3.forEach((d) => console.log(`  ${d.name}`));
// A, B, C - original order preserved

console.log("");

// ============================================
// PERFORMANCE CONSIDERATIONS
// ============================================

console.log("=== Performance Considerations ===");

console.log("\n--- flat() vs manual flattening ---");
console.log("flat() is optimized but may be slower for small arrays");
console.log("For single-level flattening, consider: [].concat(...arr)");

console.log("\n--- flatMap() vs map().flat() ---");
console.log("flatMap() is faster than map().flat()");
console.log("Only one iteration instead of two");

const perfTest = [1, 2, 3, 4, 5];
console.log("\nTest array:", perfTest);

// Method 1: flatMap (faster)
const result5 = perfTest.flatMap((x) => [x, x * 2]);
console.log("flatMap result:", result5);

// Method 2: map + flat (slower)
const result6 = perfTest.map((x) => [x, x * 2]).flat();
console.log("map + flat result:", result6);

console.log("\n--- Object.fromEntries() considerations ---");
console.log("Good for small to medium objects");
console.log("For large datasets, direct property assignment may be faster");

console.log("\n--- trimStart/trimEnd ---");
console.log("More efficient than regex for simple whitespace removal");
console.log("Use trim() if both ends need trimming");

console.log("");

// ============================================
// BROWSER COMPATIBILITY NOTES
// ============================================

console.log("=== Browser Compatibility ===");

console.log("\nArray.prototype.flat() / flatMap():");
console.log("- Chrome: 69+");
console.log("- Firefox: 62+");
console.log("- Safari: 12+");
console.log("- Edge: 79+");
console.log("- Node.js: 11.0+");

console.log("\nObject.fromEntries():");
console.log("- Chrome: 73+");
console.log("- Firefox: 63+");
console.log("- Safari: 12.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 12.0+");

console.log("\nString.prototype.trimStart() / trimEnd():");
console.log("- Chrome: 66+");
console.log("- Firefox: 61+");
console.log("- Safari: 12+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.0+");

console.log("\nOptional catch binding:");
console.log("- Chrome: 66+");
console.log("- Firefox: 58+");
console.log("- Safari: 11.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.0+");

console.log("\nSymbol.prototype.description:");
console.log("- Chrome: 70+");
console.log("- Firefox: 63+");
console.log("- Safari: 12.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 11.0+");

console.log("\nFunction.prototype.toString() revision:");
console.log("- Chrome: 66+");
console.log("- Firefox: 54+");
console.log("- Safari: 12+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.0+");

console.log("\nWell-formed JSON.stringify():");
console.log("- Chrome: 72+");
console.log("- Firefox: 64+");
console.log("- Safari: 12.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 11.0+");

console.log("\nStable Array.prototype.sort():");
console.log("- Chrome: 70+");
console.log("- Firefox: 3+ (always stable)");
console.log("- Safari: 10.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 12.0+");

console.log(
  "\nPolyfill/Transpiler: Use Babel and core-js for older environments"
);

console.log("");

// ============================================
// POLYFILLS
// ============================================

console.log("=== Polyfills (for older browsers) ===");

// Polyfill for Array.prototype.flat()
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    const flattenDepth = (arr, d) => {
      return d > 0
        ? arr.reduce(
            (acc, val) =>
              acc.concat(Array.isArray(val) ? flattenDepth(val, d - 1) : val),
            []
          )
        : arr.slice();
    };
    return flattenDepth(this, depth);
  };
}

console.log("Array.flat() polyfill added");

// Polyfill for Array.prototype.flatMap()
if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function (callback, thisArg) {
    return this.map(callback, thisArg).flat();
  };
}

console.log("Array.flatMap() polyfill added");

// Polyfill for Object.fromEntries()
if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    const obj = {};
    for (const [key, value] of entries) {
      obj[key] = value;
    }
    return obj;
  };
}

console.log("Object.fromEntries() polyfill added");

// Polyfill for String.prototype.trimStart()
if (!String.prototype.trimStart) {
  String.prototype.trimStart = function () {
    return this.replace(/^\s+/, "");
  };
}

console.log("String.trimStart() polyfill added");

// Polyfill for String.prototype.trimEnd()
if (!String.prototype.trimEnd) {
  String.prototype.trimEnd = function () {
    return this.replace(/\s+$/, "");
  };
}

console.log("String.trimEnd() polyfill added");

// Polyfill for Symbol.prototype.description
if (!Symbol.prototype.hasOwnProperty("description")) {
  Object.defineProperty(Symbol.prototype, "description", {
    configurable: true,
    get: function () {
      const str = this.toString();
      const match = /Symbol\((.*)\)/.exec(str);
      return match ? match[1] : undefined;
    },
  });
}

console.log("Symbol.description polyfill added");

console.log("\nNote: Optional catch binding requires transpilation (Babel)");

console.log("");

// ============================================
// MIGRATION TIPS
// ============================================

console.log("=== Migration Tips from ES9 to ES10 ===");

console.log("\n1. Array Flattening:");
console.log("   Before: Custom flatten functions or lodash");
console.log("   After: Use native flat() and flatMap()");
console.log("   Benefits: Cleaner code, better performance");

console.log("\n2. Array to Object Conversion:");
console.log("   Before: Manual loops or reduce");
console.log("   After: Use Object.fromEntries()");
console.log("   Benefits: More readable, less boilerplate");

console.log("\n3. String Trimming:");
console.log("   Before: Regex or trim() for everything");
console.log("   After: Use trimStart()/trimEnd() when appropriate");
console.log("   Benefits: More semantic, better intent");

console.log("\n4. Error Handling:");
console.log("   Before: catch (e) even when unused");
console.log("   After: catch { } without parameter");
console.log("   Benefits: Cleaner code, less noise");

console.log("\n5. Symbol Debugging:");
console.log("   Before: Parse toString() output");
console.log("   After: Use .description property");
console.log("   Benefits: Direct access, cleaner code");

console.log("\n6. Data Transformation:");
console.log("   Before: Multiple map/filter operations");
console.log("   After: Combine with flatMap when appropriate");
console.log("   Benefits: Better performance, fewer iterations");

console.log("\n7. Object Manipulation:");
console.log("   Before: Complex reduce patterns");
console.log("   After: entries -> transform -> fromEntries");
console.log("   Benefits: More readable pipeline");

console.log("\n8. Sorting:");
console.log("   Before: Manual tie-breaking for stability");
console.log("   After: Rely on stable sort guarantee");
console.log("   Benefits: Simpler code, predictable behavior");

console.log("");

// ============================================
// BEST PRACTICES
// ============================================

console.log("=== Best Practices ===");

console.log("\n1. Choose the right array method:");
console.log("   - flat(): Flatten nested arrays");
console.log("   - flatMap(): Map and flatten in one pass");
console.log("   - map() + flat(): Only when needed for clarity");

console.log("\n2. Object transformations:");
console.log("   - Use Object.entries() -> transform -> Object.fromEntries()");
console.log("   - Clean, functional pipeline approach");
console.log("   - Easy to add filtering, mapping steps");

console.log("\n3. String trimming:");
console.log("   - trimStart(): Remove leading whitespace only");
console.log("   - trimEnd(): Remove trailing whitespace only");
console.log("   - trim(): Remove both (use when both needed)");

console.log("\n4. Error handling:");
console.log("   - Use catch { } when error details not needed");
console.log("   - Use catch (error) when you need to log/handle");
console.log("   - Don't suppress errors silently without good reason");

console.log("\n5. Symbol usage:");
console.log("   - Use .description for debugging/logging");
console.log("   - Don't compare descriptions (compare symbols directly)");
console.log("   - Handle undefined description case");

console.log("\n6. Performance:");
console.log("   - flatMap() is faster than map().flat()");
console.log("   - Consider depth parameter with flat()");
console.log("   - For large datasets, benchmark approaches");

console.log("\n7. Sorting:");
console.log("   - Rely on stable sort for multi-level sorting");
console.log("   - No need for manual index tracking");
console.log("   - Keep comparator functions simple");

console.log("");

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES10 (ES2019) SUMMARY ===");

console.log("\nAll ES10 Features:");
console.log("✓ Array.prototype.flat() - Flatten nested arrays");
console.log("✓ Array.prototype.flatMap() - Map and flatten");
console.log("✓ Object.fromEntries() - Entries to object");
console.log("✓ String.prototype.trimStart() - Trim leading whitespace");
console.log("✓ String.prototype.trimEnd() - Trim trailing whitespace");
console.log("✓ Optional catch binding - catch without parameter");
console.log("✓ Function.toString() revision - Exact source reproduction");
console.log("✓ Symbol.prototype.description - Direct description access");
console.log("✓ Well-formed JSON.stringify() - Proper Unicode handling");
console.log("✓ Stable Array.sort() - Guaranteed sort stability");

console.log("\n=== Key Improvements ===");
console.log("1. Array Operations:");
console.log("   - Easier nested array handling");
console.log("   - More efficient transformations");
console.log("   - Better data structure manipulation");

console.log("\n2. Object Utilities:");
console.log("   - Reverse of Object.entries()");
console.log("   - Functional object transformations");
console.log("   - Map/URLSearchParams to object conversion");

console.log("\n3. String Handling:");
console.log("   - More precise whitespace control");
console.log("   - Better text processing");
console.log("   - Cleaner than regex for simple cases");

console.log("\n4. Developer Experience:");
console.log("   - Less boilerplate code");
console.log("   - More intuitive APIs");
console.log("   - Better debugging capabilities");

console.log("\n=== Practical Impact ===");
console.log("For developers, ES10 meant:");
console.log("1. Simpler nested data manipulation");
console.log("2. More functional programming patterns");
console.log("3. Cleaner error handling");
console.log("4. Better Unicode support");
console.log("5. Predictable sorting behavior");
console.log("6. Less need for utility libraries");

console.log("\n=== Common Use Cases ===");
console.log("- Flattening API responses");
console.log("- Query string parsing");
console.log("- Data transformation pipelines");
console.log("- Text processing and cleanup");
console.log("- Optional feature detection");
console.log("- Multi-level sorting");

console.log("\n=== Adoption Recommendations ===");
console.log("1. Start with flat() and flatMap() for nested arrays");
console.log("2. Replace manual entry loops with fromEntries()");
console.log("3. Use trimStart/End instead of regex where appropriate");
console.log("4. Simplify catch blocks when error not needed");
console.log("5. Rely on stable sort for predictable behavior");

console.log("\n=== ES10 Features Complete ===");
