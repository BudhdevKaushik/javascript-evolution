/**
 * ECMAScript 2024 (ES15) - 15th Edition
 * Released: June 2024
 *
 * ES2024 introduced features focused on better text processing,
 * promise handling, regular expressions, and data structure improvements.
 *
 * Key Features:
 * - Promise.withResolvers()
 * - Object.groupBy() and Map.groupBy()
 * - Atomics.waitAsync()
 * - String.prototype.isWellFormed() and toWellFormed()
 * - ArrayBuffer transfer and resize
 * - RegExp v flag
 */

console.log("=== ECMAScript 2024 (ES15) - June 2024 ===\n");

// ============================================
// 1. PROMISE.WITHRESOLVERS()
// ============================================

console.log("=== 1. Promise.withResolvers() ===");

/**
 * OLD WAY (Before ES2024): Extract resolve/reject via executor
 *
 * PROBLEM: Need to declare variables outside promise constructor
 * Common pattern but verbose and awkward
 *
 * NEW WAY (ES2024): Promise.withResolvers() returns all three
 */

console.log("--- OLD WAY (Before ES2024) ---");

// Old pattern - declare variables outside
let resolveOld;
let rejectOld;

const promiseOld = new Promise((resolve, reject) => {
  resolveOld = resolve;
  rejectOld = reject;
});

// Now can use resolve/reject externally
setTimeout(() => {
  resolveOld("Success from old way!");
}, 100);

promiseOld.then((result) => {
  console.log("Old way result:", result);
});

// Another old pattern example
function createDeferredOld() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const deferredOld = createDeferredOld();
setTimeout(() => deferredOld.resolve("Deferred old"), 150);
deferredOld.promise.then(console.log);

console.log("\n--- NEW WAY (ES2024) ---");

// Much cleaner with Promise.withResolvers()
const { promise, resolve, reject } = Promise.withResolvers();

setTimeout(() => {
  resolve("Success from ES2024!");
}, 200);

promise.then((result) => {
  console.log("ES2024 result:", result);
});

// Create deferred promise - much cleaner
function createDeferred() {
  return Promise.withResolvers();
}

const deferred = createDeferred();
setTimeout(() => deferred.resolve("Deferred ES2024"), 250);
deferred.promise.then(console.log);

console.log("\n--- Practical Use Cases ---");

// Use case 1: Manual promise control
const { promise: userInput, resolve: submitInput } = Promise.withResolvers();

// Simulate user entering data
setTimeout(() => {
  const input = "User typed: Hello World";
  submitInput(input);
}, 300);

userInput.then((data) => {
  console.log("\nUser input received:", data);
});

// Use case 2: Event-based promise resolution
const { promise: eventPromise, resolve: triggerEvent } =
  Promise.withResolvers();

// Simulate event listener
function onCustomEvent(data) {
  triggerEvent(data);
}

setTimeout(() => {
  onCustomEvent({ type: "click", x: 100, y: 200 });
}, 350);

eventPromise.then((event) => {
  console.log("Event received:", event);
});

// Use case 3: Queue management
class PromiseQueue {
  constructor() {
    this.queue = [];
  }

  add() {
    const { promise, resolve } = Promise.withResolvers();
    this.queue.push({ promise, resolve });
    return promise;
  }

  resolveNext(value) {
    if (this.queue.length > 0) {
      const { resolve } = this.queue.shift();
      resolve(value);
    }
  }
}

const queue = new PromiseQueue();
const task1 = queue.add();
const task2 = queue.add();

task1.then((result) => console.log("\nTask 1:", result));
task2.then((result) => console.log("Task 2:", result));

setTimeout(() => queue.resolveNext("First task complete"), 400);
setTimeout(() => queue.resolveNext("Second task complete"), 450);

// Use case 4: Timeout wrapper
function withTimeout(promise, ms) {
  const { promise: timeoutPromise, reject } = Promise.withResolvers();

  const timeout = setTimeout(() => {
    reject(new Error(`Timeout after ${ms}ms`));
  }, ms);

  promise.then(
    (value) => {
      clearTimeout(timeout);
      return value;
    },
    (error) => {
      clearTimeout(timeout);
      throw error;
    }
  );

  return Promise.race([promise, timeoutPromise]);
}

