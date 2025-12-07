/**
 * ECMAScript 2023 (ES14) - 14th Edition
 * Released: June 2023
 *
 * ES2023 introduced several useful features focused on array manipulation,
 * immutability, and developer experience improvements.
 *
 * Key Features:
 * - Array find from last
 * - Hashbang (#!) grammar
 * - Symbols as WeakMap keys
 * - Change Array by copy methods
 */

console.log("=== ECMAScript 2023 (ES14) - June 2023 ===\n");

// ============================================
// 1. ARRAY FINDLAST() AND FINDLASTINDEX()
// ============================================

console.log("=== 1. Array findLast() and findLastIndex() ===");

/**
 * OLD WAY (Before ES2023): Reverse array or use for loop from end
 *
 * PROBLEM: Need to reverse array (inefficient) or write manual loop
 * find() only searches from beginning
 *
 * NEW WAY (ES2023): findLast() and findLastIndex() methods
 */

console.log("--- OLD WAY (Before ES2023) ---");

var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// Find last even number - OLD WAY
// Method 1: Reverse and find (inefficient - creates new array)
var lastEvenReverse = numbers
  .slice()
  .reverse()
  .find(function (num) {
    return num % 2 === 0;
  });
console.log("Last even (reverse method):", lastEvenReverse);

// Method 2: Manual loop from end
var lastEvenManual;
for (var i = numbers.length - 1; i >= 0; i--) {
  if (numbers[i] % 2 === 0) {
    lastEvenManual = numbers[i];
    break;
  }
}
console.log("Last even (manual loop):", lastEvenManual);

// Find last index - OLD WAY
var lastEvenIndexManual;
for (var i = numbers.length - 1; i >= 0; i--) {
  if (numbers[i] % 2 === 0) {
    lastEvenIndexManual = i;
    break;
  }
}
console.log("Last even index (manual):", lastEvenIndexManual);

console.log("\n--- NEW WAY (ES2023) ---");

// findLast() - finds last element matching condition
const nums = [1, 2, 3, 4, 5, 4, 3, 2, 1];

const lastEven = nums.findLast((num) => num % 2 === 0);
console.log("Last even (findLast):", lastEven); // 2

const lastGreaterThan3 = nums.findLast((num) => num > 3);
console.log("Last > 3:", lastGreaterThan3); // 4

// findLastIndex() - finds last index matching condition
const lastEvenIndex = nums.findLastIndex((num) => num % 2 === 0);
console.log("Last even index:", lastEvenIndex); // 7

const lastGreaterThan3Index = nums.findLastIndex((num) => num > 3);
console.log("Last > 3 index:", lastGreaterThan3Index); // 5

// Returns undefined/-1 if not found
const notFound = nums.findLast((num) => num > 10);
const notFoundIndex = nums.findLastIndex((num) => num > 10);
console.log("Not found:", notFound); // undefined
console.log("Not found index:", notFoundIndex); // -1

// Works with objects
const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
  { id: 4, name: "David", active: false },
];

const lastActiveUser = users.findLast((user) => user.active);
console.log("\nLast active user:", lastActiveUser); // Charlie

const lastActiveIndex = users.findLastIndex((user) => user.active);
console.log("Last active index:", lastActiveIndex); // 2

// Practical use case: Finding most recent entry
const logs = [
  { timestamp: 100, level: "info", message: "Started" },
  { timestamp: 200, level: "warning", message: "Low memory" },
  { timestamp: 300, level: "error", message: "Connection failed" },
  { timestamp: 400, level: "info", message: "Retrying" },
  { timestamp: 500, level: "error", message: "Timeout" },
];

const lastError = logs.findLast((log) => log.level === "error");
console.log("\nLast error:", lastError); // Timeout at 500

// ============================================
// 2. HASHBANG (#!) GRAMMAR
// ============================================

console.log("\n=== 2. Hashbang (#!) Grammar ===");

/**
 * OLD WAY (Before ES2023): Hashbang not part of JS specification
 *
 * PROBLEM: Engines had to strip hashbang as non-standard preprocessing
 * Not officially part of language grammar
 *
 * NEW WAY (ES2023): Hashbang is now officially part of JS grammar
 */

console.log("--- What is Hashbang? ---");
console.log("Hashbang (shebang) is used in Unix-like systems");
console.log("to specify which interpreter should execute the file");

