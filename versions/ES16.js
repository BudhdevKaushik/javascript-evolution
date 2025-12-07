/**
 * ECMAScript 2025 (ES16) - 16th Edition
 * Released: June 2025
 *
 * ES2025 introduced features focused on error handling improvements,
 * regular expression enhancements, and Set operations.
 *
 * Key Features:
 * - Error.isError() static method
 * - Promise.try() static method
 * - RegExp duplicate named capture groups
 * - Set methods (union, intersection, difference, etc.)
 * - Set.prototype.isSubsetOf, isSupersetOf, isDisjointFrom
 * - New Set operations for symmetric difference
 */

console.log("=== ECMAScript 2025 (ES16) - June 2025 ===\n");

// ============================================
// 1. ERROR.ISERROR() STATIC METHOD
// ============================================

console.log("=== 1. Error.isError() Static Method ===");

/**
 * OLD WAY (Before ES2025): Check with instanceof or manual checks
 *
 * PROBLEM: instanceof doesn't work across realms (iframes, workers)
 * Hard to reliably detect error objects
 *
 * NEW WAY (ES2025): Error.isError() static method
 */

console.log("--- OLD WAY (Before ES2025) ---");

const err1 = new Error("Something went wrong");
const err2 = new TypeError("Type error");
const notError = { message: "Looks like error but isn't" };

// Old way - instanceof check
console.log("err1 instanceof Error:", err1 instanceof Error);
console.log("err2 instanceof Error:", err2 instanceof Error);
console.log("notError instanceof Error:", notError instanceof Error);

// Problem: doesn't work across realms
console.log(
  "\nProblem: instanceof fails across different realms (iframes, etc.)"
);

// Manual duck typing check
function isErrorOld(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.message === "string" &&
    typeof value.stack === "string"
  );
}

console.log("\nManual check (unreliable):");
console.log("err1:", isErrorOld(err1));
console.log("notError:", isErrorOld(notError));

console.log("\n--- NEW WAY (ES2025) ---");

// Error.isError() - reliable error detection
console.log("Error.isError(err1):", Error.isError(err1));
console.log("Error.isError(err2):", Error.isError(err2));
console.log("Error.isError(notError):", Error.isError(notError));

// Works with all error types
const rangeErr = new RangeError("Out of range");
const syntaxErr = new SyntaxError("Syntax issue");
const customErr = new EvalError("Eval error");

console.log("\nDifferent error types:");
console.log("RangeError:", Error.isError(rangeErr));
console.log("SyntaxError:", Error.isError(syntaxErr));
console.log("EvalError:", Error.isError(customErr));

// Works with custom error classes
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

const custom = new CustomError("Custom error");
console.log("\nCustom error class:", Error.isError(custom));

// False for non-errors
console.log("\nNon-error values:");
console.log("String:", Error.isError("error"));
console.log("Number:", Error.isError(42));
console.log("null:", Error.isError(null));
console.log("undefined:", Error.isError(undefined));
console.log("Object:", Error.isError({}));

console.log("\n--- Practical Use Cases ---");

// Use case 1: Generic error handler
function handleValue(value) {
  if (Error.isError(value)) {
    console.log("Error detected:", value.message);
    console.log("Stack:", value.stack);
  } else {
    console.log("Regular value:", value);
  }
}

handleValue(new Error("Test error"));
handleValue("Just a string");
handleValue({ error: "fake error" });

// Use case 2: Type guard in TypeScript-like code
function processResult(result) {
  if (Error.isError(result)) {
    // Handle error
    return { success: false, error: result.message };
  }
  // Process success result
  return { success: true, data: result };
}

console.log("\nProcess results:");
console.log(processResult(new Error("Failed")));
console.log(processResult({ value: 42 }));

// Use case 3: Logging system
class Logger {
  log(data) {
    if (Error.isError(data)) {
      console.error("ERROR:", data.message);
      console.error("Stack:", data.stack);
    } else {
      console.log("INFO:", data);
    }
  }
}

const logger = new Logger();
logger.log("Application started");
logger.log(new Error("Connection failed"));

// Use case 4: API response validation
function validateAPIResponse(response) {
  if (Error.isError(response)) {
    throw new Error(`API returned error: ${response.message}`);
  }
  return response;
}

// ============================================
// 2. PROMISE.TRY() STATIC METHOD
// ============================================

console.log("\n=== 2. Promise.try() Static Method ===");