// Use case 5: Cancel token pattern
class CancelToken {
  constructor() {
    const { promise, resolve } = Promise.withResolvers();
    this.promise = promise;
    this.cancel = resolve;
    this.isCancelled = false;

    promise.then(() => {
      this.isCancelled = true;
    });
  }
}

const token = new CancelToken();

async function cancellableOperation(cancelToken) {
  console.log("\nStarting cancellable operation...");

  await Promise.race([
    new Promise((resolve) => setTimeout(resolve, 1000)),
    cancelToken.promise,
  ]);

  if (cancelToken.isCancelled) {
    console.log("Operation was cancelled!");
    return;
  }

  console.log("Operation completed!");
}

// Cancel after 500ms
setTimeout(() => token.cancel(), 500);

// ============================================
// 2. OBJECT.GROUPBY() AND MAP.GROUPBY()
// ============================================

console.log("\n=== 2. Object.groupBy() and Map.groupBy() ===");

/**
 * OLD WAY (Before ES2024): Manual grouping with reduce or loops
 *
 * PROBLEM: Verbose, error-prone, need to write same logic repeatedly
 *
 * NEW WAY (ES2024): Built-in groupBy methods
 */

console.log("--- OLD WAY (Before ES2024) ---");

const products = [
  { name: "Apple", category: "fruit", price: 1.5 },
  { name: "Banana", category: "fruit", price: 0.8 },
  { name: "Carrot", category: "vegetable", price: 1.2 },
  { name: "Broccoli", category: "vegetable", price: 2.0 },
  { name: "Chicken", category: "meat", price: 5.0 },
];

// Old way - manual reduce
const groupedOld = products.reduce((acc, product) => {
  const category = product.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(product);
  return acc;
}, {});

console.log("Grouped (old way):", groupedOld);

// Old way with Map
const groupedMapOld = products.reduce((acc, product) => {
  const category = product.category;
  if (!acc.has(category)) {
    acc.set(category, []);
  }
  acc.get(category).push(product);
  return acc;
}, new Map());

console.log("\nGrouped Map (old way):", groupedMapOld);

console.log("\n--- NEW WAY (ES2024) ---");

// Object.groupBy() - returns plain object
const groupedByCategory = Object.groupBy(
  products,
  (product) => product.category
);

console.log("Object.groupBy():", groupedByCategory);
console.log("Fruits:", groupedByCategory.fruit);
console.log("Vegetables:", groupedByCategory.vegetable);
console.log("Meat:", groupedByCategory.meat);

// Map.groupBy() - returns Map
const groupedMapNew = Map.groupBy(products, (product) => product.category);

console.log("\nMap.groupBy():", groupedMapNew);
console.log("Fruits from Map:", groupedMapNew.get("fruit"));

// Group by multiple criteria
const groupedByPriceRange = Object.groupBy(products, (product) => {
  if (product.price < 1) return "cheap";
  if (product.price < 3) return "medium";
  return "expensive";
});

console.log("\nGrouped by price range:", groupedByPriceRange);

console.log("\n--- Practical Examples ---");

// Example 1: Group users by age range
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 },
  { name: "Charlie", age: 28 },
  { name: "David", age: 42 },
  { name: "Eve", age: 19 },
];

const groupedByAgeRange = Object.groupBy(users, (user) => {
  if (user.age < 25) return "young";
  if (user.age < 40) return "adult";
  return "senior";
});

console.log("\nUsers by age range:", groupedByAgeRange);

// Example 2: Group by first letter
const names = ["Alice", "Andy", "Bob", "Barbara", "Charlie", "Catherine"];

const groupedByFirstLetter = Object.groupBy(names, (name) => name[0]);

console.log("\nGrouped by first letter:", groupedByFirstLetter);