console.log("\n--- Before ES2023 ---");
console.log("Engines had special preprocessing to handle hashbang");
console.log("It wasn't officially part of JavaScript grammar");
console.log("Could cause issues with parsers and tools");

console.log("\n--- ES2023 Change ---");
console.log("Hashbang is now officially part of ECMAScript grammar");
console.log("Must be at very first line of file");
console.log("Must start with #!");

console.log("\nExample hashbang lines:");
console.log("#!/usr/bin/env node");
console.log("#!/usr/bin/node");
console.log("#!/usr/bin/env -S node --experimental-modules");

console.log("\nThis file could start with:");
console.log("#!/usr/bin/env node");
console.log("// Then the rest of the code...");

console.log("\nBenefits:");
console.log("- Make JS files directly executable on Unix systems");
console.log("- No need for file extension");
console.log("- Better tooling support");
console.log("- Standardized across all JS environments");

console.log("\nPractical example:");
console.log("File: my-script.js");
console.log("#!/usr/bin/env node");
console.log("console.log('Hello World');");
console.log("\nMake executable: chmod +x my-script.js");
console.log("Run directly: ./my-script.js");

// ============================================
// 3. SYMBOLS AS WEAKMAP KEYS
// ============================================

console.log("\n=== 3. Symbols as WeakMap Keys ===");

/**
 * OLD WAY (Before ES2023): Only objects could be WeakMap keys
 *
 * PROBLEM: Symbols couldn't be used as WeakMap keys
 * Had to use objects even when symbol would be better
 *
 * NEW WAY (ES2023): Symbols can now be WeakMap keys
 */

console.log("--- OLD WAY (Before ES2023) ---");

// Before ES2023: Only objects as keys
const weakMap = new WeakMap();

const objKey = { id: 1 };
weakMap.set(objKey, "value for object");
console.log("Object key works:", weakMap.get(objKey));

// Symbols couldn't be used (would throw error)
const sym = Symbol("test");
try {
  // This would throw in old implementations
  // weakMap.set(sym, "value");
  console.log("Symbols were NOT allowed as WeakMap keys before ES2023");
} catch (e) {
  console.log("Error:", e.message);
}

console.log("\n--- NEW WAY (ES2023) ---");

// Now symbols work as WeakMap keys!
const newWeakMap = new WeakMap();

const symbol1 = Symbol("key1");
const symbol2 = Symbol("key2");
const obj = { name: "test" };

// Both symbols and objects work
newWeakMap.set(symbol1, "value for symbol1");
newWeakMap.set(symbol2, "value for symbol2");
newWeakMap.set(obj, "value for object");

console.log("Symbol key 1:", newWeakMap.get(symbol1));
console.log("Symbol key 2:", newWeakMap.get(symbol2));
console.log("Object key:", newWeakMap.get(obj));

// Check existence
console.log("Has symbol1:", newWeakMap.has(symbol1));
console.log("Has symbol2:", newWeakMap.has(symbol2));

// Delete works
newWeakMap.delete(symbol1);
console.log("After delete:", newWeakMap.has(symbol1));

console.log("\n--- Practical Use Cases ---");

// Use case 1: Private metadata for symbols
const metadataMap = new WeakMap();

function createUniqueId(description) {
  const sym = Symbol(description);
  metadataMap.set(sym, {
    created: new Date(),
    description: description,
  });
  return sym;
}

const id1 = createUniqueId("user-id");
const id2 = createUniqueId("session-id");

console.log("Metadata for id1:", metadataMap.get(id1));
console.log("Metadata for id2:", metadataMap.get(id2));

// Use case 2: Caching with symbol keys
const cache = new WeakMap();

function expensiveOperation(sym) {
  if (cache.has(sym)) {
    console.log("Cache hit!");
    return cache.get(sym);
  }

  console.log("Cache miss, computing...");
  const result = "Expensive result for " + sym.description;
  cache.set(sym, result);
  return result;
}

const key = Symbol("operation");
console.log(expensiveOperation(key)); // Cache miss
console.log(expensiveOperation(key)); // Cache hit

// Important note about well-known symbols
console.log("\n--- Important Notes ---");
console.log("Well-known symbols (Symbol.iterator, etc.) are registered");
console.log("They won't be garbage collected like regular symbols");
console.log(
  "Regular symbols CAN be garbage collected when no longer referenced"
);

// ============================================
// 4. CHANGE ARRAY BY COPY
// ============================================