/**
 * OLD WAY (Before ES2025): Wrap in Promise constructor or async function
 *
 * PROBLEM: Inconsistent handling of sync/async functions
 * Need different patterns for sync vs async
 *
 * NEW WAY (ES2025): Promise.try() handles both uniformly
 */

console.log("--- OLD WAY (Before ES2025) ---");

// Problem: Sync errors thrown, async errors rejected
function maybeThrows() {
  if (Math.random() > 0.5) {
    throw new Error("Sync error");
  }
  return "Success";
}

async function maybeRejects() {
  if (Math.random() > 0.5) {
    throw new Error("Async error");
  }
  return "Success";
}

// Old way - need different handling
try {
  const syncResult = maybeThrows();
  console.log("Sync result:", syncResult);
} catch (err) {
  console.log("Caught sync error:", err.message);
}

maybeRejects()
  .then((result) => console.log("Async result:", result))
  .catch((err) => console.log("Caught async error:", err.message));

// Old pattern to handle both uniformly
async function oldUnifiedHandler(fn) {
  try {
    return await fn();
  } catch (err) {
    console.log("Error:", err.message);
    throw err;
  }
}

console.log("\n--- NEW WAY (ES2025) ---");

// Promise.try() - uniform handling of sync and async
Promise.try(() => {
  return 42;
}).then((result) => {
  console.log("\nPromise.try result:", result);
});

Promise.try(() => {
  throw new Error("Error from try");
}).catch((err) => {
  console.log("Promise.try error:", err.message);
});

// Works with async functions
Promise.try(async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return "Async result";
}).then((result) => {
  console.log("Async result:", result);
});

// Handles both sync and async errors uniformly
Promise.try(() => {
  if (Math.random() > 1) {
    // Will throw
    throw new Error("Sync error");
  }
  return "Success";
}).catch((err) => {
  console.log("Uniform error handling:", err.message);
});

console.log("\n--- Practical Use Cases ---");

// Use case 1: API wrapper that might throw or reject
function callAPI(endpoint) {
  return Promise.try(() => {
    // Might throw sync error (validation)
    if (!endpoint) {
      throw new Error("Endpoint required");
    }

    // Or return async operation
    return fetch(endpoint);
  });
}

// Use case 2: Safe execution wrapper
function safeExecute(fn, ...args) {
  return Promise.try(() => fn(...args)).catch((err) => {
    console.log("Safe execution caught:", err.message);
    return null; // Default value on error
  });
}

safeExecute(() => {
  throw new Error("Something broke");
}).then((result) => {
  console.log("\nSafe execute result:", result);
});

// Use case 3: Retry logic
async function retry(fn, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await Promise.try(fn);
    } catch (err) {
      if (i === attempts - 1) throw err;
      console.log(`Attempt ${i + 1} failed, retrying...`);
    }
  }
}

// Use case 4: Validation pipeline
function validateAndProcess(data) {
  return Promise.try(() => {
    // Sync validation (might throw)
    if (!data) throw new Error("No data");
    if (typeof data !== "object") throw new Error("Invalid type");

    // Return async processing
    return processData(data);
  });
}

async function processData(data) {
  return { processed: true, data };
}

validateAndProcess({ test: 1 })
  .then((result) => console.log("\nValidated:", result))
  .catch((err) => console.log("Validation error:", err.message));

// ============================================
// 3. REGEXP DUPLICATE NAMED CAPTURE GROUPS
// ============================================

console.log("\n=== 3. RegExp Duplicate Named Capture Groups ===");

/**
 * OLD WAY (Before ES2025): Cannot duplicate group names
 *
 * PROBLEM: Had to use different names even for mutually exclusive alternatives
 *
 * NEW WAY (ES2025): Can use same name in different alternatives
 */

console.log("--- OLD WAY (Before ES2025) ---");

// Before: Had to use different names
const oldDatePattern =
  /(?<year1>\d{4})-(?<month1>\d{2})-(?<day1>\d{2})|(?<month2>\d{2})\/(?<day2>\d{2})\/(?<year2>\d{4})/;

const match1Old = "2025-06-15".match(oldDatePattern);
const match2Old = "06/15/2025".match(oldDatePattern);

console.log("ISO format groups:", match1Old?.groups);
console.log("US format groups:", match2Old?.groups);

console.log("\nProblem: Different names (year1/year2) for same concept");

