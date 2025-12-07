/**
 * ECMAScript 11 (ES11 / ES2020) - 2020
 *
 * ES11 introduced powerful features focusing on better null handling,
 * module improvements, and enhanced data types. This release brought
 * some of the most requested features to JavaScript.
 *
 * Key Changes:
 * - Optional Chaining (?.)
 * - Nullish Coalescing Operator (??)
 * - BigInt - Arbitrary precision integers
 * - Promise.allSettled()
 * - globalThis
 * - Dynamic import()
 * - String.prototype.matchAll()
 * - import.meta
 * - for-in mechanics
 * - Module namespace exports
 *
 * Note: ES11 significantly improved handling of null/undefined values.
 */

console.log("=== ECMAScript 11 (ES11 / ES2020) - 2020 ===");
console.log("ES11 introduced game-changing features\n");

// ============================================
// 1. OPTIONAL CHAINING (?.)
// ============================================

console.log("=== 1. Optional Chaining (?.) ===");

/**
 * PROBLEM: Accessing nested properties required verbose null checks
 * SOLUTION: ES11 added ?. operator for safe property access
 */

// NEW WAY (ES11): Optional chaining with objects
console.log("\n--- Basic Optional Chaining ---");

const userProfile = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "NYC",
  },
};

console.log("Name:", userProfile?.name);
console.log("City:", userProfile?.address?.city);
console.log("Zip:", userProfile?.address?.zip); // undefined (safe)

// NEW WAY (ES11): With null/undefined objects
const emptyProfile = null;
console.log("Null access:", emptyProfile?.name); // undefined (no error!)

const undefinedProfile = undefined;
console.log("Undefined access:", undefinedProfile?.name); // undefined

// NEW WAY (ES11): Optional chaining with arrays
console.log("\n--- Optional Chaining with Arrays ---");

const usersList = {
  data: {
    users: ["Alice", "Bob", "Charlie"],
  },
};

console.log("First user:", usersList?.data?.users?.[0]);
console.log("Missing user:", usersList?.data?.admins?.[0]); // undefined

// NEW WAY (ES11): Optional chaining with functions
console.log("\n--- Optional Chaining with Functions ---");

const apiClient = {
  request: {
    get: () => "GET request",
  },
};

console.log("GET:", apiClient?.request?.get?.());
console.log("POST:", apiClient?.request?.post?.()); // undefined

// NEW WAY (ES11): Practical example - API responses
console.log("\n--- API Response Handling ---");

const apiResponse = {
  data: {
    user: {
      profile: {
        avatar: "avatar.jpg",
      },
    },
  },
};

const avatarUrl = apiResponse?.data?.user?.profile?.avatar;
console.log("Avatar URL:", avatarUrl);

const missingData = apiResponse?.data?.posts?.length;
console.log("Posts count:", missingData); // undefined

// NEW WAY (ES11): With computed properties
const propertyName = "address";
console.log("Computed:", userProfile?.[propertyName]?.city);

// NEW WAY (ES11): Combining with destructuring
console.log("\n--- With Destructuring ---");

const blogPost = {
  author: {
    name: "John",
    email: "john@example.com",
  },
};

const authorEmail = blogPost?.author?.email ?? "No email";
console.log("Author email:", authorEmail);

// NEW WAY (ES11): Short-circuiting
console.log("\n--- Short-circuit Behavior ---");

let callCount = 0;
const countingObj = {
  method: () => {
    callCount++;
    return "called";
  },
};

console.log("Exists:", countingObj?.method?.());
console.log("Call count:", callCount); // 1

const nullObj = null;
console.log("Null:", nullObj?.method?.());
console.log("Call count:", callCount); // Still 1 (not called)

// OLD WAY (ES10 and earlier): Manual null checks
console.log("\n--- Old Way: Manual Checks ---");

const userProfileOld = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "NYC",
  },
};

const cityOld =
  userProfileOld && userProfileOld.address && userProfileOld.address.city;
console.log("Old - City:", cityOld);

// OLD WAY: Multiple if statements
let zipOld;
if (userProfileOld && userProfileOld.address && userProfileOld.address.zip) {
  zipOld = userProfileOld.address.zip;
}
console.log("Old - Zip:", zipOld);

// OLD WAY: Try-catch
try {
  const valueOld = emptyProfile.name;
} catch (error) {
  console.log("Old - Error caught:", error.message);
}

console.log("");

// ============================================
// 2. NULLISH COALESCING OPERATOR (??)
// ============================================

console.log("=== 2. Nullish Coalescing Operator (??) ===");

/**
 * PROBLEM: || operator treats 0, '', false as falsy (unwanted in many cases)
 * SOLUTION: ES11 added ?? operator that only checks for null/undefined
 */

// NEW WAY (ES11): Nullish coalescing basics
console.log("\n--- Basic Nullish Coalescing ---");

const configValue1 = null ?? "default";
console.log("Null:", configValue1); // "default"

const configValue2 = undefined ?? "default";
console.log("Undefined:", configValue2); // "default"

const configValue3 = 0 ?? "default";
console.log("Zero:", configValue3); // 0 (not replaced!)

const configValue4 = "" ?? "default";
console.log("Empty string:", configValue4); // "" (not replaced!)

const configValue5 = false ?? "default";
console.log("False:", configValue5); // false (not replaced!)

// NEW WAY (ES11): Comparison with OR operator
console.log("\n--- ?? vs || ---");

const port1 = 0;
console.log("|| with 0:", port1 || 8080); // 8080 (wrong!)
console.log("?? with 0:", port1 ?? 8080); // 0 (correct!)

const username1 = "";
console.log("|| with '':", username1 || "Guest"); // "Guest" (maybe wrong)
console.log("?? with '':", username1 ?? "Guest"); // "" (preserves empty)

const enabled1 = false;
console.log("|| with false:", enabled1 || true); // true (wrong!)
console.log("?? with false:", enabled1 ?? true); // false (correct!)

// NEW WAY (ES11): Practical examples
console.log("\n--- Practical Use Cases ---");