// Example 3: Group transactions by date
const transactions = [
  { id: 1, date: "2024-01-15", amount: 100 },
  { id: 2, date: "2024-01-15", amount: 50 },
  { id: 3, date: "2024-01-16", amount: 200 },
  { id: 4, date: "2024-01-16", amount: 75 },
  { id: 5, date: "2024-01-17", amount: 150 },
];

const groupedByDate = Object.groupBy(transactions, (t) => t.date);

console.log("\nTransactions by date:", groupedByDate);

// Example 4: Group with complex objects as keys (use Map.groupBy)
const items = [
  { name: "Item1", metadata: { type: "A", priority: 1 } },
  { name: "Item2", metadata: { type: "A", priority: 1 } },
  { name: "Item3", metadata: { type: "B", priority: 2 } },
];

const groupedByMetadata = Map.groupBy(items, (item) =>
  JSON.stringify(item.metadata)
);

console.log("\nGrouped by metadata (Map):", groupedByMetadata);

// Example 5: Count occurrences after grouping
const grades = ["A", "B", "A", "C", "B", "A", "D", "C", "A"];

const groupedGrades = Object.groupBy(grades, (grade) => grade);

const gradeCounts = Object.fromEntries(
  Object.entries(groupedGrades).map(([grade, values]) => [grade, values.length])
);

console.log("\nGrade counts:", gradeCounts);

console.log("\n--- Object.groupBy vs Map.groupBy ---");

console.log("\nUse Object.groupBy() when:");
console.log("- Keys are strings or symbols");
console.log("- Need simple object access");
console.log("- Integrating with existing code expecting objects");

console.log("\nUse Map.groupBy() when:");
console.log("- Keys are complex objects");
console.log("- Need Map methods (has, delete, etc.)");
console.log("- Key order matters");
console.log("- Keys might not be strings");

// Example showing Map advantage with object keys
const objKey1 = { id: 1 };
const objKey2 = { id: 2 };

const data = [
  { key: objKey1, value: "A" },
  { key: objKey1, value: "B" },
  { key: objKey2, value: "C" },
];

const groupedByObject = Map.groupBy(data, (item) => item.key);

console.log("\nGrouped by object key:", groupedByObject);
console.log("Items with objKey1:", groupedByObject.get(objKey1));

// ============================================
// 3. STRING WELLFORMED METHODS
// ============================================

console.log("\n=== 3. String Well-Formed Methods ===");

/**
 * OLD WAY (Before ES2024): No way to check/fix ill-formed strings
 *
 * PROBLEM: Lone surrogates cause issues in encoding
 * No built-in way to detect or fix them
 *
 * NEW WAY (ES2024): isWellFormed() and toWellFormed()
 */

console.log("--- Background: Unicode Surrogates ---");

console.log("Unicode uses surrogate pairs for characters outside BMP");
console.log(
  "Valid pair: High surrogate (0xD800-0xDBFF) + Low surrogate (0xDC00-0xDFFF)"
);
console.log("Lone surrogates (without pair) are ill-formed");

console.log("\n--- OLD WAY (Before ES2024) ---");

// Creating ill-formed strings
const wellFormed = "Hello 😀 World";
const illFormed = "Hello \uD800 World"; // Lone high surrogate

console.log("Well-formed string:", wellFormed);
console.log("Ill-formed string:", illFormed);

// No built-in way to detect
console.log("\nBefore ES2024: No built-in detection method");
console.log("Had to use complex regex or manual checks");

console.log("\n--- NEW WAY (ES2024) ---");

// isWellFormed() - check if string is well-formed
const str1 = "Hello 😀 World";
const str2 = "Hello \uD800 World"; // Lone surrogate
const str3 = "Test \uDC00 String"; // Lone surrogate

console.log("\nString 1 well-formed:", str1.isWellFormed()); // true
console.log("String 2 well-formed:", str2.isWellFormed()); // false
console.log("String 3 well-formed:", str3.isWellFormed()); // false

// toWellFormed() - replace lone surrogates with replacement character
const fixed1 = str2.toWellFormed();
const fixed2 = str3.toWellFormed();

