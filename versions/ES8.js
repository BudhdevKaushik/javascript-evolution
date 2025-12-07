/**
 * ECMAScript 8 (ES8 / ES2017) - 2017
 *
 * ES8 continued the yearly release cycle with significant improvements to
 * asynchronous programming and object manipulation. This release focused on
 * making JavaScript more powerful for real-world applications.
 *
 * Key Changes:
 * - Async/Await functions
 * - Object.values() and Object.entries()
 * - Object.getOwnPropertyDescriptors()
 * - String padding: padStart() and padEnd()
 * - Trailing commas in function parameter lists
 * - SharedArrayBuffer and Atomics (advanced concurrency)
 * - Async iteration (for await...of)
 */

console.log("=== ECMAScript 8 (ES8 / ES2017) - 2017 ===");
console.log("ES8 introduced 8 major features to JavaScript\n");

// ============================================
// 1. ASYNC/AWAIT
// ============================================

console.log("=== 1. Async/Await ===");

/**
 * PROBLEM: ES6 Promises improved async code but still created callback chains
 *          with .then() which can be hard to read and debug
 * SOLUTION: ES8 async/await makes async code look and behave like synchronous code
 */

// NEW WAY (ES8): Async/await
async function fetchUserData(userId) {
  console.log("Fetching user data...");

  // Simulate API call
  const user = await new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "John Doe" }), 100);
  });

  console.log("User fetched:", user.name);
  return user;
}

// NEW WAY (ES8): Calling async functions
console.log("Starting async operation...");
fetchUserData(1).then((user) => {
  console.log("Operation complete:", user);
});

// NEW WAY (ES8): Multiple awaits
async function getCompleteProfile(userId) {
  console.log("Getting complete profile...");

  const user = await new Promise((resolve) =>
    setTimeout(() => resolve({ id: userId, name: "Alice" }), 50)
  );

  const posts = await new Promise((resolve) =>
    setTimeout(() => resolve([{ title: "Post 1" }, { title: "Post 2" }]), 50)
  );

  const friends = await new Promise((resolve) =>
    setTimeout(() => resolve(["Bob", "Charlie"]), 50)
  );

  return { user, posts, friends };
}

getCompleteProfile(1).then((profile) => {
  console.log("Complete profile:", profile);
});

// NEW WAY (ES8): Error handling with try-catch
async function fetchWithErrorHandling(url) {
  try {
    console.log("Fetching:", url);

    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.includes("valid")) {
          resolve({ data: "Success!" });
        } else {
          reject(new Error("Invalid URL"));
        }
      }, 50);
    });

    console.log("Response:", response.data);
    return response;
  } catch (error) {
    console.error("Error caught:", error.message);
    throw error; // Re-throw if needed
  }
}

fetchWithErrorHandling("valid-url");
fetchWithErrorHandling("invalid-url").catch(() => {
  console.log("Handled in caller");
});

// NEW WAY (ES8): Parallel execution with Promise.all
async function fetchMultipleUsers() {
  console.log("Fetching multiple users in parallel...");

  const [user1, user2, user3] = await Promise.all([
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "User 1" }), 100)
    ),
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "User 2" }), 100)
    ),
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "User 3" }), 100)
    ),
  ]);

  console.log("All users fetched:", user1, user2, user3);
  return [user1, user2, user3];
}

fetchMultipleUsers();

// NEW WAY (ES8): Async arrow functions
const quickFetch = async () => {
  const data = await Promise.resolve("Quick data");
  return data;
};

quickFetch().then((data) => console.log("Arrow async:", data));

// NEW WAY (ES8): Async methods in classes
class DataService {
  async fetchData(id) {
    console.log("Class method fetching:", id);
    const data = await Promise.resolve({ id, value: "data" });
    return data;
  }

  async saveData(data) {
    console.log("Saving:", data);
    await new Promise((resolve) => setTimeout(resolve, 50));
    return { success: true };
  }
}

const service = new DataService();
service.fetchData(100).then((result) => console.log("Class result:", result));