console.log("\n=== 4. Change Array by Copy ===");

/**
 * OLD WAY (Before ES2023): Mutating methods change original array
 *
 * PROBLEM: sort(), reverse(), splice() modify original array
 * Need to manually copy array first to avoid mutation
 *
 * NEW WAY (ES2023): New immutable versions of mutating methods
 * - toSorted() instead of sort()
 * - toReversed() instead of reverse()
 * - toSpliced() instead of splice()
 * - with() - immutable index replacement
 */

console.log("--- OLD WAY (Before ES2023) ---");

// Mutating methods change original
var originalArray = [3, 1, 4, 1, 5];
console.log("Original:", originalArray);

// sort() mutates
var sortedMutate = originalArray.sort();
console.log("After sort():", originalArray); // Changed!
console.log("sortedMutate:", sortedMutate); // Same reference

// To avoid mutation, need to copy first
var arrayToCopy = [3, 1, 4, 1, 5];
var sortedCopy = arrayToCopy.slice().sort();
console.log("\nOriginal (with copy):", arrayToCopy); // Unchanged
console.log("Sorted copy:", sortedCopy);

// Same issue with reverse()
var toReverse = [1, 2, 3, 4, 5];
toReverse.reverse();
console.log("After reverse():", toReverse); // Mutated!

// Same issue with splice()
var toSplice = [1, 2, 3, 4, 5];
toSplice.splice(2, 1, 99);
console.log("After splice():", toSplice); // Mutated!

console.log("\n--- NEW WAY (ES2023) ---");

// toSorted() - returns new sorted array
const original1 = [3, 1, 4, 1, 5];
const sorted = original1.toSorted();
console.log("Original:", original1); // Unchanged!
console.log("Sorted:", sorted);

// toSorted() with comparator
const numbers2 = [10, 5, 40, 25, 1000, 1];
const sortedDesc = numbers2.toSorted((a, b) => b - a);
console.log("\nNumbers:", numbers2); // Unchanged
console.log("Sorted desc:", sortedDesc);

// toReversed() - returns new reversed array
const original2 = [1, 2, 3, 4, 5];
const reversed = original2.toReversed();
console.log("\nOriginal:", original2); // Unchanged!
console.log("Reversed:", reversed);

// toSpliced() - returns new array with splice changes
const original3 = [1, 2, 3, 4, 5];
const spliced = original3.toSpliced(2, 1, 99);
console.log("\nOriginal:", original3); // Unchanged!
console.log("Spliced:", spliced);

// toSpliced() - remove elements
const arr1 = [1, 2, 3, 4, 5];
const removed = arr1.toSpliced(1, 2); // Remove 2 elements at index 1
console.log("\nOriginal:", arr1);
console.log("After removal:", removed);

// toSpliced() - insert elements
const arr2 = [1, 2, 5];
const inserted = arr2.toSpliced(2, 0, 3, 4); // Insert at index 2
console.log("\nOriginal:", arr2);
console.log("After insertion:", inserted);

// with() - immutable index replacement
const original4 = [1, 2, 3, 4, 5];
const replaced = original4.with(2, 99); // Replace index 2 with 99
console.log("\nOriginal:", original4); // Unchanged!
console.log("Replaced:", replaced);

// with() supports negative indices
const arr3 = [1, 2, 3, 4, 5];
const replacedLast = arr3.with(-1, 99); // Replace last element
const replacedSecondLast = arr3.with(-2, 88);
console.log("\nOriginal:", arr3);
console.log("Replaced last:", replacedLast);
console.log("Replaced second-last:", replacedSecondLast);

console.log("\n--- Comparison: Mutating vs Non-Mutating ---");

const testArray = [3, 1, 4, 1, 5];

console.log("\nMutating methods (change original):");
console.log("sort(), reverse(), splice()");

console.log("\nNon-mutating methods (return new array):");
console.log("toSorted(), toReversed(), toSpliced(), with()");

console.log("\nAlready non-mutating (existed before ES2023):");
console.log("map(), filter(), slice(), concat()");

console.log("\n--- Practical Examples ---");

// Example 1: Sorting without mutation
const scores = [85, 92, 78, 95, 88];
const topScores = scores.toSorted((a, b) => b - a).slice(0, 3);
console.log("\nOriginal scores:", scores);
console.log("Top 3 scores:", topScores);