function processOrder(quantity, discount) {
  // 0 is valid quantity, null/undefined is not
  const qty = quantity ?? 1;
  const disc = discount ?? 0;

  console.log(`Quantity: ${qty}, Discount: ${disc}%`);
}

processOrder(0, 0); // Quantity: 0, Discount: 0
processOrder(null, null); // Quantity: 1, Discount: 0

// NEW WAY (ES11): Configuration objects
console.log("\n--- Configuration Defaults ---");

function createServer(options) {
  const config = {
    host: options?.host ?? "localhost",
    port: options?.port ?? 3000,
    debug: options?.debug ?? false,
  };

  console.log("Server config:", config);
}

createServer({ port: 0 }); // port: 0 preserved
createServer({ debug: false }); // debug: false preserved

// NEW WAY (ES11): Chaining with optional chaining
console.log("\n--- Combined with ?. ---");

const settings = {
  theme: {
    color: null,
  },
};

const themeColor = settings?.theme?.color ?? "blue";
console.log("Theme color:", themeColor);

const fontSize = settings?.font?.size ?? 14;
console.log("Font size:", fontSize);

// NEW WAY (ES11): Multiple ?? operators
const value1 = null ?? undefined ?? "fallback";
console.log("Multiple ??:", value1); // "fallback"

const value2 = null ?? 0 ?? "fallback";
console.log("First valid:", value2); // 0

// NEW WAY (ES11): With function returns
function getMaybeNull() {
  return null;
}

function getMaybeZero() {
  return 0;
}

console.log("\n--- Function Returns ---");
console.log("Null return:", getMaybeNull() ?? "default");
console.log("Zero return:", getMaybeZero() ?? "default"); // 0

// OLD WAY (ES10 and earlier): Using || operator
console.log("\n--- Old Way: || Operator Issues ---");

const portOld = 0;
const portFinalOld = portOld || 8080;
console.log("Old - Port (wrong):", portFinalOld); // 8080 (loses 0)

// OLD WAY: Explicit null checks
const usernameOld = "";
const userFinalOld =
  usernameOld !== null && usernameOld !== undefined ? usernameOld : "Guest";
console.log("Old - Username:", userFinalOld);

// OLD WAY: typeof checks
const enabledOld = false;
const enabledFinalOld =
  typeof enabledOld !== "undefined" && enabledOld !== null ? enabledOld : true;
console.log("Old - Enabled:", enabledFinalOld);

console.log("");

// ============================================
// 3. BIGINT
// ============================================

console.log("=== 3. BigInt ===");

/**
 * PROBLEM: Number type limited to ±2^53-1 (safe integer range)
 * SOLUTION: ES11 added BigInt for arbitrary precision integers
 */

// NEW WAY (ES11): Creating BigInts
console.log("\n--- Creating BigInts ---");

const bigInt1 = 9007199254740991n; // Using 'n' suffix
console.log("BigInt literal:", bigInt1);

const bigInt2 = BigInt("9007199254740991");
console.log("BigInt constructor:", bigInt2);

const bigInt3 = BigInt(123);
console.log("From number:", bigInt3);

// NEW WAY (ES11): BigInt operations
console.log("\n--- BigInt Arithmetic ---");

const big1 = 100n;
const big2 = 200n;

console.log("Addition:", big1 + big2); // 300n
console.log("Subtraction:", big2 - big1); // 100n
console.log("Multiplication:", big1 * big2); // 20000n
console.log("Division:", big2 / big1); // 2n (integer division)
console.log("Modulo:", big2 % big1); // 0n
console.log("Exponentiation:", 2n ** 100n); // Very large number

// NEW WAY (ES11): Beyond Number.MAX_SAFE_INTEGER
console.log("\n--- Large Numbers ---");

console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
console.log("Beyond safe range:", Number.MAX_SAFE_INTEGER + 1);
console.log("Beyond safe range:", Number.MAX_SAFE_INTEGER + 2); // Same as above!

const safeBigInt1 = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
const safeBigInt2 = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
console.log("BigInt safe:", safeBigInt1);
console.log("BigInt safe:", safeBigInt2); // Different!

// NEW WAY (ES11): Very large calculations
console.log("\n--- Very Large Calculations ---");

const factorial20 = 2432902008176640000n;
console.log("20! =", factorial20);

const largeProduct = 123456789n * 987654321n;
console.log("Large product:", largeProduct);

// NEW WAY (ES11): Comparison
console.log("\n--- Comparisons ---");

console.log("100n === 100n:", 100n === 100n); // true
console.log("100n == 100:", 100n == 100); // true (loose equality)
console.log("100n === 100:", 100n === 100); // false (strict equality)

console.log("50n < 100n:", 50n < 100n); // true
console.log("50n < 100:", 50n < 100); // true (works across types)

// NEW WAY (ES11): Type checking
console.log("\n--- Type Checking ---");

console.log("typeof 123n:", typeof 123n); // "bigint"
console.log("Is BigInt:", 123n instanceof Object); // false (primitive)

// NEW WAY (ES11): Converting to Number
console.log("\n--- Type Conversion ---");

const bigValue = 123n;
const numValue = Number(bigValue);
console.log("To Number:", numValue, typeof numValue);

// Precision loss warning
const hugeBig = 9007199254740992n;
const hugeNum = Number(hugeBig);
console.log("Huge BigInt:", hugeBig);
console.log("To Number (precision loss):", hugeNum);

// NEW WAY (ES11): BigInt limitations
console.log("\n--- Limitations ---");

// Cannot mix BigInt and Number in arithmetic
try {
  const mixedResult = 10n + 5; // Error!
} catch (error) {
  console.log("Cannot mix:", error.message);
}

// Must convert explicitly
const correctMix = 10n + BigInt(5);
console.log("Correct mixing:", correctMix);

// Cannot use Math methods
try {
  const mathResult = Math.sqrt(100n); // Error!
} catch (error) {
  console.log("No Math methods:", error.message);
}

// NEW WAY (ES11): Practical use - timestamps
console.log("\n--- Practical: High-Precision Timestamps ---");