// OLD WAY (ES6): Promise chains
function fetchUserDataOld(userId) {
  console.log("Old way: Fetching user data...");

  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "Jane Doe" }), 100);
  }).then((user) => {
    console.log("Old way: User fetched:", user.name);
    return user;
  });
}

fetchUserDataOld(2).then((user) => {
  console.log("Old way: Operation complete:", user);
});

// OLD WAY (ES6): Nested promises (callback hell)
function getCompleteProfileOld(userId) {
  console.log("Old way: Getting complete profile...");

  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "Bob" }), 50);
  }).then((user) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([{ title: "Post 1" }]), 50);
    }).then((posts) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(["Friend1"]), 50);
      }).then((friends) => {
        return { user, posts, friends };
      });
    });
  });
}

getCompleteProfileOld(2).then((profile) => {
  console.log("Old way: Complete profile:", profile);
});

// OLD WAY (ES6): Error handling with .catch()
function fetchWithErrorHandlingOld(url) {
  console.log("Old way: Fetching:", url);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes("valid")) {
        resolve({ data: "Success!" });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 50);
  })
    .then((response) => {
      console.log("Old way: Response:", response.data);
      return response;
    })
    .catch((error) => {
      console.error("Old way: Error caught:", error.message);
      throw error;
    });
}

console.log("");

// ============================================
// 2. OBJECT.VALUES()
// ============================================

console.log("=== 2. Object.values() ===");

/**
 * PROBLEM: ES6 had Object.keys() but no easy way to get just the values
 * SOLUTION: ES8 added Object.values() to extract object values as an array
 */

// NEW WAY (ES8): Object.values()
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

const values = Object.values(person);
console.log("Object.values():", values); // ["Alice", 30, "New York"]

// NEW WAY (ES8): Iterating over values
console.log("Iterating values:");
Object.values(person).forEach((value) => {
  console.log(" -", value);
});

// NEW WAY (ES8): With numbers as keys (returns in numeric order)
const scores = {
  100: "Alice",
  50: "Bob",
  75: "Charlie",
};
console.log("Object.values(scores):", Object.values(scores)); // Numeric order

// NEW WAY (ES8): Counting values
const inventory = {
  apples: 5,
  bananas: 3,
  oranges: 7,
};
const totalItems = Object.values(inventory).reduce(
  (sum, count) => sum + count,
  0
);
console.log("Total items:", totalItems); // 15

// NEW WAY (ES8): Finding max value
const temperatures = {
  morning: 15,
  afternoon: 25,
  evening: 18,
};
const maxTemp = Math.max(...Object.values(temperatures));
console.log("Max temperature:", maxTemp); // 25

// NEW WAY (ES8): With arrays as values
const groups = {
  admins: ["Alice", "Bob"],
  users: ["Charlie", "David", "Eve"],
  guests: ["Frank"],
};
const allUsers = Object.values(groups).flat();
console.log("All users:", allUsers);

// OLD WAY (ES5/ES6): Manual value extraction
var personOld = {
  name: "Bob",
  age: 25,
  city: "Boston",
};

var valuesOld = Object.keys(personOld).map(function (key) {
  return personOld[key];
});
console.log("Old Object.values():", valuesOld);

// OLD WAY (ES5/ES6): Manual iteration
console.log("Old iteration:");
Object.keys(personOld).forEach(function (key) {
  console.log(" -", personOld[key]);
});

// OLD WAY (ES5/ES6): Manual counting
var inventoryOld = {
  apples: 5,
  bananas: 3,
  oranges: 7,
};
var totalItemsOld = Object.keys(inventoryOld).reduce(function (sum, key) {
  return sum + inventoryOld[key];
}, 0);
console.log("Old total items:", totalItemsOld);

console.log("");

// ============================================
// 3. OBJECT.ENTRIES()
// ============================================

console.log("=== 3. Object.entries() ===");

/**
 * PROBLEM: Getting both keys and values required Object.keys() then accessing values
 * SOLUTION: ES8 added Object.entries() returning [key, value] pairs
 */

// NEW WAY (ES8): Object.entries()
const user = {
  username: "john_doe",
  email: "john@example.com",
  role: "admin",
};