console.log("\nFixed string 2:", fixed1);
console.log("Fixed string 3:", fixed2);

// Replacement character is U+FFFD (�)
console.log("Replacement character code:", fixed1.charCodeAt(6).toString(16));

console.log("\n--- Practical Use Cases ---");

// Use case 1: Safe encoding
function safeEncodeURIComponent(str) {
  // Ensure string is well-formed before encoding
  if (!str.isWellFormed()) {
    str = str.toWellFormed();
  }
  return encodeURIComponent(str);
}

const unsafeStr = "data=\uD800";
console.log("\nSafe encoding:", safeEncodeURIComponent(unsafeStr));

// Use case 2: Validating user input
function validateTextInput(input) {
  if (!input.isWellFormed()) {
    console.log("Warning: Input contains ill-formed characters");
    return input.toWellFormed();
  }
  return input;
}

const userInput2 = "User text \uD800 more text";
const validated = validateTextInput(userInput2);
console.log("\nValidated input:", validated);

// Use case 3: Safe database storage
function sanitizeForStorage(text) {
  if (!text.isWellFormed()) {
    console.log("Sanitizing ill-formed string for storage");
    return text.toWellFormed();
  }
  return text;
}

const dbText = "Some data \uDC00 to store";
const sanitized = sanitizeForStorage(dbText);
console.log("\nSanitized for DB:", sanitized);

// Use case 4: API request validation
function prepareAPIData(data) {
  const prepared = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      prepared[key] = value.isWellFormed() ? value : value.toWellFormed();
    } else {
      prepared[key] = value;
    }
  }
  return prepared;
}

const apiData = {
  name: "John",
  message: "Hello \uD800 World",
  count: 5,
};

const preparedData = prepareAPIData(apiData);
console.log("\nPrepared API data:", preparedData);

console.log("\n--- Edge Cases ---");

// Empty string is well-formed
console.log("\nEmpty string:", "".isWellFormed()); // true

// Normal ASCII is well-formed
console.log("ASCII string:", "Hello World".isWellFormed()); // true

// Valid emoji is well-formed
console.log("Emoji string:", "😀🎉🚀".isWellFormed()); // true

// Multiple lone surrogates
const multiLone = "\uD800\uD800\uDC00";
console.log("\nMulti-lone well-formed:", multiLone.isWellFormed());
console.log("Multi-lone fixed:", multiLone.toWellFormed());

// Valid surrogate pair is well-formed
const validPair = "\uD83D\uDE00"; // 😀
console.log("\nValid pair well-formed:", validPair.isWellFormed()); // true

// ============================================
// 4. ARRAYBUFFER TRANSFER AND RESIZE
// ============================================

console.log("\n=== 4. ArrayBuffer Transfer and Resize ===");

/**
 * OLD WAY (Before ES2024): Copy data to new buffer
 *
 * PROBLEM: Inefficient copying, cannot resize in place
 *
 * NEW WAY (ES2024): transfer() and resize() methods
 */

console.log("--- OLD WAY (Before ES2024) ---");

// Old way - copy to new buffer
const oldBuffer = new ArrayBuffer(16);
const oldView = new Uint8Array(oldBuffer);
oldView.set([1, 2, 3, 4]);

console.log("Old buffer:", oldView);

// To "transfer", had to create new buffer and copy
const newBuffer = new ArrayBuffer(32);
const newView = new Uint8Array(newBuffer);
newView.set(oldView);

console.log("New buffer (copied):", newView.slice(0, 8));

console.log("\n--- NEW WAY (ES2024) ---");

// ArrayBuffer.transfer() - transfer ownership
const buffer1 = new ArrayBuffer(16);
const view1 = new Uint8Array(buffer1);
view1.set([10, 20, 30, 40]);

console.log("\nOriginal buffer:", view1);
console.log("Original byteLength:", buffer1.byteLength);

// Transfer to new buffer (can change size)
const buffer2 = buffer1.transfer(32);
const view2 = new Uint8Array(buffer2);

console.log("Transferred buffer:", view2.slice(0, 8));
console.log("New byteLength:", buffer2.byteLength);