const microseconds = 1609459200000000n; // Microseconds since epoch
const milliseconds = microseconds / 1000n;
console.log("Microseconds:", microseconds);
console.log("Milliseconds:", milliseconds);

// NEW WAY (ES11): Practical use - IDs
console.log("\n--- Practical: Large IDs ---");

const userId = 9007199254740993n; // Beyond Number range
const orderId = 9007199254740994n;

console.log("User ID:", userId);
console.log("Order ID:", orderId);
console.log("Different:", userId !== orderId); // true

// OLD WAY (ES10 and earlier): Number limitations
console.log("\n--- Old Way: Number Limitations ---");

const maxSafe = Number.MAX_SAFE_INTEGER;
console.log("Old - Max safe:", maxSafe);
console.log("Old - Beyond (wrong):", maxSafe + 1);
console.log("Old - Beyond (wrong):", maxSafe + 2); // Same value!

// OLD WAY: Using strings for large numbers
const largeNumStr = "9007199254740993";
console.log("Old - As string:", largeNumStr);
console.log("Old - Addition impossible without parsing");

// OLD WAY: External libraries
console.log("Old - Required libraries like bignumber.js");

console.log("");

// ============================================
// 4. PROMISE.ALLSETTLED()
// ============================================

console.log("=== 4. Promise.allSettled() ===");

/**
 * PROBLEM: Promise.all() fails fast on first rejection
 * SOLUTION: ES11 added Promise.allSettled() that waits for all promises
 */

// NEW WAY (ES11): Promise.allSettled()
console.log("\n--- Promise.allSettled() ---");

async function demonstrateAllSettled() {
  const promises1 = [
    Promise.resolve("Success 1"),
    Promise.reject("Error 1"),
    Promise.resolve("Success 2"),
    Promise.reject("Error 2"),
  ];

  const results1 = await Promise.allSettled(promises1);
  console.log("All settled results:", results1);

  results1.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`  ${index}: Success -`, result.value);
    } else {
      console.log(`  ${index}: Failed -`, result.reason);
    }
  });
}

demonstrateAllSettled();

// NEW WAY (ES11): Comparison with Promise.all()
console.log("\n--- vs Promise.all() ---");

async function comparePromiseMethods() {
  const promises2 = [
    Promise.resolve("A"),
    Promise.reject("Error"),
    Promise.resolve("B"),
  ];

  // Promise.all() - fails fast
  try {
    const allResults = await Promise.all(promises2);
    console.log("All:", allResults);
  } catch (error) {
    console.log("Promise.all() failed:", error);
  }

  // Promise.allSettled() - waits for all
  const settledResults = await Promise.allSettled(promises2);
  console.log("AllSettled succeeded with:", settledResults.length, "results");
}

comparePromiseMethods();

// NEW WAY (ES11): Practical example - multiple API calls
console.log("\n--- Multiple API Calls ---");

async function fetchMultipleResources() {
  const endpoints = [
    Promise.resolve({ data: "User data" }),
    Promise.reject(new Error("Posts unavailable")),
    Promise.resolve({ data: "Comments data" }),
    Promise.reject(new Error("Likes unavailable")),
  ];

  const results2 = await Promise.allSettled(endpoints);

  const successful = results2.filter((r) => r.status === "fulfilled");
  const failed = results2.filter((r) => r.status === "rejected");

  console.log(`Successful: ${successful.length}, Failed: ${failed.length}`);

  successful.forEach((r) => {
    console.log("  Got:", r.value.data);
  });

  failed.forEach((r) => {
    console.log("  Error:", r.reason.message);
  });
}

fetchMultipleResources();

// NEW WAY (ES11): Processing partial results
console.log("\n--- Partial Results Processing ---");

async function processPartialResults() {
  const tasks = [
    Promise.resolve({ id: 1, status: "complete" }),
    Promise.reject(new Error("Task 2 failed")),
    Promise.resolve({ id: 3, status: "complete" }),
    Promise.resolve({ id: 4, status: "complete" }),
  ];

  const outcomes = await Promise.allSettled(tasks);

  const completed = outcomes
    .filter((o) => o.status === "fulfilled")
    .map((o) => o.value);

  console.log("Completed tasks:", completed);
}

processPartialResults();

// NEW WAY (ES11): Retry failed promises
console.log("\n--- Identifying Failures ---");

async function identifyFailures() {
  const operations = [
    Promise.resolve("OP1 OK"),
    Promise.reject("OP2 FAIL"),
    Promise.resolve("OP3 OK"),
  ];

  const results3 = await Promise.allSettled(operations);

  const failures = results3
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => result.status === "rejected")
    .map(({ index }) => index);

  console.log("Failed operation indices:", failures);
}

identifyFailures();

// OLD WAY (ES10 and earlier): Manual handling
console.log("\n--- Old Way: Manual Handling ---");

async function oldWayAllSettled() {
  const promises3 = [
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve("Success 2"),
  ];

  // Wrap each promise to never reject
  const wrappedPromises = promises3.map((p) =>
    p.then(
      (value) => ({ status: "fulfilled", value }),
      (reason) => ({ status: "rejected", reason })
    )
  );

  const resultsOld = await Promise.all(wrappedPromises);
  console.log("Old - Manual allSettled:", resultsOld);
}

oldWayAllSettled();

console.log("");

// ============================================
// 5. GLOBALTHIS
// ============================================

console.log("=== 5. globalThis ===");

/**
 * PROBLEM: Different global objects in different environments
 * SOLUTION: ES11 added globalThis as universal global object reference
 */

// NEW WAY (ES11): Using globalThis
console.log("\n--- globalThis ---");

console.log("Type:", typeof globalThis); // "object"
console.log("Has setTimeout:", typeof globalThis.setTimeout); // "function"
console.log("Has console:", typeof globalThis.console); // "object"

// NEW WAY (ES11): Setting global variables
globalThis.myGlobalVar = "I'm global!";
console.log("Global var:", globalThis.myGlobalVar);

// NEW WAY (ES11): Works everywhere
console.log("\n--- Universal Access ---");
console.log("In browser: globalThis === window");
console.log("In Node.js: globalThis === global");
console.log("In Web Worker: globalThis === self");