const entries = Object.entries(user);
console.log("Object.entries():", entries);
// [["username", "john_doe"], ["email", "john@example.com"], ["role", "admin"]]

// NEW WAY (ES8): Destructuring in loops
console.log("Entries with destructuring:");
for (const [key, value] of Object.entries(user)) {
  console.log(`  ${key}: ${value}`);
}

// NEW WAY (ES8): Converting object to Map
const userMap = new Map(Object.entries(user));
console.log("Converted to Map:", userMap);
console.log("Map.get('username'):", userMap.get("username"));

// NEW WAY (ES8): Filtering object properties
const settings = {
  theme: "dark",
  notifications: true,
  autoSave: false,
  language: "en",
};

const enabledSettings = Object.entries(settings)
  .filter(([key, value]) => value === true)
  .map(([key]) => key);
console.log("Enabled settings:", enabledSettings);

// NEW WAY (ES8): Transforming objects
const prices = {
  apple: 1.5,
  banana: 0.75,
  orange: 2.0,
};

const discountedPrices = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, price * 0.9])
);
console.log("Discounted prices:", discountedPrices);

// NEW WAY (ES8): Swapping keys and values
const colorCodes = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};

const codeToColor = Object.fromEntries(
  Object.entries(colorCodes).map(([color, code]) => [code, color])
);
console.log("Code to color:", codeToColor);

// NEW WAY (ES8): Sorting object by values
const grades = {
  Alice: 85,
  Bob: 92,
  Charlie: 78,
  David: 95,
};

const sortedGrades = Object.entries(grades)
  .sort(([, a], [, b]) => b - a)
  .map(([name, grade]) => `${name}: ${grade}`);
console.log("Sorted grades:", sortedGrades);

// OLD WAY (ES5/ES6): Manual key-value pairs
var userOld = {
  username: "jane_doe",
  email: "jane@example.com",
  role: "user",
};

var entriesOld = Object.keys(userOld).map(function (key) {
  return [key, userOld[key]];
});
console.log("Old Object.entries():", entriesOld);

// OLD WAY (ES5/ES6): Manual iteration
console.log("Old entries iteration:");
Object.keys(userOld).forEach(function (key) {
  console.log("  " + key + ": " + userOld[key]);
});

// OLD WAY (ES5/ES6): Manual filtering
var settingsOld = {
  theme: "light",
  notifications: true,
  autoSave: false,
};

var enabledSettingsOld = Object.keys(settingsOld).filter(function (key) {
  return settingsOld[key] === true;
});
console.log("Old enabled settings:", enabledSettingsOld);

console.log("");

// ============================================
// 4. OBJECT.GETOWNPROPERTYDESCRIPTORS()
// ============================================

console.log("=== 4. Object.getOwnPropertyDescriptors() ===");

/**
 * PROBLEM: ES5 had getOwnPropertyDescriptor() for single properties only
 * SOLUTION: ES8 added getOwnPropertyDescriptors() for all properties at once
 */

// NEW WAY (ES8): Get all property descriptors
const obj = {
  name: "Test",
  age: 25,
};

Object.defineProperty(obj, "id", {
  value: 123,
  writable: false,
  enumerable: false,
});

const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log("All descriptors:", descriptors);

// NEW WAY (ES8): Shallow cloning with descriptors
const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
console.log("Cloned with descriptors:", clone);
console.log("Clone.id:", clone.id);

// NEW WAY (ES8): Copying getters and setters
const source = {
  _value: 0,
  get value() {
    console.log("Getting value");
    return this._value;
  },
  set value(v) {
    console.log("Setting value to", v);
    this._value = v;
  },
};

const target = Object.create(
  Object.getPrototypeOf(source),
  Object.getOwnPropertyDescriptors(source)
);

target.value = 10; // Calls setter
console.log("Target value:", target.value); // Calls getter

// NEW WAY (ES8): Merging with descriptors preserved
function completeAssign(target, ...sources) {
  sources.forEach((source) => {
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
  });
  return target;
}

const merged = completeAssign({}, source, { extra: "data" });
console.log("Merged object:", merged);

// OLD WAY (ES5): Get descriptors one by one
var objOld = {
  name: "Test",
  age: 25,
};