console.log("\n--- NEW WAY (ES2025) ---");

// Now: Can use same names in alternatives
const newDatePattern =
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})|(?<month>\d{2})\/(?<day>\d{2})\/(?<year>\d{4})/;

const match1New = "2025-06-15".match(newDatePattern);
const match2New = "06/15/2025".match(newDatePattern);

console.log("\nISO format:", match1New?.groups);
console.log("US format:", match2New?.groups);

console.log("\nBenefit: Same names (year, month, day) in both alternatives!");

console.log("\n--- Practical Examples ---");

// Example 1: Different time formats
const timePattern =
  /(?<hour>\d{2}):(?<minute>\d{2})|(?<hour>\d{1,2})(?<period>am|pm)/i;

const time24 = "14:30".match(timePattern);
const time12 = "2pm".match(timePattern);

console.log("\n24-hour format:", time24?.groups);
console.log("12-hour format:", time12?.groups);

// Example 2: Phone number formats
const phonePattern =
  /(?<area>\d{3})-(?<exchange>\d{3})-(?<number>\d{4})|\((?<area>\d{3})\)\s*(?<exchange>\d{3})-(?<number>\d{4})/;

const phone1 = "555-123-4567".match(phonePattern);
const phone2 = "(555) 123-4567".match(phonePattern);

console.log("\nDashed format:", phone1?.groups);
console.log("Parentheses format:", phone2?.groups);

// Example 3: URL parsing
const urlPattern = /https?:\/\/(?<domain>[^\/]+)|(?<domain>[^\/]+)\.com/;

const url1 = "https://example.com".match(urlPattern);
const url2 = "example.com".match(urlPattern);

console.log("\nFull URL:", url1?.groups);
console.log("Short URL:", url2?.groups);

// Example 4: Color formats
const colorPattern =
  /#(?<hex>[0-9a-f]{6})|rgb\((?<r>\d+),\s*(?<g>\d+),\s*(?<b>\d+)\)|(?<name>red|blue|green)/i;

const hex = "#ff5733".match(colorPattern);
const rgb = "rgb(255, 87, 51)".match(colorPattern);
const named = "red".match(colorPattern);

console.log("\nHex color:", hex?.groups);
console.log("RGB color:", rgb?.groups);
console.log("Named color:", named?.groups);

console.log("\n--- Advanced Usage ---");

// Nested alternatives with duplicate names
const advancedPattern =
  /(?:(?<type>email):(?<value>\S+@\S+)|(?<type>phone):(?<value>\d{3}-\d{4}))/;

const email = "email:user@example.com".match(advancedPattern);
const phone = "phone:555-1234".match(advancedPattern);

console.log("\nEmail match:", email?.groups);
console.log("Phone match:", phone?.groups);

// ============================================
// 4. SET METHODS - UNION, INTERSECTION, DIFFERENCE
// ============================================

console.log("\n=== 4. Set Methods ===");

/**
 * OLD WAY (Before ES2025): Manual set operations
 *
 * PROBLEM: Had to implement set operations manually
 * Verbose and error-prone
 *
 * NEW WAY (ES2025): Built-in set operation methods
 */

console.log("--- OLD WAY (Before ES2025) ---");

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Old way - Union
const unionOld = new Set([...setA, ...setB]);
console.log("Union (old):", unionOld);

// Old way - Intersection
const intersectionOld = new Set([...setA].filter((x) => setB.has(x)));
console.log("Intersection (old):", intersectionOld);

// Old way - Difference
const differenceOld = new Set([...setA].filter((x) => !setB.has(x)));
console.log("Difference (old):", differenceOld);

// Old way - Symmetric difference
const symDiffOld = new Set([
  ...[...setA].filter((x) => !setB.has(x)),
  ...[...setB].filter((x) => !setA.has(x)),
]);
console.log("Symmetric difference (old):", symDiffOld);

console.log("\n--- NEW WAY (ES2025) ---");

const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);

// union() - all elements from both sets
const unionNew = set1.union(set2);
console.log("union():", unionNew);

// intersection() - elements in both sets
const intersectionNew = set1.intersection(set2);
console.log("intersection():", intersectionNew);

// difference() - elements in first but not second
const differenceNew = set1.difference(set2);
console.log("difference():", differenceNew);

// symmetricDifference() - elements in either but not both
const symDiffNew = set1.symmetricDifference(set2);
console.log("symmetricDifference():", symDiffNew);