// NEW WAY (ES11): Practical use - polyfills
console.log("\n--- Polyfill Pattern ---");

if (!globalThis.fetch) {
  globalThis.fetch = function () {
    console.log("Polyfilled fetch");
  };
}

// NEW WAY (ES11): Feature detection
if (typeof globalThis.Promise !== "undefined") {
  console.log("Promises available");
}

// OLD WAY (ES10 and earlier): Environment-specific
console.log("\n--- Old Way: Environment Detection ---");

const globalObj = (function () {
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  if (typeof self !== "undefined") return self;
  throw new Error("Unable to locate global object");
})();

console.log("Old - Global object found");

console.log("");

// ============================================
// 6. DYNAMIC IMPORT()
// ============================================

console.log("=== 6. Dynamic import() ===");

/**
 * PROBLEM: Static imports loaded at parse time, no conditional loading
 * SOLUTION: ES11 added dynamic import() function for runtime imports
 */

// NEW WAY (ES11): Dynamic import
console.log("\n--- Dynamic Import ---");

// Note: In real code, this would import actual modules
async function loadModule() {
  try {
    console.log("Before import");

    // Simulating dynamic import
    const module1 = await Promise.resolve({
      default: { hello: "world" },
      namedExport: "value",
    });

    console.log("Module loaded:", module1.default);
    console.log("Named export:", module1.namedExport);
  } catch (error) {
    console.log("Import failed:", error.message);
  }
}

loadModule();

// NEW WAY (ES11): Conditional imports
console.log("\n--- Conditional Loading ---");

async function loadFeature(featureName) {
  if (featureName === "advanced") {
    console.log("Loading advanced features...");
    // const advanced = await import('./advanced.js');
    const advanced = await Promise.resolve({
      default: "Advanced module",
    });
    console.log("Loaded:", advanced.default);
  } else {
    console.log("Using basic features");
  }
}

loadFeature("advanced");

// NEW WAY (ES11): Lazy loading
console.log("\n--- Lazy Loading ---");

async function handleUserAction() {
  console.log("User clicked button");
  console.log("Loading heavy module...");

  // const heavyModule = await import('./heavy-charts.js');
  const heavyModule = await Promise.resolve({
    drawChart: () => "Chart drawn",
  });

  console.log(heavyModule.drawChart());
}

setTimeout(() => handleUserAction(), 100);

// NEW WAY (ES11): Import with expressions
console.log("\n--- Dynamic Path ---");

async function loadLanguage(lang) {
  const modulePath = `./locales/${lang}.js`;
  console.log(`Loading language: ${modulePath}`);

  // Simulated
  const translations = await Promise.resolve({
    default: { greeting: `Hello in ${lang}` },
  });

  console.log(translations.default.greeting);
}

loadLanguage("en");

// OLD WAY (ES10 and earlier): Static imports only
console.log("\n--- Old Way: Static Imports ---");
console.log("// import module from './module.js'; // Top-level only");
console.log("// Cannot conditionally import");
console.log("// Cannot import based on runtime values");
console.log("// All modules loaded upfront");

console.log("");

// ============================================
// 7. STRING.PROTOTYPE.MATCHALL()
// ============================================

console.log("=== 7. String.prototype.matchAll() ===");

/**
 * PROBLEM: Capturing groups in global regex required loops
 * SOLUTION: ES11 added matchAll() for easy iteration over all matches
 */

// NEW WAY (ES11): matchAll() basic usage
console.log("\n--- matchAll() Basics ---");

const textSample = "test1 test2 test3";
const regexPattern = /test(\d)/g;

const matches1 = textSample.matchAll(regexPattern);

for (const match of matches1) {
  console.log(`Match: ${match[0]}, Group: ${match[1]}, Index: ${match.index}`);
}

// NEW WAY (ES11): With named capture groups
console.log("\n--- With Named Groups ---");

const dateText = "2020-05-15 and 2021-06-20";
const datePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;

const dateMatches = dateText.matchAll(datePattern);

for (const match of dateMatches) {
  console.log(`Date: ${match[0]}`);
  console.log(`  Year: ${match.groups.year}`);
  console.log(`  Month: ${match.groups.month}`);
  console.log(`  Day: ${match.groups.day}`);
}

// NEW WAY (ES11): Extract all emails
console.log("\n--- Extract Emails ---");

const emailText = "Contact: john@example.com or jane@example.com";
const emailPattern = /(\w+)@(\w+\.\w+)/g;

const emailMatches = [...emailText.matchAll(emailPattern)];

emailMatches.forEach((match) => {
  console.log(`Email: ${match[0]}, User: ${match[1]}, Domain: ${match[2]}`);
});

// NEW WAY (ES11): Extract hashtags
console.log("\n--- Extract Hashtags ---");

const tweetText = "Love #javascript and #es2020 features! #coding";
const hashtagPattern = /#(\w+)/g;

const hashtags1 = [...tweetText.matchAll(hashtagPattern)].map(
  (match) => match[1]
);

console.log("Hashtags:", hashtags1);

// NEW WAY (ES11): Complex parsing
console.log("\n--- Complex Parsing ---");

const htmlText = '<div id="main"><span class="text">Hello</span></div>';
const tagPattern = /<(\w+)([^>]*)>(.*?)<\/\1>/g;

const tagMatches = [...htmlText.matchAll(tagPattern)];

tagMatches.forEach((match) => {
  console.log(`Tag: ${match[1]}, Attrs: ${match[2]}, Content: ${match[3]}`);
});

// NEW WAY (ES11): Convert to array
const urlText = "Visit https://example.com and https://test.com";
const urlPattern = /https:\/\/(\w+\.\w+)/g;

const urls1 = Array.from(urlText.matchAll(urlPattern), (match) => match[1]);

console.log("Domains:", urls1);

// OLD WAY (ES10 and earlier): Using exec() in loop
console.log("\n--- Old Way: exec() Loop ---");

const textOld = "test1 test2 test3";
const regexOld = /test(\d)/g;