// Original buffer is now detached
try {
  console.log("Original buffer detached:", buffer1.byteLength);
} catch (e) {
  console.log("Original buffer is detached (cannot access)");
}

console.log("\n--- Resizable ArrayBuffer ---");

// Create resizable ArrayBuffer
const resizable = new ArrayBuffer(16, { maxByteLength: 64 });
const resizableView = new Uint8Array(resizable);
resizableView.set([1, 2, 3, 4]);

console.log("\nInitial size:", resizable.byteLength);
console.log("Max size:", resizable.maxByteLength);
console.log("Is resizable:", resizable.resizable);

// Resize the buffer
resizable.resize(32);
console.log("\nAfter resize:", resizable.byteLength);

const newResizableView = new Uint8Array(resizable);
console.log("Data after resize:", newResizableView.slice(0, 8));

// Resize down
resizable.resize(8);
console.log("\nAfter shrinking:", resizable.byteLength);

console.log("\n--- Practical Use Cases ---");

// Use case 1: Growing buffer
function appendData(buffer, newData) {
  const currentView = new Uint8Array(buffer);
  const currentLength = buffer.byteLength;

  // Transfer to larger buffer
  const newBuffer = buffer.transfer(currentLength + newData.length);
  const newView = new Uint8Array(newBuffer);

  // Append new data
  newView.set(newData, currentLength);

  return newBuffer;
}

let dataBuffer = new ArrayBuffer(4);
let dataView = new Uint8Array(dataBuffer);
dataView.set([1, 2, 3, 4]);

console.log("\nOriginal:", new Uint8Array(dataBuffer));

dataBuffer = appendData(dataBuffer, [5, 6, 7, 8]);
console.log("After append:", new Uint8Array(dataBuffer));

// Use case 2: Dynamic array-like structure
class DynamicBuffer {
  constructor(initialSize = 16, maxSize = 1024) {
    this.buffer = new ArrayBuffer(initialSize, { maxByteLength: maxSize });
    this.length = 0;
  }

  push(value) {
    if (this.length >= this.buffer.byteLength) {
      // Need to grow
      const newSize = Math.min(
        this.buffer.byteLength * 2,
        this.buffer.maxByteLength
      );
      this.buffer.resize(newSize);
    }

    const view = new Uint8Array(this.buffer);
    view[this.length++] = value;
  }

  get(index) {
    if (index >= this.length) return undefined;
    const view = new Uint8Array(this.buffer);
    return view[index];
  }

  getAll() {
    const view = new Uint8Array(this.buffer);
    return Array.from(view.slice(0, this.length));
  }
}

const dynBuffer = new DynamicBuffer(4, 32);
dynBuffer.push(10);
dynBuffer.push(20);
dynBuffer.push(30);
dynBuffer.push(40);
dynBuffer.push(50); // Will trigger resize

console.log("\nDynamic buffer:", dynBuffer.getAll());

console.log("\n--- transferToFixedLength() ---");

// Transfer to fixed-length buffer
const resizableBuffer = new ArrayBuffer(16, { maxByteLength: 64 });
console.log("\nResizable:", resizableBuffer.resizable);

const fixedBuffer = resizableBuffer.transferToFixedLength(16);
console.log("Fixed after transfer:", fixedBuffer.resizable);

// ============================================
// 5. ATOMICS.WAITASYNC()
// ============================================

console.log("\n=== 5. Atomics.waitAsync() ===");

/**
 * OLD WAY: Atomics.wait() blocks thread
 *
 * PROBLEM: Cannot use in main thread, blocks execution
 *
 * NEW WAY (ES2024): Atomics.waitAsync() returns promise
 */

console.log("--- Background ---");
console.log("Atomics are used for synchronization in SharedArrayBuffer");
console.log("Atomics.wait() blocks the thread (not allowed in main thread)");
console.log("Atomics.waitAsync() returns a promise (non-blocking)");

console.log("\n--- Atomics.waitAsync() Example ---");

// Create shared memory
const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