console.log("\n--- Relationship Methods ---");

// isSubsetOf() - check if all elements are in other set
const subset = new Set([1, 2]);
const superset = new Set([1, 2, 3, 4]);

console.log("\nisSubsetOf():", subset.isSubsetOf(superset));
console.log("Reverse:", superset.isSubsetOf(subset));

// isSupersetOf() - check if contains all elements of other set
console.log("\nisSupersetOf():", superset.isSupersetOf(subset));
console.log("Reverse:", subset.isSupersetOf(superset));

// isDisjointFrom() - check if no common elements
const disjoint1 = new Set([1, 2, 3]);
const disjoint2 = new Set([4, 5, 6]);
const notDisjoint = new Set([3, 4, 5]);

console.log(
  "\nisDisjointFrom() with no overlap:",
  disjoint1.isDisjointFrom(disjoint2)
);
console.log(
  "isDisjointFrom() with overlap:",
  disjoint1.isDisjointFrom(notDisjoint)
);

console.log("\n--- Practical Examples ---");

// Example 1: User permissions
const adminPermissions = new Set(["read", "write", "delete", "admin"]);
const userPermissions = new Set(["read", "write"]);

console.log(
  "\nUser has all permissions?",
  adminPermissions.isSupersetOf(userPermissions)
);
console.log("User is subset?", userPermissions.isSubsetOf(adminPermissions));
console.log(
  "Common permissions:",
  adminPermissions.intersection(userPermissions)
);
console.log(
  "Admin-only permissions:",
  adminPermissions.difference(userPermissions)
);

// Example 2: Tag management
const post1Tags = new Set(["javascript", "web", "programming"]);
const post2Tags = new Set(["python", "programming", "data"]);

console.log("\nAll tags:", post1Tags.union(post2Tags));
console.log("Common tags:", post1Tags.intersection(post2Tags));
console.log("Unique to post1:", post1Tags.difference(post2Tags));
console.log("Unique tags:", post1Tags.symmetricDifference(post2Tags));

// Example 3: Feature comparison
const productAFeatures = new Set(["wifi", "bluetooth", "nfc", "5g"]);
const productBFeatures = new Set(["wifi", "bluetooth", "4g"]);

console.log("\nAll features:", productAFeatures.union(productBFeatures));
console.log(
  "Common features:",
  productAFeatures.intersection(productBFeatures)
);
console.log(
  "Product A exclusive:",
  productAFeatures.difference(productBFeatures)
);
console.log(
  "Completely different?",
  productAFeatures.isDisjointFrom(productBFeatures)
);

// Example 4: Filtering data
const activeUsers = new Set(["user1", "user2", "user3"]);
const premiumUsers = new Set(["user2", "user4", "user5"]);

console.log("\nAll users:", activeUsers.union(premiumUsers));
console.log("Active premium users:", activeUsers.intersection(premiumUsers));
console.log("Free active users:", activeUsers.difference(premiumUsers));
console.log(
  "Non-overlapping users:",
  activeUsers.symmetricDifference(premiumUsers)
);

// Example 5: Course enrollment
const mathStudents = new Set(["alice", "bob", "charlie"]);
const csStudents = new Set(["bob", "charlie", "david"]);

console.log("\nAll students:", mathStudents.union(csStudents));
console.log("Taking both:", mathStudents.intersection(csStudents));
console.log("Math only:", mathStudents.difference(csStudents));
console.log("CS only:", csStudents.difference(mathStudents));
console.log(
  "Taking exactly one:",
  mathStudents.symmetricDifference(csStudents)
);

console.log("\n--- Chaining Operations ---");

const setX = new Set([1, 2, 3, 4, 5]);
const setY = new Set([4, 5, 6, 7, 8]);
const setZ = new Set([6, 7, 8, 9, 10]);

// Chain multiple operations
const result = setX.union(setY).intersection(setZ);

console.log("\n(X ∪ Y) ∩ Z:", result);

// Complex operation
const complexResult = setX.union(setY).difference(setZ);

console.log("(X ∪ Y) - Z:", complexResult);

console.log("\n--- Working with Different Types ---");

// Sets with objects
const users1 = new Set([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
]);

const users2 = new Set([
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
]);

// Note: Object identity matters
const allUsers = users1.union(users2);
console.log("\nAll users (by reference):", allUsers.size);