var descriptorsOld = {};
Object.keys(objOld).forEach(function (key) {
  descriptorsOld[key] = Object.getOwnPropertyDescriptor(objOld, key);
});
console.log("Old descriptors:", descriptorsOld);

// OLD WAY (ES5): Object.assign() doesn't copy descriptors
var sourceOld = {
  get value() {
    return this._value;
  },
};
var targetOld = Object.assign({}, sourceOld);
console.log("Old assign (loses getter):", targetOld);

console.log("");

// ============================================
// 5. STRING PADDING: PADSTART() AND PADEND()
// ============================================

console.log("=== 5. String Padding ===");

/**
 * PROBLEM: ES6 had no built-in way to pad strings to a certain length
 * SOLUTION: ES8 added padStart() and padEnd() for string padding
 */

// NEW WAY (ES8): padStart()
const id = "42";
const paddedId = id.padStart(5, "0");
console.log("padStart:", paddedId); // "00042"

const hour = "9";
const paddedHour = hour.padStart(2, "0");
console.log("Padded hour:", paddedHour); // "09"

// NEW WAY (ES8): padEnd()
const name1 = "Alice";
const paddedName = name1.padEnd(10, ".");
console.log("padEnd:", paddedName); // "Alice....."

const price = "5.9";
const paddedPrice = price.padEnd(5, "0");
console.log("Padded price:", paddedPrice); // "5.900"

// NEW WAY (ES8): Table formatting
console.log("\nFormatted table:");
const products = [
  { name: "Apple", price: 1.5, qty: 10 },
  { name: "Banana", price: 0.75, qty: 25 },
  { name: "Orange", price: 2.0, qty: 15 },
];

products.forEach((p) => {
  const row =
    p.name.padEnd(10) +
    p.price.toFixed(2).padStart(8) +
    p.qty.toString().padStart(8);
  console.log(row);
});

// NEW WAY (ES8): Credit card masking
const cardNumber = "1234567890123456";
const masked = cardNumber.slice(-4).padStart(cardNumber.length, "*");
console.log("Masked card:", masked); // "************3456"

// NEW WAY (ES8): Progress bar
function progressBar(percent) {
  const filled = Math.floor(percent / 10);
  const empty = 10 - filled;
  return "[" + "=".repeat(filled).padEnd(10, " ") + "] " + percent + "%";
}

console.log("Progress:", progressBar(30));
console.log("Progress:", progressBar(70));

// NEW WAY (ES8): Formatting numbers
const numbers2 = [1, 42, 123, 5];
console.log("Aligned numbers:");
numbers2.forEach((num) => {
  console.log(num.toString().padStart(5, " "));
});

// NEW WAY (ES8): Default padding (space)
const text = "Hi";
console.log("Default pad:", text.padStart(5)); // "   Hi"
console.log("Default pad:", text.padEnd(5)); // "Hi   "

// OLD WAY (ES5/ES6): Manual padding
function padStart(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length >= targetLength) return str;
  var pad = padString.repeat(
    Math.ceil((targetLength - str.length) / padString.length)
  );
  return pad.slice(0, targetLength - str.length) + str;
}

var idOld = "42";
var paddedIdOld = padStart(idOld, 5, "0");
console.log("Old padStart:", paddedIdOld);

function padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length >= targetLength) return str;
  var pad = padString.repeat(
    Math.ceil((targetLength - str.length) / padString.length)
  );
  return str + pad.slice(0, targetLength - str.length);
}

var nameOld = "Bob";
var paddedNameOld = padEnd(nameOld, 10, ".");
console.log("Old padEnd:", paddedNameOld);

console.log("");

// ============================================
// 6. TRAILING COMMAS IN FUNCTION PARAMETERS
// ============================================

console.log("=== 6. Trailing Commas in Function Parameters ===");

/**
 * PROBLEM: ES5/ES6 allowed trailing commas in arrays/objects but not in function parameters
 * SOLUTION: ES8 allows trailing commas in function parameters and calls
 */

// NEW WAY (ES8): Trailing comma in function definition
function calculate(
  a,
  b,
  c // Trailing comma is now allowed
) {
  return a + b + c;
}