// waitAsync returns object with async property and value/promise
const result = Atomics.waitAsync(sharedArray, 0, 0, 1000);

console.log("\nResult type:", result.async);

if (result.async) {
  result.value.then((status) => {
    console.log("Wait status:", status); // "timed-out" or "ok"
  });
}

// Notify from another context would wake it up
setTimeout(() => {
  Atomics.notify(sharedArray, 0);
  console.log("Notified waiting thread");
}, 500);

console.log("\n--- Use Cases ---");

console.log("\nAtomics.waitAsync() is useful for:");
console.log("- Coordinating Web Workers without blocking");
console.log("- Implementing locks and semaphores");
console.log("- Building concurrent data structures");
console.log("- Synchronization in parallel algorithms");

console.log("\nNote: Mainly used in Worker contexts with SharedArrayBuffer");

// ============================================
// 6. REGEXP V FLAG
// ============================================

console.log("\n=== 6. RegExp 'v' Flag (Set Notation) ===");

/**
 * OLD WAY: Use u flag for unicode
 *
 * PROBLEM: Limited character class operations
 *
 * NEW WAY (ES2024): v flag with set notation and properties
 */

console.log("--- OLD WAY (u flag) ---");

// u flag for unicode
const regexU = /\p{Emoji}/u;
console.log("Emoji test (u flag):", regexU.test("😀"));

// Limited character class operations
const oldPattern = /[a-z0-9_]/;
console.log("Old pattern test:", oldPattern.test("a"));

console.log("\n--- NEW WAY (v flag) ---");

// v flag enables set notation in character classes
const regexV = /[\p{Letter}&&\p{ASCII}]/v;
console.log(
  "\nASCII letters only (v flag):",
  regexV.test("a"),
  regexV.test("é")
);

// Set operations: union, intersection, subtraction
// Intersection: && (characters in both sets)
const lettersAndDigits = /[\p{Letter}&&\p{ASCII}]/v;
console.log("\nIntersection test:", lettersAndDigits.test("a"));

// Subtraction: -- (characters in first but not second)
const lettersNotDigits = /[\p{Letter}--\p{Number}]/v;
console.log(
  "Letters not digits:",
  lettersNotDigits.test("a"),
  lettersNotDigits.test("5")
);

// Unicode property escapes
const emojiPattern = /\p{Emoji}/v;
console.log("\nEmoji test:", emojiPattern.test("🎉"));

// String literals in character classes (v flag feature)
const multiChar = /[\q{abc|def|xyz}]/v;
console.log("\nMulti-char pattern:", multiChar.test("abc"));

console.log("\n--- Set Notation Examples ---");

// Example 1: ASCII letters only
const asciiLetters = /^[\p{Letter}&&\p{ASCII}]+$/v;
console.log("\nASCII letters:");
console.log("  'hello':", asciiLetters.test("hello"));
console.log("  'café':", asciiLetters.test("café"));
console.log("  'こんにちは':", asciiLetters.test("こんにちは"));

// Example 2: Letters excluding certain scripts
const noGreek = /[\p{Letter}--\p{Script=Greek}]/v;
console.log("\nLetters excluding Greek:");
console.log("  'a':", noGreek.test("a"));
console.log("  'α':", noGreek.test("α"));

// Example 3: Specific emoji range
const faces = /[\p{Emoji}&&\p{Emoji_Presentation}]/v;
console.log("\nEmoji faces:");
console.log("  '😀':", faces.test("😀"));
console.log("  'a':", faces.test("a"));

console.log("\n--- Difference: u vs v flags ---");

console.log("\nu flag:");
console.log("- Unicode support");
console.log("- Basic property escapes");
console.log("- Strict mode");

console.log("\nv flag (ES2024):");
console.log("- All u flag features");
console.log("- Set notation (union, intersection, subtraction)");
console.log("- String literals in character classes");
console.log("- More Unicode properties");
console.log("- Better Unicode property handling");

// ============================================
// 7. ARRAYBUFFER.PROTOTYPE.DETACHED
// ============================================