let matchOld;
while ((matchOld = regexOld.exec(textOld)) !== null) {
  console.log(`Old - Match: ${matchOld[0]}, Group: ${matchOld[1]}`);
}

// OLD WAY: Using replace() to extract
const results4 = [];
textOld.replace(regexOld, (match, group1) => {
  results4.push({ match, group1 });
});
console.log("Old - Replace method:", results4);

console.log("");

// ============================================
// 8. IMPORT.META
// ============================================

console.log("=== 8. import.meta ===");

/**
 * PROBLEM: No way to get module metadata
 * SOLUTION: ES11 added import.meta object for module information
 */

// NEW WAY (ES11): import.meta
console.log("\n--- import.meta ---");

// Note: import.meta only works in modules
console.log("import.meta provides module metadata");
console.log("Example: import.meta.url - current module URL");
console.log("Example: import.meta.env - environment variables (some bundlers)");

// Simulated example
const importMetaSim = {
  url: "file:///path/to/module.js",
  resolve: (path) => `resolved: ${path}`,
};

console.log("Module URL:", importMetaSim.url);
console.log("Resolve:", importMetaSim.resolve("./relative.js"));

// NEW WAY (ES11): Use cases
console.log("\n--- Use Cases ---");
console.log("1. Loading assets relative to module");
console.log("2. Feature detection in modules");
console.log("3. Module-specific configuration");
console.log("4. Development vs production checks");

// OLD WAY: No module metadata
console.log("\n--- Old Way ---");
console.log("No standard way to get module metadata");
console.log("Had to use bundler-specific solutions");

console.log("");

// ============================================
// 9. FOR-IN MECHANICS
// ============================================

console.log("=== 9. for-in Mechanics ===");

/**
 * PROBLEM: for-in order was not standardized
 * SOLUTION: ES11 standardized for-in enumeration order
 */

// NEW WAY (ES11): Standardized order
console.log("\n--- Standardized for-in Order ---");

const testObj = {
  c: 3,
  1: "one",
  b: 2,
  0: "zero",
  a: 1,
};

console.log("for-in order (standardized):");
for (const key in testObj) {
  console.log(`  ${key}: ${testObj[key]}`);
}
// Order: integer keys (sorted), then string keys (insertion order)

// NEW WAY (ES11): Predictable behavior
const orderedObj = {};
orderedObj.z = 1;
orderedObj[2] = "two";
orderedObj.a = 2;
orderedObj[1] = "one";

console.log("\nPredictable order:");
for (const key in orderedObj) {
  console.log(`  ${key}`);
}
// Output: 1, 2, z, a

// OLD WAY: Order was implementation-dependent
console.log("\n--- Old Way ---");
console.log("for-in order was not guaranteed");
console.log("Different engines could give different orders");

console.log("");

// ============================================
// 10. MODULE NAMESPACE EXPORTS
// ============================================

console.log("=== 10. Module Namespace Exports ===");

/**
 * PROBLEM: No way to re-export entire namespace with modifications
 * SOLUTION: ES11 added export * as namespace syntax
 */

// NEW WAY (ES11): Namespace exports
console.log("\n--- Namespace Exports ---");

console.log("// export * as utils from './utils.js';");
console.log("// Creates: { utils: { ...all exports } }");

console.log("\nAllows re-exporting with namespace");
console.log("Useful for creating barrel exports");

// Example simulation
const utilsModule = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
};

console.log("Simulated namespace export:", utilsModule);

// OLD WAY: Manual namespace creation
console.log("\n--- Old Way ---");
console.log("// import * as utils from './utils.js';");
console.log("// export { utils };");
console.log("Required two steps instead of one");

console.log("");

// ============================================
// PRACTICAL EXAMPLES
// ============================================

console.log("=== Practical Examples ===");

// Example 1: Safe API data access
console.log("\n--- Example 1: Safe API Access ---");

const apiData = {
  user: {
    profile: {
      name: "Alice",
      settings: {
        notifications: true,
      },
    },
  },
};

const notificationSetting =
  apiData?.user?.profile?.settings?.notifications ?? true;
console.log("Notifications enabled:", notificationSetting);

const theme = apiData?.user?.profile?.settings?.theme ?? "light";
console.log("Theme:", theme);

// Example 2: Configuration with defaults
console.log("\n--- Example 2: Configuration ---");

function createApp(userConfig) {
  const config = {
    port: userConfig?.port ?? 3000,
    host: userConfig?.host ?? "localhost",
    debug: userConfig?.debug ?? false,
    timeout: userConfig?.timeout ?? 30000,
    retries: userConfig?.retries ?? 3,
  };

  console.log("App config:", config);
  return config;
}

createApp({ port: 0, debug: false }); // Preserves 0 and false

// Example 3: Multiple API calls with partial success
console.log("\n--- Example 3: Parallel API Calls ---");

async function loadDashboardData() {
  const apiCalls = [
    Promise.resolve({ type: "users", count: 150 }),
    Promise.reject(new Error("Sales data unavailable")),
    Promise.resolve({ type: "orders", count: 75 }),
    Promise.reject(new Error("Analytics timeout")),
  ];

  const results5 = await Promise.allSettled(apiCalls);

  const available = results5
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);

  const unavailable = results5
    .filter((r) => r.status === "rejected")
    .map((r) => r.reason.message);

  console.log("Available data:", available);
  console.log("Unavailable:", unavailable);
}

loadDashboardData();

// Example 4: Large number calculations
console.log("\n--- Example 4: Financial Calculations ---");

function calculateCompoundInterest(principal, rate, years) {
  const p = BigInt(Math.floor(principal * 100)); // Cents
  const r = BigInt(Math.floor(rate * 100)); // Basis points

  let amount = p;
  for (let i = 0; i < years; i++) {
    amount = (amount * (10000n + r)) / 10000n;
  }

  return Number(amount) / 100; // Back to dollars
}

const investment = calculateCompoundInterest(1000000, 0.05, 20);
console.log("Investment after 20 years:", investment);