console.log("Function with trailing comma:", calculate(1, 2, 3));

// NEW WAY (ES8): Trailing comma in function calls
const result = Math.max(
  10,
  20,
  30 // Trailing comma allowed
);
console.log("Call with trailing comma:", result);

// NEW WAY (ES8): Benefits for version control
function createUser(
  name,
  email,
  role
  // Easy to add new parameters without modifying previous line
) {
  return { name, email, role };
}

console.log("User:", createUser("Alice", "alice@test.com", "admin"));

// NEW WAY (ES8): With arrow functions
const sum3 = (x, y, z) => x + y + z;

console.log("Arrow with trailing comma:", sum3(1, 2, 3));

// OLD WAY (ES5/ES6): No trailing comma allowed
function calculateOld(
  a,
  b,
  c // No trailing comma
) {
  return a + b + c;
}

// This would be a syntax error in ES5/ES6:
// function bad(a, b,) { }

console.log("");

// ============================================
// 7. SHAREDARRAYBUFFER AND ATOMICS
// ============================================

console.log("=== 7. SharedArrayBuffer and Atomics ===");

/**
 * PROBLEM: JavaScript lacked low-level concurrency primitives
 * SOLUTION: ES8 added SharedArrayBuffer for shared memory and Atomics for atomic operations
 *
 * Note: SharedArrayBuffer was temporarily disabled in browsers due to Spectre/Meltdown
 * but is now available again with additional security requirements
 */

console.log("SharedArrayBuffer and Atomics enable:");
console.log("- Shared memory between workers");
console.log("- Atomic operations for thread safety");
console.log("- Building concurrent data structures");
console.log("- High-performance parallel computing");

// NEW WAY (ES8): SharedArrayBuffer (when available)
try {
  const sab = new SharedArrayBuffer(1024);
  console.log("SharedArrayBuffer created:", sab.byteLength, "bytes");

  const view = new Int32Array(sab);
  view[0] = 42;
  console.log("Shared value:", view[0]);

  // Atomic operations
  Atomics.add(view, 0, 10);
  console.log("After Atomics.add:", view[0]); // 52

  Atomics.store(view, 1, 100);
  const loaded = Atomics.load(view, 1);
  console.log("Atomics.load:", loaded); // 100

  const exchanged = Atomics.exchange(view, 1, 200);
  console.log("Exchanged:", exchanged, "New value:", view[1]);
} catch (e) {
  console.log(
    "SharedArrayBuffer not available (requires specific security headers)"
  );
}

// NEW WAY (ES8): Atomics methods
console.log("\nAtomic operations available:");
console.log("- Atomics.add() - atomic addition");
console.log("- Atomics.sub() - atomic subtraction");
console.log("- Atomics.and() - atomic AND");
console.log("- Atomics.or() - atomic OR");
console.log("- Atomics.xor() - atomic XOR");
console.log("- Atomics.load() - atomic load");
console.log("- Atomics.store() - atomic store");
console.log("- Atomics.exchange() - atomic exchange");
console.log("- Atomics.compareExchange() - compare and exchange");
console.log("- Atomics.wait() - wait for notification");
console.log("- Atomics.notify() - notify waiters");

// OLD WAY: No shared memory primitives
console.log("\nOld way: Had to use:");
console.log("- postMessage() for worker communication (copying data)");
console.log("- No true shared memory");
console.log("- No atomic operations");

console.log("");

// ============================================
// 8. ASYNC ITERATION (FOR AWAIT...OF)
// ============================================

console.log("=== 8. Async Iteration ===");

/**
 * PROBLEM: for...of doesn't work with async iterators
 * SOLUTION: ES8 added for await...of for async iteration
 */

// NEW WAY (ES8): Async generator
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

// NEW WAY (ES8): for await...of
async function consumeAsyncIterable() {
  console.log("Async iteration:");
  for await (const value of asyncGenerator()) {
    console.log(" - Value:", value);
  }
}

consumeAsyncIterable();

// NEW WAY (ES8): Async iterable from promises
async function* fetchPages(urls) {
  for (const url of urls) {
    const data = await Promise.resolve(`Data from ${url}`);
    yield data;
  }
}