// For value-based comparison, use custom logic
const ids1 = new Set([1, 2]);
const ids2 = new Set([2, 3]);
const commonIds = ids1.intersection(ids2);
console.log("Common IDs:", commonIds);

console.log("\n--- Performance Considerations ---");

const largeSet1 = new Set(Array.from({ length: 10000 }, (_, i) => i));
const largeSet2 = new Set(Array.from({ length: 10000 }, (_, i) => i + 5000));

console.log("\nLarge set operations are optimized:");
console.log("Set 1 size:", largeSet1.size);
console.log("Set 2 size:", largeSet2.size);

const largeUnion = largeSet1.union(largeSet2);
console.log("Union size:", largeUnion.size);

const largeIntersection = largeSet1.intersection(largeSet2);
console.log("Intersection size:", largeIntersection.size);

// ============================================
// 5. SET METHODS WITH ITERABLES
// ============================================

console.log("\n=== 5. Set Methods Work with Iterables ===");

/**
 * ES2025: Set methods accept any iterable, not just Set
 */

const originalSet = new Set([1, 2, 3]);

// Works with arrays
const withArray = originalSet.union([4, 5, 6]);
console.log("\nUnion with array:", withArray);

// Works with other iterables
const withString = new Set(["a", "b"]).union("cde");
console.log("Union with string:", withString);

// Works with generators
function* numberGenerator() {
  yield 7;
  yield 8;
  yield 9;
}

const withGenerator = originalSet.union(numberGenerator());
console.log("Union with generator:", withGenerator);

// Works with Map keys
const mapData = new Map([
  [10, "ten"],
  [11, "eleven"],
]);
const withMapKeys = originalSet.union(mapData.keys());
console.log("Union with Map keys:", withMapKeys);

console.log("\n--- Practical Iterable Examples ---");

// Example 1: Merge tags from different sources
const existingTags = new Set(["javascript", "web"]);
const newTagsArray = ["programming", "tutorial"];
const allTags = existingTags.union(newTagsArray);
console.log("\nMerged tags:", allTags);

// Example 2: Filter with array
const validIds = new Set([1, 2, 3, 4, 5]);
const requestedIds = [2, 3, 6, 7];
const allowedIds = validIds.intersection(requestedIds);
console.log("Allowed IDs:", allowedIds);

// Example 3: Check user input
const allowedCharacters = new Set("abcdefghijklmnopqrstuvwxyz0123456789");
const userInput = "hello123!@#";
const validChars = allowedCharacters.intersection(userInput);
const invalidChars = new Set(userInput).difference(allowedCharacters);
console.log("\nValid characters:", validChars);
console.log("Invalid characters:", invalidChars);

// ============================================
// SUMMARY AND COMPARISON
// ============================================

console.log("\n=== ES2025 Summary ===");

console.log("\n📊 New Features:");

console.log("\n1. Error.isError()");
console.log("   - Reliable error detection");
console.log("   - Works across realms");
console.log("   - Better than instanceof");

console.log("\n2. Promise.try()");
console.log("   - Uniform sync/async handling");
console.log("   - Cleaner error handling");
console.log("   - Better than manual wrapping");

console.log("\n3. RegExp Duplicate Named Groups");
console.log("   - Same name in alternatives");
console.log("   - Cleaner pattern matching");
console.log("   - Better readability");

console.log("\n4. Set Operation Methods");
console.log("   - union() - combine sets");
console.log("   - intersection() - common elements");
console.log("   - difference() - unique to first");
console.log("   - symmetricDifference() - unique to each");
console.log("   - isSubsetOf() - containment check");
console.log("   - isSupersetOf() - containment check");
console.log("   - isDisjointFrom() - no overlap check");

console.log("\n5. Set Methods with Iterables");
console.log("   - Accept any iterable");
console.log("   - Works with arrays, strings, etc.");
console.log("   - More flexible");

console.log("\n🎯 Key Benefits:");
console.log("✓ Better error handling");
console.log("✓ More powerful Set operations");
console.log("✓ Cleaner promise code");
console.log("✓ Better regex patterns");
console.log("✓ Less boilerplate code");

console.log("\n📈 Impact:");
console.log("- Safer error detection");
console.log("- Easier set operations");
console.log("- More consistent promise handling");
console.log("- Better pattern matching");
console.log("- Improved developer experience");

console.log("\n=== ES2025 Features Complete ===");
console.log("ES2025 focused on Set operations and developer experience!");