// Example 5: Parsing structured text
console.log("\n--- Example 5: Log Parsing ---");

const logFile = `
[2020-01-15 10:30:45] INFO: Server started
[2020-01-15 10:31:12] ERROR: Connection failed
[2020-01-15 10:31:15] WARN: Retrying connection
[2020-01-15 10:31:18] INFO: Connected successfully
`;

const logPattern =
  /\[(?<date>[\d-]+) (?<time>[\d:]+)\] (?<level>\w+): (?<message>.+)/g;
const logEntries = [...logFile.matchAll(logPattern)];

logEntries.forEach((entry) => {
  const { date, time, level, message } = entry.groups;
  console.log(`${date} ${time} [${level}] ${message}`);
});

// Example 6: Safe method invocation
console.log("\n--- Example 6: Safe Method Calls ---");

const calculator = {
  operations: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
  },
};

const addResult = calculator?.operations?.add?.(5, 3);
console.log("Add result:", addResult);

const divideResult =
  calculator?.operations?.divide?.(10, 2) ?? "Operation not available";
console.log("Divide result:", divideResult);

// Example 7: Form validation
console.log("\n--- Example 7: Form Validation ---");

function validateForm(formData) {
  const name = formData?.name?.trim() ?? "";
  const email = formData?.email?.trim() ?? "";
  const age = formData?.age ?? 0;

  const errors = [];

  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (age < 18) errors.push("Must be 18 or older");

  console.log("Validation errors:", errors.length ? errors : "None");
  return errors.length === 0;
}

validateForm({ name: "", email: "test@example.com", age: 0 });
validateForm({ name: "John", email: "john@example.com", age: 25 });

// Example 8: URL parameter extraction
console.log("\n--- Example 8: URL Parameters ---");

const urlString =
  "https://example.com?user=123&action=edit&tab=settings&filter=active";
const paramPattern = /[?&](?<key>\w+)=(?<value>[^&]+)/g;

const params = Object.fromEntries(
  [...urlString.matchAll(paramPattern)].map((m) => [
    m.groups.key,
    m.groups.value,
  ])
);

console.log("URL params:", params);

// Example 9: Batch operations with error tracking
console.log("\n--- Example 9: Batch Processing ---");

async function processBatch(items) {
  const operations = items.map((item) => {
    if (item.id % 2 === 0) {
      return Promise.resolve({ id: item.id, status: "processed" });
    } else {
      return Promise.reject({ id: item.id, error: "Processing failed" });
    }
  });

  const outcomes = await Promise.allSettled(operations);

  const summary = {
    total: items.length,
    successful: outcomes.filter((o) => o.status === "fulfilled").length,
    failed: outcomes.filter((o) => o.status === "rejected").length,
  };

  console.log("Batch summary:", summary);

  return outcomes;
}