async function processPages() {
  const urls = ["page1", "page2", "page3"];
  console.log("\nFetching pages:");

  for await (const page of fetchPages(urls)) {
    console.log(" -", page);
  }
}

processPages();

// NEW WAY (ES8): Async iterable with error handling
async function* dataStream() {
  yield await Promise.resolve("chunk1");
  yield await Promise.resolve("chunk2");
  throw new Error("Stream error");
}

async function consumeStream() {
  try {
    for await (const chunk of dataStream()) {
      console.log("Chunk:", chunk);
    }
  } catch (error) {
    console.error("Stream error caught:", error.message);
  }
}

setTimeout(() => consumeStream(), 500);

// OLD WAY (ES6): Manual promise iteration
function processPromises(promises) {
  return promises.reduce(function (chain, promise) {
    return chain.then(function () {
      return promise.then(function (value) {
        console.log("Old way value:", value);
      });
    });
  }, Promise.resolve());
}

var promisesOld = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

processPromises(promisesOld);

console.log("");

// ============================================
// PRACTICAL EXAMPLES
// ============================================

console.log("=== Practical Examples ===");

// Example 1: Async/await with real API pattern
console.log("\nExample 1: Data Fetching Pattern");
async function fetchUserProfile(userId) {
  try {
    const user = await Promise.resolve({ id: userId, name: "Alice" });
    const posts = await Promise.resolve([{ id: 1, title: "Hello" }]);
    const comments = await Promise.resolve([{ id: 1, text: "Nice!" }]);

    return {
      user,
      posts,
      comments,
      summary: `${user.name} has ${posts.length} posts and ${comments.length} comments`,
    };
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

fetchUserProfile(1).then((profile) => console.log("Profile:", profile));

// Example 2: Object transformation with entries
console.log("\nExample 2: Configuration Validation");
const config = {
  apiKey: "abc123",
  timeout: 5000,
  retries: 3,
  debug: true,
};

const validatedConfig = Object.fromEntries(
  Object.entries(config)
    .filter(([key, value]) => value !== null && value !== undefined)
    .map(([key, value]) => [key.toUpperCase(), value])
);

console.log("Validated config:", validatedConfig);

// Example 3: String padding for formatting
console.log("\nExample 3: Invoice Formatting");
const invoice = [
  { item: "Widget", qty: 2, price: 15.99 },
  { item: "Gadget", qty: 1, price: 29.99 },
  { item: "Tool", qty: 3, price: 8.5 },
];

console.log("Item".padEnd(15) + "Qty".padStart(5) + "Price".padStart(10));
console.log("-".repeat(30));

invoice.forEach(({ item, qty, price }) => {
  console.log(
    item.padEnd(15) +
      qty.toString().padStart(5) +
      ("$" + price.toFixed(2)).padStart(10)
  );
});

const total = invoice.reduce((sum, item) => sum + item.qty * item.price, 0);
console.log("-".repeat(30));
console.log("Total:".padEnd(20) + ("$" + total.toFixed(2)).padStart(10));

// Example 4: Async iteration for data processing
console.log("\nExample 4: Async Data Processing");
async function* processLargeDataset(data) {
  for (const item of data) {
    // Simulate async processing
    await new Promise((resolve) => setTimeout(resolve, 10));
    yield { processed: true, data: item };
  }
}

async function handleDataset() {
  const dataset = [1, 2, 3, 4, 5];
  const results = [];

  for await (const result of processLargeDataset(dataset)) {
    results.push(result);
  }

  console.log("Processed items:", results.length);
}

handleDataset();

console.log("");

// ============================================
// BROWSER COMPATIBILITY
// ============================================

console.log("=== Browser Compatibility ===");

console.log("\nAsync/Await:");
console.log("- Chrome: 55+");
console.log("- Firefox: 52+");
console.log("- Safari: 10.1+");
console.log("- Edge: 15+");
console.log("- Node.js: 7.6+");

console.log("\nObject.values/entries:");
console.log("- Chrome: 54+");
console.log("- Firefox: 47+");
console.log("- Safari: 10.1+");
console.log("- Edge: 14+");
console.log("- Node.js: 7.0+");

console.log("\nString padding:");
console.log("- Chrome: 57+");
console.log("- Firefox: 48+");
console.log("- Safari: 10+");
console.log("- Edge: 15+");
console.log("- Node.js: 8.0+");

console.log("\nSharedArrayBuffer/Atomics:");
console.log("- Chrome: 68+ (with security headers)");
console.log("- Firefox: 79+ (with security headers)");
console.log("- Safari: 15.2+");
console.log(
  "- Requires: Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers"
);

console.log("");

// ============================================
// POLYFILLS
// ============================================

console.log("=== Polyfills (for older browsers) ===");

// Polyfill for Object.values()
if (!Object.values) {
  Object.values = function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };
}

// Polyfill for Object.entries()
if (!Object.entries) {
  Object.entries = function (obj) {
    return Object.keys(obj).map(function (key) {
      return [key, obj[key]];
    });
  };
}

// Polyfill for String.prototype.padStart()
if (!String.prototype.padStart) {
  String.prototype.padStart = function (targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== "undefined" ? padString : " ");
    if (this.length >= targetLength) {
      return String(this);
    }
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(this);
  };
}