console.log("\n=== 7. ArrayBuffer.prototype.detached ===");

/**
 * NEW IN ES2024: Check if ArrayBuffer is detached
 */

const buffer = new ArrayBuffer(16);
console.log("\nNew buffer detached?", buffer.detached); // false

// Transfer detaches original
const transferred = buffer.transfer(32);
console.log("After transfer, original detached?", buffer.detached); // true
console.log("Transferred buffer detached?", transferred.detached); // false

// ============================================
// 8. ARRAYBUFFER.PROTOTYPE.TRANSFERTOFIXEDLENGTH()
// ============================================

console.log("\n=== 8. ArrayBuffer Transfer Methods ===");

/**
 * NEW IN ES2024: More control over buffer transfers
 */

// Create resizable buffer
const resizableBuffer2 = new ArrayBuffer(16, { maxByteLength: 64 });
console.log("\nResizable:", resizableBuffer2.resizable);
console.log("Max byte length:", resizableBuffer2.maxByteLength);

// Transfer to fixed-length buffer
const fixedTransfer = resizableBuffer2.transferToFixedLength(32);
console.log("\nAfter transferToFixedLength:");
console.log("  Original detached:", resizableBuffer2.detached);
console.log("  New buffer resizable:", fixedTransfer.resizable);
console.log("  New buffer size:", fixedTransfer.byteLength);

// ============================================
// SUMMARY AND COMPARISON
// ============================================

console.log("\n=== ES2024 Summary ===");

console.log("\n📊 New Features:");

console.log("\n1. Promise.withResolvers()");
console.log("   - Cleaner promise creation");
console.log("   - Access resolve/reject externally");
console.log("   - Better for manual promise control");

console.log("\n2. Object.groupBy() / Map.groupBy()");
console.log("   - Built-in array grouping");
console.log("   - No more manual reduce patterns");
console.log("   - Choose Object or Map based on needs");

console.log("\n3. String Well-Formed Methods");
console.log("   - isWellFormed() - detect lone surrogates");
console.log("   - toWellFormed() - fix ill-formed strings");
console.log("   - Safer string handling");

console.log("\n4. ArrayBuffer Improvements");
console.log("   - transfer() - efficient buffer transfer");
console.log("   - resize() - grow/shrink buffers");
console.log("   - detached property - check buffer state");
console.log("   - Resizable ArrayBuffers");

console.log("\n5. Atomics.waitAsync()");
console.log("   - Non-blocking wait");
console.log("   - Returns promise");
console.log("   - Better Worker coordination");

console.log("\n6. RegExp v flag");
console.log("   - Set notation in character classes");
console.log("   - Intersection, subtraction operations");
console.log("   - Better Unicode property support");

console.log("\n🎯 Key Benefits:");
console.log("✓ Easier promise management");
console.log("✓ Built-in grouping operations");
console.log("✓ Better string encoding safety");
console.log("✓ More efficient memory operations");
console.log("✓ Enhanced regex capabilities");
console.log("✓ Better SharedArrayBuffer coordination");
console.log("\n📈 Impact:");
console.log("- Less boilerplate code");
console.log("- Safer string handling");
console.log("- Better performance with buffers");
console.log("- More powerful regex patterns");
console.log("- Improved concurrent programming");
console.log("\n=== ES2024 Features Complete ===");
console.log("ES2024 focused on refinement and developer experience!");

// **Key Features of ES2024 (ES15):**

// 1. **Promise.withResolvers()** - Cleaner way to get promise with resolve/reject
// 2. **Object.groupBy() / Map.groupBy()** - Built-in array grouping
// 3. **String.isWellFormed() / toWellFormed()** - Handle Unicode surrogates safely
// 4. **ArrayBuffer transfer() and resize()** - Efficient buffer operations
// 5. **ArrayBuffer.prototype.detached** - Check if buffer is detached
// 6. **Atomics.waitAsync()** - Non-blocking atomic wait
// 7. **RegExp v flag** - Set notation and enhanced Unicode support in regex

// ES2024 was all about improving existing features and adding practical utilities!