// Example 2: Chaining immutable operations
const data = [5, 2, 8, 1, 9];
const result = data.toSorted().toReversed().with(0, 100);
console.log("\nOriginal data:", data);
console.log("Processed:", result);

// Example 3: State management (React-like)
const state = {
  items: [1, 2, 3, 4, 5],
};

// Update state immutably
const newState = {
  items: state.items.with(2, 99),
};

console.log("\nOld state:", state.items);
console.log("New state:", newState.items);

// Example 4: Removing item immutably
const todos = ["Task 1", "Task 2", "Task 3", "Task 4"];
const todosAfterRemoval = todos.toSpliced(1, 1); // Remove "Task 2"
console.log("\nOriginal todos:", todos);
console.log("After removal:", todosAfterRemoval);

// Example 5: Inserting item immutably
const list = ["A", "B", "D"];
const listWithC = list.toSpliced(2, 0, "C"); // Insert "C" at index 2
console.log("\nOriginal list:", list);
console.log("With C inserted:", listWithC);

console.log("\n--- Error Cases ---");

// with() throws on invalid index
try {
  const arr = [1, 2, 3];
  const invalid = arr.with(10, 99); // Index out of bounds
} catch (e) {
  console.log("with() error:", e.message);
}

// with() throws on non-integer index
try {
  const arr = [1, 2, 3];
  const invalid = arr.with(1.5, 99);
} catch (e) {
  console.log("with() non-integer error:", e.message);
}

console.log("\n--- Performance Considerations ---");
console.log("Non-mutating methods create new arrays");
console.log("For large arrays, this means:");
console.log("- Additional memory allocation");
console.log("- Copying overhead");
console.log("- Slightly slower than mutating methods");
console.log("\nBut benefits:");
console.log("- Predictable code");
console.log("- Easier debugging");
console.log("- Better for functional programming");
console.log("- Safer in concurrent scenarios");

// ============================================
// 5. ARRAY METHODS WORK ON TYPED ARRAYS
// ============================================

console.log("\n=== 5. New Methods Work on Typed Arrays ===");

/**
 * ES2023: All new array methods work on Typed Arrays too
 */

// TypedArray support
const uint8 = new Uint8Array([3, 1, 4, 1, 5]);
console.log("Original Uint8Array:", uint8);

const sortedUint8 = uint8.toSorted();
console.log("Sorted:", sortedUint8);

const reversedUint8 = uint8.toReversed();
console.log("Reversed:", reversedUint8);

const lastEvenInTyped = uint8.findLast((n) => n % 2 === 0);
console.log("Last even in TypedArray:", lastEvenInTyped);

// Works with all typed array types
const float32 = new Float32Array([3.14, 2.71, 1.41]);
const sortedFloat = float32.toSorted();
console.log("\nFloat32Array sorted:", sortedFloat);

const withReplaced = float32.with(1, 9.99);
console.log("With replacement:", withReplaced);

// ============================================
// SUMMARY AND COMPARISON
// ============================================

console.log("\n=== ES2023 Summary ===");

console.log("\n📊 New Features:");
console.log("1. Array.findLast() and findLastIndex()");
console.log("   - Search arrays from the end");
console.log("   - More efficient than reversing");
console.log("");
console.log("2. Hashbang (#!) Grammar");
console.log("   - Officially part of JS grammar");
console.log("   - Better tooling support");
console.log("   - Make JS files directly executable");
console.log("");
console.log("3. Symbols as WeakMap Keys");
console.log("   - Symbols now valid WeakMap keys");
console.log("   - Better metadata storage");
console.log("   - More flexible caching");
console.log("");
console.log("4. Change Array by Copy");
console.log("   - toSorted() - immutable sort");
console.log("   - toReversed() - immutable reverse");
console.log("   - toSpliced() - immutable splice");
console.log("   - with() - immutable index replacement");

console.log("\n🎯 Key Benefits:");
console.log("✓ Better immutability support");
console.log("✓ Safer array operations");
console.log("✓ Easier functional programming");
console.log("✓ More predictable code");
console.log("✓ Better debugging experience");

console.log("\n📈 Impact:");
console.log("- Reduces bugs from accidental mutations");
console.log("- Cleaner code in React/Vue/Angular");
console.log("- Better state management");
console.log("- More efficient reverse searching");
console.log("- Improved developer experience");

console.log("\n=== ES2023 Features Complete ===");
console.log("ES2023 focused on array improvements and immutability!");