// Polyfill for String.prototype.padEnd()
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function (targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== "undefined" ? padString : " ");
    if (this.length >= targetLength) {
      return String(this);
    }
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return String(this) + padString.slice(0, targetLength);
  };
}

console.log("Polyfills added for legacy browser support");
console.log(
  "Note: Async/await requires transpilation (Babel) for older browsers"
);

console.log("");

// ============================================
// EDGE CASES AND GOTCHAS
// ============================================

console.log("=== Edge Cases and Gotchas ===");

// Gotcha 1: async functions always return promises
console.log("\nGotcha 1: Async functions always return promises");
async function getValue() {
  return 42; // Automatically wrapped in Promise
}
getValue().then((value) => console.log("Async return:", value));

// Gotcha 2: await only works in async functions
console.log("\nGotcha 2: await requires async context");
console.log(
  "// await Promise.resolve(1); // SyntaxError in non-async function!"
);

// Gotcha 3: Object.values() order with numeric keys
console.log("\nGotcha 3: Numeric keys are sorted");
const numericKeys = { 3: "c", 1: "a", 2: "b" };
console.log("Object.values(numericKeys):", Object.values(numericKeys)); // ["a", "b", "c"]

// Gotcha 4: padStart/padEnd with Unicode
console.log("\nGotcha 4: Padding with multi-byte characters");
const emoji = "😀";
console.log("Emoji padded:", emoji.padStart(5, "x")); // May not align perfectly

// Gotcha 5: Async iteration catches errors
console.log("\nGotcha 5: for await...of catches iteration errors");
async function* errorGenerator() {
  yield 1;
  throw new Error("Iteration error");
}

async function catchIterationError() {
  try {
    for await (const value of errorGenerator()) {
      console.log("Value:", value);
    }
  } catch (e) {
    console.log("Caught:", e.message);
  }
}

catchIterationError();

// Gotcha 6: Object.entries() doesn't include prototype
console.log("\nGotcha 6: Only own properties are included");
function Parent() {
  this.inherited = "parent";
}
const child = Object.create(new Parent());
child.own = "child";
console.log("Object.entries(child):", Object.entries(child)); // Only ["own", "child"]

// Gotcha 7: Trailing commas don't work everywhere
console.log("\nGotcha 7: Trailing commas not allowed in:");
console.log("- JSON (always forbidden)");
console.log("- Rest parameters: function(...args,) {} // Error!");

console.log("");

// ============================================
// BEST PRACTICES
// ============================================

console.log("=== Best Practices ===");

console.log("\n1. Async/Await:");
console.log("   ✓ Always use try-catch for error handling");
console.log("   ✓ Use Promise.all() for parallel operations");
console.log("   ✓ Avoid awaiting in loops when parallel execution is possible");
console.log("   ✓ Return promises from async functions explicitly when needed");