processBatch([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

// Example 10: Configuration merging
console.log("\n--- Example 10: Config Merging ---");

function mergeConfig(defaults, user, environment) {
  return {
    database: {
      host:
        environment?.DB_HOST ?? user?.database?.host ?? defaults.database.host,
      port:
        environment?.DB_PORT ?? user?.database?.port ?? defaults.database.port,
      name:
        environment?.DB_NAME ?? user?.database?.name ?? defaults.database.name,
    },
    cache: {
      enabled: user?.cache?.enabled ?? defaults.cache.enabled,
      ttl: user?.cache?.ttl ?? defaults.cache.ttl,
    },
  };
}

const defaultConfig = {
  database: { host: "localhost", port: 5432, name: "myapp" },
  cache: { enabled: true, ttl: 3600 },
};

const userConfig2 = {
  database: { port: 0 },
  cache: { enabled: false },
};

const finalConfig = mergeConfig(defaultConfig, userConfig2, {});
console.log("Merged config:", finalConfig);

console.log("");

// ============================================
// EDGE CASES AND GOTCHAS
// ============================================

console.log("=== Edge Cases and Gotchas ===");

// Gotcha 1: Optional chaining with function calls
console.log("\n--- Gotcha 1: Function Call Shortcut ---");

const obj4 = {
  method: null,
};

const result7 = obj4.method?.(); // undefined, not error
console.log("Null method call:", result7);

// But property access after optional chain still errors
try {
  const val = obj4.method?.().property; // Error if method is not function
} catch (e) {
  console.log("Cannot access property of undefined");
}

// Gotcha 2: Nullish coalescing precedence
console.log("\n--- Gotcha 2: Operator Precedence ---");

// Must use parentheses with || and &&
try {
  // const bad = false || true ?? true; // SyntaxError!
  console.log("Cannot mix ?? with || or && without parentheses");
} catch (e) {
  console.log("Syntax error prevented");
}

const good = (false || true) ?? true;
console.log("With parentheses:", good);

// Gotcha 3: BigInt cannot be JSON serialized
console.log("\n--- Gotcha 3: BigInt JSON ---");

try {
  JSON.stringify({ value: 123n }); // Error!
} catch (error) {
  console.log("Cannot JSON.stringify BigInt:", error.message);
}

// Solution: Convert to string
const serializable = { value: String(123n) };
console.log("As string:", JSON.stringify(serializable));

// Gotcha 4: BigInt division truncates
console.log("\n--- Gotcha 4: BigInt Division ---");

console.log("7n / 2n =", 7n / 2n); // 3n, not 3.5
console.log("Remainder:", 7n % 2n); // 1n

// For decimals, convert to Number
console.log("Decimal:", Number(7n) / Number(2n)); // 3.5

// Gotcha 5: Promise.allSettled always fulfills
console.log("\n--- Gotcha 5: Always Fulfills ---");

async function alwaysFulfills() {
  const promises4 = [
    Promise.reject("Error 1"),
    Promise.reject("Error 2"),
    Promise.reject("Error 3"),
  ];

  try {
    const results6 = await Promise.allSettled(promises4);
    console.log("allSettled fulfilled with:", results6.length, "results");
    console.log("All rejected but allSettled succeeded");
  } catch (error) {
    console.log("This won't run");
  }
}

alwaysFulfills();

// Gotcha 6: Optional chaining doesn't work with write operations
console.log("\n--- Gotcha 6: No Write Operations ---");

const obj5 = {};
// obj5?.prop = "value"; // SyntaxError!
console.log("Cannot use ?. for assignments");

// Gotcha 7: matchAll requires global flag
console.log("\n--- Gotcha 7: matchAll Needs /g ---");

try {
  const text7 = "test test";
  const regex7 = /test/; // No 'g' flag
  const matches2 = text7.matchAll(regex7); // Error!
} catch (error) {
  console.log("matchAll requires /g flag:", error.message);
}

const text8 = "test test";
const regex8 = /test/g; // With 'g' flag
const matches3 = text8.matchAll(regex8); // OK
console.log("With /g flag: works");

// Gotcha 8: Optional chaining with delete
console.log("\n--- Gotcha 8: Delete with ?. ---");

const obj6 = { a: { b: 1 } };
delete obj6?.a?.b; // Works!
console.log("After delete:", obj6);

const obj7 = null;
delete obj7?.a?.b; // No error, returns true
console.log("Delete on null: no error");

// Gotcha 9: Nullish coalescing with false/0/""
console.log("\n--- Gotcha 9: Falsy but Valid ---");

const values = {
  count: 0,
  enabled: false,
  name: "",
};

console.log("Count:", values.count ?? 10); // 0 (preserved)
console.log("Enabled:", values.enabled ?? true); // false (preserved)
console.log("Name:", values.name ?? "Anonymous"); // "" (preserved)

// Use || if you want to replace these
console.log("Count with ||:", values.count || 10); // 10 (replaced)
console.log("Enabled with ||:", values.enabled || true); // true (replaced)
console.log("Name with ||:", values.name || "Anonymous"); // "Anonymous" (replaced)

// Gotcha 10: BigInt comparison with Number
console.log("\n--- Gotcha 10: BigInt Comparisons ---");

console.log("1n == 1:", 1n == 1); // true (loose equality)
console.log("1n === 1:", 1n === 1); // false (strict equality)
console.log("1n < 2:", 1n < 2); // true (comparison works)
console.log("typeof 1n:", typeof 1n); // "bigint"

console.log("");

// ============================================
// PERFORMANCE CONSIDERATIONS
// ============================================

console.log("=== Performance Considerations ===");

console.log("\n--- Optional Chaining ---");
console.log("?. is slightly slower than direct access");
console.log("Use when null/undefined is expected");
console.log("Avoid in hot paths if values guaranteed");

console.log("\n--- Nullish Coalescing ---");
console.log("?? is faster than explicit null checks");
console.log("Prefer over || when 0/false/'' are valid values");

console.log("\n--- BigInt ---");
console.log("Slower than Number for same-magnitude values");
console.log("Use only when precision beyond Number needed");
console.log("Avoid in performance-critical calculations");

console.log("\n--- Promise.allSettled ---");
console.log("Same performance as Promise.all");
console.log("But continues on rejection (doesn't fail fast)");
console.log("Use when you need all results regardless");

console.log("\n--- matchAll ---");
console.log("Returns iterator (lazy evaluation)");
console.log("More memory efficient than storing all matches");
console.log("Convert to array only if needed: [...str.matchAll(re)]");

console.log("");

// ============================================
// BROWSER COMPATIBILITY NOTES
// ============================================

console.log("=== Browser Compatibility ===");

console.log("\nOptional Chaining (?.):");
console.log("- Chrome: 80+");
console.log("- Firefox: 74+");
console.log("- Safari: 13.1+");
console.log("- Edge: 80+");
console.log("- Node.js: 14.0+");

console.log("\nNullish Coalescing (??):");
console.log("- Chrome: 80+");
console.log("- Firefox: 72+");
console.log("- Safari: 13.1+");
console.log("- Edge: 80+");
console.log("- Node.js: 14.0+");

console.log("\nBigInt:");
console.log("- Chrome: 67+");
console.log("- Firefox: 68+");
console.log("- Safari: 14+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.4+");

console.log("\nPromise.allSettled():");
console.log("- Chrome: 76+");
console.log("- Firefox: 71+");
console.log("- Safari: 13+");
console.log("- Edge: 79+");
console.log("- Node.js: 12.9+");

console.log("\nglobalThis:");
console.log("- Chrome: 71+");
console.log("- Firefox: 65+");
console.log("- Safari: 12.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 12.0+");

console.log("\nDynamic import():");
console.log("- Chrome: 63+");
console.log("- Firefox: 67+");
console.log("- Safari: 11.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 13.2+");

console.log("\nString.prototype.matchAll():");
console.log("- Chrome: 73+");
console.log("- Firefox: 67+");
console.log("- Safari: 13+");
console.log("- Edge: 79+");
console.log("- Node.js: 12.0+");

console.log("\nimport.meta:");
console.log("- Chrome: 64+");
console.log("- Firefox: 62+");
console.log("- Safari: 11.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.4+ (with --experimental-modules)");

console.log("\nPolyfill/Transpiler: Use Babel for older environments");

console.log("");

// ============================================
// POLYFILLS
// ============================================

console.log("=== Polyfills (for older browsers) ===");

// Polyfill for Promise.allSettled()
if (!Promise.allSettled) {
  Promise.allSettled = function (promises5) {
    return Promise.all(
      promises5.map((p) =>
        Promise.resolve(p)
          .then((value) => ({ status: "fulfilled", value }))
          .catch((reason) => ({ status: "rejected", reason }))
      )
    );
  };
}

console.log("Promise.allSettled() polyfill added");

// Polyfill for globalThis
if (typeof globalThis === "undefined") {
  (function () {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    } else if (typeof window !== "undefined") {
      window.globalThis = window;
    } else if (typeof global !== "undefined") {
      global.globalThis = global;
    } else {
      this.globalThis = this;
    }
  })();
}

console.log("globalThis polyfill added");

// Polyfill for String.prototype.matchAll()
if (!String.prototype.matchAll) {
  String.prototype.matchAll = function (regexp) {
    if (!regexp.global) {
      throw new TypeError("matchAll requires global flag");
    }

    const matches4 = [];
    let match;
    const regex = new RegExp(regexp);

    while ((match = regex.exec(this)) !== null) {
      matches4.push(match);
    }

    return matches4[Symbol.iterator]();
  };
}

console.log("String.matchAll() polyfill added");

console.log("\nNote: Optional chaining, nullish coalescing, and BigInt");
console.log("require transpilation (Babel) - cannot be polyfilled");

console.log("");

// ============================================
// MIGRATION TIPS
// ============================================

console.log("=== Migration Tips from ES10 to ES11 ===");

console.log("\n1. Replace Nested Checks:");
console.log("   Before: obj && obj.prop && obj.prop.nested");
console.log("   After: obj?.prop?.nested");
console.log("   Benefits: Much cleaner, less repetition");

console.log("\n2. Replace || for Defaults:");
console.log("   Before: value || defaultValue (fails with 0, false, '')");
console.log("   After: value ?? defaultValue");
console.log("   Benefits: Preserves valid falsy values");

console.log("\n3. Handle Large Numbers:");
console.log("   Before: Limited to Number.MAX_SAFE_INTEGER");
console.log("   After: Use BigInt for precision beyond 2^53-1");
console.log("   Benefits: Accurate calculations with huge numbers");

console.log("\n4. Parallel Async Operations:");
console.log("   Before: Promise.all() (fails on first rejection)");
console.log("   After: Promise.allSettled() (waits for all)");
console.log("   Benefits: Handle partial success/failure");

console.log("\n5. Global Object Access:");
console.log("   Before: window/global/self detection");
console.log("   After: globalThis");
console.log("   Benefits: Works everywhere consistently");

console.log("\n6. Module Loading:");
console.log("   Before: Static imports only");
console.log("   After: Dynamic import() for lazy loading");
console.log("   Benefits: Better performance, code splitting");

console.log("\n7. Regex Matching:");
console.log("   Before: exec() loop or replace() hack");
console.log("   After: matchAll()");
console.log("   Benefits: Cleaner iteration, easier capture groups");

console.log("");

// ============================================
// BEST PRACTICES
// ============================================

console.log("=== Best Practices ===");

console.log("\n1. Optional Chaining:");
console.log("   ✓ Use for deeply nested optional properties");
console.log("   ✓ Combine with ?? for default values");
console.log("   ✗ Don't overuse - indicates poor data structure");

console.log("\n2. Nullish Coalescing:");
console.log("   ✓ Use when 0, false, '' are valid values");
console.log("   ✓ Prefer ?? over || for default values");
console.log("   ✗ Don't mix with || or && without parentheses");

console.log("\n3. BigInt:");
console.log("   ✓ Use for IDs beyond safe integer range");
console.log("   ✓ Use for financial calculations requiring precision");
console.log("   ✗ Don't use unnecessarily (slower than Number)");
console.log("   ✗ Remember to convert for JSON");

console.log("\n4. Promise.allSettled:");
console.log("   ✓ Use when all results needed regardless of failures");
console.log("   ✓ Good for batch operations with error tracking");
console.log("   ✗ Use Promise.all if any failure should stop process");

console.log("\n5. Dynamic Import:");
console.log("   ✓ Use for code splitting and lazy loading");
console.log("   ✓ Load feature modules on-demand");
console.log("   ✗ Don't dynamically import core dependencies");

console.log("\n6. matchAll:");
console.log("   ✓ Use with global regex for all matches");
console.log("   ✓ Iterate directly or convert to array as needed");
console.log("   ✗ Remember to use /g flag");

console.log("");

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES11 (ES2020) SUMMARY ===");

console.log("\nAll ES11 Features:");
console.log("✓ Optional Chaining (?.) - Safe property access");
console.log("✓ Nullish Coalescing (??) - Smart default values");
console.log("✓ BigInt - Arbitrary precision integers");
console.log("✓ Promise.allSettled() - Wait for all promises");
console.log("✓ globalThis - Universal global object");
console.log("✓ Dynamic import() - Runtime module loading");
console.log("✓ String.matchAll() - Iterate over regex matches");
console.log("✓ import.meta - Module metadata");
console.log("✓ for-in mechanics - Standardized enumeration");
console.log("✓ Module namespace exports - export * as name");

console.log("\n=== Key Improvements ===");
console.log("1. Null/Undefined Handling:");
console.log("   - Much safer property access");
console.log("   - Better default value handling");
console.log("   - Less defensive code needed");

console.log("\n2. Numeric Precision:");
console.log("   - Support for huge integers");
console.log("   - Accurate calculations beyond Number limits");
console.log("   - Better for IDs, timestamps, crypto");

console.log("\n3. Async Operations:");
console.log("   - Better parallel execution handling");
console.log("   - Partial success scenarios supported");
console.log("   - No more fail-fast when not needed");

console.log("\n4. Module System:");
console.log("   - Dynamic loading capabilities");
console.log("   - Better code splitting");
console.log("   - Runtime module resolution");

console.log("\n=== Practical Impact ===");
console.log("For developers, ES11 meant:");
console.log("1. Dramatically cleaner null handling");
console.log("2. More reliable default values");
console.log("3. Support for very large numbers");
console.log("4. Better async error handling");
console.log("5. Improved performance through lazy loading");
console.log("6. Easier regex operations");

console.log("\n=== Common Use Cases ===");
console.log("- Safe API response handling");
console.log("- Configuration with sensible defaults");
console.log("- Large ID and timestamp handling");
console.log("- Batch operations with error tracking");
console.log("- Lazy loading heavy features");
console.log("- Text parsing and extraction");

console.log("\n=== Adoption Recommendations ===");
console.log("1. Start using ?. immediately for nested access");
console.log("2. Replace || with ?? for default values");
console.log("3. Use BigInt for IDs and large numbers");
console.log("4. Prefer allSettled for independent async operations");
console.log("5. Implement code splitting with dynamic imports");
console.log("6. Use matchAll for complex regex operations");

console.log("\n=== ES11 Features Complete ===");