console.log("\n2. Object.values/entries:");
console.log("   ✓ Prefer Object.entries() when you need both keys and values");
console.log("   ✓ Use destructuring in loops for cleaner code");
console.log("   ✓ Remember that numeric keys are sorted");
console.log("   ✓ Use with Object.fromEntries() for object transformations");

console.log("\n3. String Padding:");
console.log("   ✓ Use for formatting output, not for data processing");
console.log("   ✓ Consider monospace fonts for aligned text");
console.log("   ✓ Be aware of Unicode characters affecting alignment");
console.log("   ✓ Default padding is space character");

console.log("\n4. Trailing Commas:");
console.log("   ✓ Use them for better version control diffs");
console.log("   ✓ Makes adding/removing parameters easier");
console.log("   ✓ Configure linters to enforce consistency");

console.log("");

// ============================================
// MIGRATION GUIDE
// ============================================

console.log("=== Migration Guide: ES7 to ES8 ===");

console.log("\n1. Upgrade Promise chains to async/await:");
console.log("   Before: fetch().then(r => r.json()).then(data => ...)");
console.log(
  "   After:  const response = await fetch(); const data = await response.json();"
);

console.log("\n2. Replace manual object value extraction:");
console.log("   Before: Object.keys(obj).map(k => obj[k])");
console.log("   After:  Object.values(obj)");

console.log("\n3. Replace manual key-value pair creation:");
console.log("   Before: Object.keys(obj).map(k => [k, obj[k]])");
console.log("   After:  Object.entries(obj)");

console.log("\n4. Replace manual string padding:");
console.log("   Before: '0'.repeat(5 - str.length) + str");
console.log("   After:  str.padStart(5, '0')");

console.log("\n5. Add trailing commas to multi-line parameters:");
console.log("   Improves git diffs and makes refactoring easier");

console.log("");

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES8 SUMMARY ===");
console.log("ES8 (2017) introduced major improvements featuring:");
console.log("✓ Async/Await - Revolutionary async programming syntax");
console.log("✓ Object.values() - Extract object values as array");
console.log("✓ Object.entries() - Get key-value pairs as array");
console.log(
  "✓ Object.getOwnPropertyDescriptors() - Get all property descriptors"
);
console.log("✓ String padding - padStart() and padEnd()");
console.log("✓ Trailing commas - In function parameters and calls");
console.log(
  "✓ SharedArrayBuffer/Atomics - Shared memory and atomic operations"
);
console.log("✓ Async iteration - for await...of loops");

console.log("\n=== Impact on JavaScript Development ===");
console.log("ES8 had a massive impact:");
console.log("1. Async/await became the standard for async code");
console.log("2. Made Promise-based code dramatically more readable");
console.log("3. Object manipulation became much easier");
console.log("4. String formatting improved significantly");
console.log("5. Foundation for concurrent JavaScript (SharedArrayBuffer)");
console.log("6. Enabled modern async patterns and streaming");

console.log("\n=== Practical Impact ===");
console.log("For developers, ES8 meant:");
console.log("1. Cleaner, more maintainable async code");
console.log("2. Easier object transformations and iterations");
console.log("3. Better text formatting capabilities");
console.log("4. Improved data processing patterns");
console.log("5. Better error handling in async operations");
console.log("6. Foundation for reactive programming patterns");
console.log("7. Stepping stone for advanced concurrency");

console.log("\n=== Real-World Usage ===");
console.log("ES8 features are extensively used for:");
console.log("- API calls and data fetching (async/await)");
console.log("- Form data processing (Object.entries)");
console.log("- Configuration management (Object.values/entries)");
console.log("- UI formatting (padStart/padEnd)");
console.log("- Stream processing (async iteration)");
console.log("- Data transformations (Object methods)");
console.log("- Concurrent operations (SharedArrayBuffer in advanced cases)");

console.log("\n=== Adoption Notes ===");
console.log("ES8 adoption was rapid because:");
console.log("- async/await solved a major pain point");
console.log("- Easy to transpile with Babel");
console.log("- Clear, immediate benefits");
console.log("- Good browser support quickly achieved");
console.log("- Minimal breaking changes");
console.log("- Strong developer demand");

console.log("\n=== ES8 Features Complete ===");
