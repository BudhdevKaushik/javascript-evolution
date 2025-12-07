/**
 * ============================================
 * ECMAScript 12 (ES12 / ES2021) - Complete Guide
 * Release Date: June 2021
 * ============================================
 *
 * ES12 introduced practical refinements focusing on string manipulation,
 * promises, internationalization, and utility features.
 *
 * Complete Feature List:
 * 1. String.prototype.replaceAll()
 * 2. Promise.any()
 * 3. Logical Assignment Operators (&&=, ||=, ??=)
 * 4. Numeric Separators (_)
 * 5. WeakRef
 * 6. FinalizationRegistry
 * 7. AggregateError
 * 8. Intl.ListFormat
 * 9. Intl.DateTimeFormat (dateStyle & timeStyle)
 */

console.log("=== ECMAScript 12 (ES12 / ES2021) - Complete Guide ===\n");

// ============================================
// 1. STRING.PROTOTYPE.REPLACEALL()
// ============================================

console.log("=== 1. String.prototype.replaceAll() ===");
console.log("Problem: replace() only replaces first occurrence");
console.log("Solution: replaceAll() replaces all occurrences\n");

// Basic usage
const textSample = "The cat sat on the cat mat";
const updatedText = textSample.replaceAll("cat", "dog");
console.log("Original:", textSample);
console.log("Updated:", updatedText);

// Case-sensitive replacement
const legacyCode = "var x = 10; var y = 20; var z = 30;";
const modernCode = legacyCode.replaceAll("var", "let");
console.log("Modernized:", modernCode);

// With special characters
const windowsPath = "C:\\Users\\John\\Documents\\file.txt";
const unixPath = windowsPath.replaceAll("\\", "/");
console.log("Unix path:", unixPath);

// With regex and callback
const phoneNumbers = "Call 123-456-7890 or 098-765-4321";
const formattedPhones = phoneNumbers.replaceAll(
  /(\d{3})-(\d{3})-(\d{4})/g,
  "($1) $2-$3"
);
console.log("Formatted:", formattedPhones);

// Template engine example
const emailTemplate = "Hello {name}, you have {count} new messages";
let personalizedEmail = emailTemplate
  .replaceAll("{name}", "Alice")
  .replaceAll("{count}", "5");
console.log("Email:", personalizedEmail);

// URL parameter replacement
const apiTemplate = "https://api.example.com/users/{userId}/posts/{postId}";
const finalApiUrl = apiTemplate
  .replaceAll("{userId}", "123")
  .replaceAll("{postId}", "456");
console.log("API URL:", finalApiUrl);

// CSV to TSV conversion
const csvData = "Alice,30,New York";
const tsvData = csvData.replaceAll(",", "\t");
console.log("TSV:", tsvData);

// Removing patterns
const messyString = "Hello,,,World,,,Test";
const cleanString = messyString.replaceAll(",,,", " ");
console.log("Clean:", cleanString);

console.log("");

// ============================================
// 2. PROMISE.ANY()
// ============================================

console.log("=== 2. Promise.any() ===");
console.log("Problem: No way to get first successful promise");
console.log("Solution: Promise.any() resolves with first fulfillment\n");

// Basic Promise.any()
async function demoPromiseAny() {
  const promises1 = [
    Promise.reject("Error 1"),
    Promise.resolve("Success 1"),
    Promise.resolve("Success 2"),
  ];

  try {
    const firstSuccess = await Promise.any(promises1);
    console.log("First success:", firstSuccess);
  } catch (err) {
    console.log("All failed:", err);
  }
}

demoPromiseAny();

// API fallback pattern
async function fetchWithFallback() {
  const endpoints = [
    Promise.reject(new Error("Primary server down")),
    Promise.resolve({ data: "From backup server" }),
    Promise.resolve({ data: "From tertiary server" }),
  ];

  try {
    const response = await Promise.any(endpoints);
    console.log("Response:", response.data);
  } catch (err) {
    console.log("All endpoints failed");
  }
}

fetchWithFallback();

// Fastest successful response
async function getFastestSuccess() {
  const requests = [
    new Promise((resolve) => setTimeout(() => resolve("Slow success"), 300)),
    new Promise((_, reject) => setTimeout(() => reject("Fast failure"), 100)),
    new Promise((resolve) => setTimeout(() => resolve("Medium success"), 200)),
  ];

  try {
    const fastest = await Promise.any(requests);
    console.log("Fastest:", fastest);
  } catch (err) {
    console.log("All failed");
  }
}

getFastestSuccess();

// All rejections scenario
async function handleAllRejections() {
  const failingPromises = [
    Promise.reject("DB error"),
    Promise.reject("Network error"),
    Promise.reject("Auth error"),
  ];

  try {
    await Promise.any(failingPromises);
  } catch (err) {
    console.log("Error type:", err.constructor.name);
    console.log("All errors:", err.errors);
  }
}

handleAllRejections();

// CDN fallback system
async function loadFromCDN() {
  const cdnUrls = [
    Promise.reject(new Error("CDN 1 timeout")),
    Promise.reject(new Error("CDN 2 down")),
    Promise.resolve({ script: "loaded from CDN 3" }),
  ];

  try {
    const resource = await Promise.any(cdnUrls);
    console.log("CDN resource:", resource.script);
  } catch (err) {
    console.log("All CDNs failed");
  }
}

loadFromCDN();

// Comparison: Promise.any vs Promise.race
async function compareAnyVsRace() {
  const mixedPromises = [
    Promise.reject("Fast rejection"),
    new Promise((resolve) => setTimeout(() => resolve("Slow success"), 200)),
  ];

  // Promise.race - first settled (rejection wins)
  try {
    const raceResult = await Promise.race(mixedPromises);
    console.log("Race won:", raceResult);
  } catch (err) {
    console.log("Race rejected:", err);
  }

  // Promise.any - first fulfilled (success wins)
  try {
    const anyResult = await Promise.any(mixedPromises);
    console.log("Any succeeded:", anyResult);
  } catch (err) {
    console.log("Any failed:", err);
  }
}

compareAnyVsRace();

console.log("");

// ============================================
// 3. LOGICAL ASSIGNMENT OPERATORS
// ============================================

console.log("=== 3. Logical Assignment Operators (&&=, ||=, ??=) ===");
console.log("Problem: Verbose conditional assignments");
console.log("Solution: Concise logical assignment operators\n");

// &&= (AND assignment) - assigns if truthy
let counterValue = 10;
counterValue &&= 20; // Assigned because 10 is truthy
console.log("Counter (&&=):", counterValue); // 20

let zeroCounter = 0;
zeroCounter &&= 100; // Not assigned because 0 is falsy
console.log("Zero counter (&&=):", zeroCounter); // 0

// ||= (OR assignment) - assigns if falsy
let guestName = "";
guestName ||= "Guest";
console.log("Guest name (||=):", guestName); // "Guest"

let existingUser = "Alice";
existingUser ||= "Default";
console.log("Existing user (||=):", existingUser); // "Alice"

// ??= (Nullish coalescing assignment) - assigns if null or undefined
let serverPort = 0;
serverPort ??= 3000;
console.log("Port (??=):", serverPort); // 0 (preserved)

let undefinedPort;
undefinedPort ??= 3000;
console.log("Undefined port (??=):", undefinedPort); // 3000

let nullPort = null;
nullPort ??= 8080;
console.log("Null port (??=):", nullPort); // 8080

// Configuration defaults example
const appConfig = {
  host: "localhost",
};

appConfig.port ??= 3000;
appConfig.ssl ??= false;
appConfig.host ||= "0.0.0.0";
appConfig.timeout ??= 5000;

console.log("App config:", appConfig);

// Cache initialization
const cacheSystem = {
  data: null,
};

cacheSystem.data ??= { items: [] };
cacheSystem.ttl ??= 3600;
console.log("Cache initialized:", cacheSystem);

// Feature flags
const featureFlags = {
  darkMode: false,
  notifications: null,
};

featureFlags.darkMode ||= false; // No change
featureFlags.notifications ??= true; // Changed
console.log("Feature flags:", featureFlags);

// Short-circuit behavior
let callCounter = 0;

function expensiveCall() {
  callCounter++;
  return "Expensive result";
}

let cachedResult = "Already cached";
cachedResult &&= expensiveCall(); // Called
console.log("Expensive calls made:", callCounter); // 1

let nullResult = null;
nullResult &&= expensiveCall(); // Not called
console.log("Still one call:", callCounter); // 1

// Operator comparison table
let testFalse = false;
let testZero = 0;
let testEmpty = "";
let testNull = null;
let testUndefined = undefined;

console.log("\n--- Operator Comparisons ---");
console.log("false ||= 'default':", (testFalse ||= "default"));
console.log("0 ||= 'default':", (testZero ||= "default"));
console.log("'' ||= 'default':", (testEmpty ||= "default"));

let nullTest = null;
let zeroTest = 0;
let falseTest = false;

console.log("null ??= 'default':", (nullTest ??= "default"));
console.log("0 ??= 'default':", (zeroTest ??= "default"));
console.log("false ??= 'default':", (falseTest ??= "default"));

console.log("");

// ============================================
// 4. NUMERIC SEPARATORS
// ============================================

console.log("=== 4. Numeric Separators (_) ===");
console.log("Problem: Large numbers hard to read");
console.log("Solution: Underscore as numeric separator\n");

// Decimal numbers
const oneMillion = 1_000_000;
const oneBillion = 1_000_000_000;
const annualBudget = 50_000_000;
console.log("One million:", oneMillion);
console.log("One billion:", oneBillion);
console.log("Budget:", annualBudget);

// Decimal fractions
const piValue = 3.141_592_653_589_793;
const smallNumber = 0.000_001;
console.log("Pi:", piValue);
console.log("Small:", smallNumber);

// Binary numbers
const binaryFlags = 0b1010_0001_1000_0101;
const permissions = 0b0000_0111; // rwx
console.log("Binary:", binaryFlags);
console.log("Permissions:", permissions);

// Hexadecimal numbers
const magentaColor = 0xff_00_ff;
const memAddress = 0xdead_beef;
console.log("Magenta:", magentaColor);
console.log("Memory address:", memAddress);

// Octal numbers
const filePerms = 0o755;
console.log("File permissions:", filePerms);

// BigInt with separators
const hugeBigInt = 1_000_000_000_000_000_000n;
const cryptoKeyBigInt = 0xab_cd_ef_12_34_56_78_90n;
console.log("Huge BigInt:", hugeBigInt);
console.log("Crypto key:", cryptoKeyBigInt);

// Financial calculations
const yearlyRevenue = 5_250_000;
const quarterRevenue = 1_312_500;
const monthRevenue = 437_500;
console.log("Annual:", yearlyRevenue);
console.log("Quarterly:", quarterRevenue);
console.log("Monthly:", monthRevenue);

// Scientific constants
const avogadroNumber = 6.022_140_76e23;
const lightSpeed = 299_792_458; // meters per second
console.log("Avogadro:", avogadroNumber);
console.log("Light speed:", lightSpeed);

// Byte sizes
const oneKilobyte = 1_024;
const oneMegabyte = 1_048_576;
const oneGigabyte = 1_073_741_824;
console.log("1 KB:", oneKilobyte);
console.log("1 MB:", oneMegabyte);
console.log("1 GB:", oneGigabyte);

// Credit card number (for display only)
const cardReference = 1234_5678_9012_3456;
console.log("Card format:", cardReference);

console.log("");

// ============================================
// 5. WEAKREF
// ============================================

console.log("=== 5. WeakRef ===");
console.log("Problem: No way to hold weak references");
console.log("Solution: WeakRef for weak object references\n");

// Basic WeakRef usage
let targetObj = { data: "Important data", id: 1 };
const weakRef = new WeakRef(targetObj);

// Access the referenced object
const dereferencedObj = weakRef.deref();
if (dereferencedObj) {
  console.log("Object exists:", dereferencedObj.data);
} else {
  console.log("Object was garbage collected");
}

// WeakRef cache implementation
class WeakRefCache {
  constructor() {
    this.store = new Map();
  }

  set(key, val) {
    this.store.set(key, new WeakRef(val));
  }

  get(key) {
    const ref = this.store.get(key);
    if (ref) {
      const val = ref.deref();
      if (val) {
        return val;
      } else {
        this.store.delete(key);
      }
    }
    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  size() {
    return this.store.size;
  }
}

const weakCache = new WeakRefCache();
let largeObject = { size: "huge", data: new Array(1000) };
weakCache.set("data1", largeObject);

console.log("Cached value:", weakCache.get("data1"));
console.log("Cache size:", weakCache.size());

// Image cache with WeakRef
class ImageCacheSystem {
  constructor() {
    this.images = new Map();
  }

  addImage(url, imageData) {
    this.images.set(url, new WeakRef(imageData));
    console.log("Image cached:", url);
  }

  getImage(url) {
    const ref = this.images.get(url);
    if (!ref) return null;

    const img = ref.deref();
    if (!img) {
      this.images.delete(url);
      return null;
    }

    return img;
  }
}

const imgCache = new ImageCacheSystem();
let imageData = { url: "photo.jpg", buffer: new ArrayBuffer(1024) };
imgCache.addImage("photo.jpg", imageData);
console.log("Image retrieved:", imgCache.getImage("photo.jpg") !== null);

console.log("");

// ============================================
// 6. FINALIZATIONREGISTRY
// ============================================

console.log("=== 6. FinalizationRegistry ===");
console.log("Problem: No cleanup callbacks after garbage collection");
console.log("Solution: FinalizationRegistry for cleanup tracking\n");

// Basic FinalizationRegistry
const cleanupRegistry = new FinalizationRegistry((heldValue) => {
  console.log("Cleanup callback:", heldValue);
});

let trackedObj = { id: 1, name: "Tracked Object" };
cleanupRegistry.register(trackedObj, "Object-1");
console.log("Object registered for cleanup tracking");

// Resource cleanup tracking
const resourceRegistry = new FinalizationRegistry((resourceId) => {
  console.log(`Closing resource: ${resourceId}`);
});

let fileHandle = { id: "file123", descriptor: 42 };
resourceRegistry.register(fileHandle, "file123");
console.log("File handle tracked");

// Connection pool cleanup
class ConnectionPool {
  constructor() {
    this.connections = new Map();
    this.registry = new FinalizationRegistry((connId) => {
      console.log(`Connection ${connId} cleaned up`);
      this.connections.delete(connId);
    });
  }

  createConnection(id) {
    const conn = { id, active: true };
    this.connections.set(id, new WeakRef(conn));
    this.registry.register(conn, id);
    return conn;
  }

  getConnection(id) {
    const ref = this.connections.get(id);
    return ref ? ref.deref() : null;
  }
}

const pool = new ConnectionPool();
let conn1 = pool.createConnection("conn-1");
console.log("Connection created:", conn1.id);

// Unregister capability
const unregisterRegistry = new FinalizationRegistry((val) => {
  console.log("Cleanup:", val);
});

const unregisterToken = {};
let objectToUnregister = { value: 42 };
unregisterRegistry.register(
  objectToUnregister,
  "can-unregister",
  unregisterToken
);
unregisterRegistry.unregister(unregisterToken);
console.log("Cleanup callback cancelled");

// Memory leak detector
class MemoryLeakDetector {
  constructor() {
    this.registry = new FinalizationRegistry((objInfo) => {
      console.log(`Object collected: ${objInfo.type} - ${objInfo.id}`);
    });
    this.tracked = 0;
  }

  track(obj, type, id) {
    this.registry.register(obj, { type, id });
    this.tracked++;
    console.log(`Tracking ${type} ${id}`);
  }
}

const leakDetector = new MemoryLeakDetector();
let tempObj = { data: "temporary" };
leakDetector.track(tempObj, "TempObject", "temp-1");

console.log("");

// ============================================
// 7. AGGREGATEERROR
// ============================================

console.log("=== 7. AggregateError ===");
console.log("Problem: No standard way to represent multiple errors");
console.log("Solution: AggregateError for grouping errors\n");

// Basic AggregateError
const errorList = [
  new Error("Database connection failed"),
  new Error("API timeout"),
  new Error("Invalid credentials"),
];

const aggregateErr = new AggregateError(
  errorList,
  "Multiple operations failed"
);
console.log("Aggregate message:", aggregateErr.message);
console.log("Error count:", aggregateErr.errors.length);

// With Promise.any()
async function demoAggregateError() {
  const failingOperations = [
    Promise.reject(new Error("Operation 1 failed")),
    Promise.reject(new Error("Operation 2 failed")),
    Promise.reject(new Error("Operation 3 failed")),
  ];

  try {
    await Promise.any(failingOperations);
  } catch (err) {
    console.log("Is AggregateError:", err instanceof AggregateError);
    console.log("Message:", err.message);
    console.log("Individual errors:");
    err.errors.forEach((e, i) => console.log(`  ${i + 1}. ${e.message}`));
  }
}

demoAggregateError();

// Form validation with AggregateError
function validateForm(formData) {
  const validationErrors = [];

  if (!formData.email) {
    validationErrors.push(new Error("Email is required"));
  }
  if (!formData.password) {
    validationErrors.push(new Error("Password is required"));
  }
  if (formData.password && formData.password.length < 8) {
    validationErrors.push(new Error("Password must be 8+ characters"));
  }
  if (!formData.username) {
    validationErrors.push(new Error("Username is required"));
  }

  if (validationErrors.length > 0) {
    throw new AggregateError(validationErrors, "Form validation failed");
  }

  return true;
}

try {
  validateForm({ email: "", password: "123", username: "" });
} catch (err) {
  console.log("\nValidation errors:");
  err.errors.forEach((e) => console.log(`  - ${e.message}`));
}

// Batch processing with AggregateError
async function processBatchItems(items) {
  const processingErrors = [];

  for (const item of items) {
    try {
      if (item.id % 2 !== 0) {
        throw new Error(`Item ${item.id} processing failed`);
      }
      console.log(`Item ${item.id} processed`);
    } catch (err) {
      processingErrors.push(err);
    }
  }

  if (processingErrors.length > 0) {
    throw new AggregateError(
      processingErrors,
      `${processingErrors.length} items failed`
    );
  }
}

try {
  await processBatchItems([{ id: 1 }, { id: 2 }, { id: 3 }]);
} catch (err) {
  console.log("\nBatch errors:", err.message);
}

// Service health check
async function checkServiceHealth(services) {
  const healthErrors = [];

  for (const service of services) {
    try {
      if (!service.healthy) {
        throw new Error(`${service.name} is unhealthy`);
      }
    } catch (err) {
      healthErrors.push(err);
    }
  }

  if (healthErrors.length > 0) {
    throw new AggregateError(
      healthErrors,
      `${healthErrors.length} services unhealthy`
    );
  }
}

try {
  await checkServiceHealth([
    { name: "Database", healthy: false },
    { name: "Cache", healthy: true },
    { name: "API Gateway", healthy: false },
  ]);
} catch (err) {
  console.log("\nHealth check:");
  err.errors.forEach((e) => console.log(`  ${e.message}`));
}

console.log("");

// ============================================
// 8. INTL.LISTFORMAT
// ============================================

console.log("=== 8. Intl.ListFormat ===");
console.log("Problem: No standard way to format lists");
console.log("Solution: Locale-specific list formatting\n");

// Basic list formatting
const itemsList = ["Car", "Bus", "Truck"];
const listFormatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});
console.log("English list:", listFormatter.format(itemsList));

// Different locales
const fruitsList = ["Apple", "Banana", "Orange"];

const enListFormat = new Intl.ListFormat("en", { type: "conjunction" });
const deListFormat = new Intl.ListFormat("de", { type: "conjunction" });
const esListFormat = new Intl.ListFormat("es", { type: "conjunction" });
const frListFormat = new Intl.ListFormat("fr", { type: "conjunction" });

console.log("EN:", enListFormat.format(fruitsList));
console.log("DE:", deListFormat.format(fruitsList));
console.log("ES:", esListFormat.format(fruitsList));
console.log("FR:", frListFormat.format(fruitsList));

// Different types
const namesList = ["Alice", "Bob", "Charlie"];

const conjunctionList = new Intl.ListFormat("en", { type: "conjunction" });
const disjunctionList = new Intl.ListFormat("en", { type: "disjunction" });
const unitList = new Intl.ListFormat("en", { type: "unit" });

console.log("Conjunction:", conjunctionList.format(namesList));
console.log("Disjunction:", disjunctionList.format(namesList));
console.log("Unit:", unitList.format(namesList));

// Different styles
const devicesList = ["Laptop", "Phone", "Tablet"];

const longStyleList = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});
const shortStyleList = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction",
});
const narrowStyleList = new Intl.ListFormat("en", {
  style: "narrow",
  type: "conjunction",
});

console.log("Long:", longStyleList.format(devicesList));
console.log("Short:", shortStyleList.format(devicesList));
console.log("Narrow:", narrowStyleList.format(devicesList));

// formatToParts() method
const colorsList = ["Red", "Green", "Blue"];
const partsListFormatter = new Intl.ListFormat("en", { type: "conjunction" });
const listParts = partsListFormatter.formatToParts(colorsList);

console.log("\nList parts:", JSON.stringify(listParts, null, 2));

// Practical examples
const usersList = ["John", "Sarah", "Mike"];
const userListFormat = new Intl.ListFormat("en", { type: "conjunction" });
console.log("\nOnline users:", userListFormat.format(usersList));

const cartItemsList = ["Book", "Laptop Stand", "Mouse"];
const cartListFormat = new Intl.ListFormat("en", { type: "conjunction" });
console.log("Cart:", cartListFormat.format(cartItemsList));

const permissionsList = ["Read", "Write", "Execute"];
const permListFormat = new Intl.ListFormat("en", { type: "disjunction" });
console.log("Choose:", permListFormat.format(permissionsList));

// Edge cases
const twoItemsList = ["Coffee", "Tea"];
const singleItemList = ["Coffee"];
const emptyList = [];

const edgeListFormat = new Intl.ListFormat("en", { type: "conjunction" });
console.log("\nTwo items:", edgeListFormat.format(twoItemsList));
console.log("Single:", edgeListFormat.format(singleItemList));
console.log("Empty:", edgeListFormat.format(emptyList));

console.log("");

// ============================================
// 9. INTL.DATETIMEFORMAT (DATESTYLE & TIMESTYLE)
// ============================================

console.log("=== 9. Intl.DateTimeFormat (dateStyle & timeStyle) ===");
console.log("Problem: Complex date/time formatting options");
console.log("Solution: Simple dateStyle and timeStyle options\n");

const sampleDate = new Date("2021-06-22T15:30:00");

// dateStyle options
const fullDateStyle = new Intl.DateTimeFormat("en", { dateStyle: "full" });
const longDateStyle = new Intl.DateTimeFormat("en", { dateStyle: "long" });
const mediumDateStyle = new Intl.DateTimeFormat("en", { dateStyle: "medium" });
const shortDateStyle = new Intl.DateTimeFormat("en", { dateStyle: "short" });

console.log("Full date:", fullDateStyle.format(sampleDate));
console.log("Long date:", longDateStyle.format(sampleDate));
console.log("Medium date:", mediumDateStyle.format(sampleDate));
console.log("Short date:", shortDateStyle.format(sampleDate));

// timeStyle options
const fullTimeStyle = new Intl.DateTimeFormat("en", { timeStyle: "full" });
const longTimeStyle = new Intl.DateTimeFormat("en", { timeStyle: "long" });
const mediumTimeStyle = new Intl.DateTimeFormat("en", { timeStyle: "medium" });
const shortTimeStyle = new Intl.DateTimeFormat("en", { timeStyle: "short" });

console.log("\nFull time:", fullTimeStyle.format(sampleDate));
console.log("Long time:", longTimeStyle.format(sampleDate));
console.log("Medium time:", mediumTimeStyle.format(sampleDate));
console.log("Short time:", shortTimeStyle.format(sampleDate));

// Combined dateStyle and timeStyle
const fullDateTime = new Intl.DateTimeFormat("en", {
  dateStyle: "full",
  timeStyle: "full",
});
const mediumDateTime = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "medium",
});
const shortDateTime = new Intl.DateTimeFormat("en", {
  dateStyle: "short",
  timeStyle: "short",
});

console.log("\nFull datetime:", fullDateTime.format(sampleDate));
console.log("Medium datetime:", mediumDateTime.format(sampleDate));
console.log("Short datetime:", shortDateTime.format(sampleDate));

// Different locales
const usDateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});
const ukDateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});
const deDateFormat = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeStyle: "short",
});
const jaPDateFormat = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
});

console.log("\nUS:", usDateFormat.format(sampleDate));
console.log("UK:", ukDateFormat.format(sampleDate));
console.log("German:", deDateFormat.format(sampleDate));
console.log("Japanese:", jaPDateFormat.format(sampleDate));

// Practical examples
const blogPostDate = new Date("2021-12-25T10:30:00");
const blogDateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeStyle: "short",
});
console.log("\nBlog post:", blogDateFormat.format(blogPostDate));

const meetingDateTime = new Date("2021-12-30T14:00:00");
const meetingDateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "full",
  timeStyle: "short",
});
console.log("Meeting:", meetingDateFormat.format(meetingDateTime));

const fileTimestamp = new Date();
const fileTimestampFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "short",
  timeStyle: "short",
});
console.log("File modified:", fileTimestampFormat.format(fileTimestamp));

// Date range formatting
const rangeStartDate = new Date("2021-12-20T09:00:00");
const rangeEndDate = new Date("2021-12-22T17:00:00");

const rangeDateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});
console.log(
  "\nConference:",
  rangeDateFormat.formatRange(rangeStartDate, rangeEndDate)
);

// Timezone-aware formatting
const utcDate = new Date("2021-12-25T12:00:00Z");

const nyDateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "long",
  timeZone: "America/New_York",
});
const londonDateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeStyle: "long",
  timeZone: "Europe/London",
});
const tokyoDateFormat = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "long",
  timeStyle: "long",
  timeZone: "Asia/Tokyo",
});

console.log("\nNew York:", nyDateFormat.format(utcDate));
console.log("London:", londonDateFormat.format(utcDate));
console.log("Tokyo:", tokyoDateFormat.format(utcDate));

console.log("");

// ============================================
// PRACTICAL REAL-WORLD EXAMPLES
// ============================================

console.log("=== Practical Real-World Examples ===\n");

// Example 1: Template Engine
console.log("--- Example 1: Template Engine ---");

class TemplateEngine {
  constructor() {
    this.variables = new Map();
  }

  setVariable(key, val) {
    this.variables.set(key, val);
  }

  setVariables(obj) {
    Object.entries(obj).forEach(([key, val]) => {
      this.variables.set(key, val);
    });
  }

  render(template) {
    let output = template;

    this.variables.forEach((val, key) => {
      const placeholder = `{{${key}}}`;
      output = output.replaceAll(placeholder, String(val));
    });

    return output;
  }
}

const engine = new TemplateEngine();
engine.setVariables({
  userName: "John Doe",
  company: "Tech Corp",
  position: "Senior Developer",
});

const letterTemplate =
  "Dear {{userName}}, Welcome to {{company}} as {{position}}!";
console.log(engine.render(letterTemplate));

// Example 2: Multi-CDN Loader
console.log("\n--- Example 2: Multi-CDN Resource Loader ---");

class CDNLoader {
  constructor(cdnUrls) {
    this.cdnUrls = cdnUrls;
  }

  async loadResource(resourcePath) {
    const loadPromises = this.cdnUrls.map((cdn) => {
      return new Promise((resolve, reject) => {
        const delay = Math.random() * 500;
        const shouldSucceed = Math.random() > 0.4;

        setTimeout(() => {
          if (shouldSucceed) {
            resolve({ cdn, url: `${cdn}${resourcePath}` });
          } else {
            reject(new Error(`${cdn} failed`));
          }
        }, delay);
      });
    });

    try {
      const result = await Promise.any(loadPromises);
      console.log("Loaded from:", result.cdn);
      return result.url;
    } catch (err) {
      console.log("All CDNs failed");
      throw new AggregateError(err.errors, "All CDN endpoints failed");
    }
  }
}

const cdnLoader = new CDNLoader([
  "https://cdn1.example.com",
  "https://cdn2.example.com",
  "https://cdn3.example.com",
]);

(async () => {
  try {
    await cdnLoader.loadResource("/scripts/app.js");
  } catch (err) {
    console.log("CDN Error:", err.message);
  }
})();

// Example 3: Configuration Manager
console.log("\n--- Example 3: Application Config Manager ---");

class AppConfigManager {
  constructor() {
    this.settings = {};
  }

  loadDefaults(defaults) {
    this.settings.apiEndpoint ??= defaults.apiEndpoint;
    this.settings.apiPort ??= defaults.apiPort;
    this.settings.apiTimeout ??= defaults.apiTimeout;
    this.settings.maxRetries ??= defaults.maxRetries;
    this.settings.enableCache ??= defaults.enableCache;
    this.settings.apiKey ||= defaults.apiKey;
    this.settings.environment ||= defaults.environment;

    console.log("Settings loaded:", this.settings);
  }

  applyConstraints() {
    this.settings.apiPort &&= Math.min(this.settings.apiPort, 65535);
    this.settings.apiTimeout &&= Math.max(this.settings.apiTimeout, 1000);
    this.settings.maxRetries &&= Math.min(this.settings.maxRetries, 10);

    console.log("Constraints applied:", this.settings);
  }
}

const configMgr = new AppConfigManager();
configMgr.settings = {
  apiEndpoint: "api.example.com",
  apiPort: 8080,
  apiKey: "",
};
configMgr.loadDefaults({
  apiEndpoint: "default-api.example.com",
  apiPort: 3000,
  apiTimeout: 5000,
  maxRetries: 3,
  enableCache: true,
  apiKey: "default-key-xyz",
  environment: "production",
});
configMgr.applyConstraints();

// Example 4: Financial Report Generator
console.log("\n--- Example 4: Financial Report ---");

class FinancialReportGenerator {
  constructor() {
    this.totalRevenue = 0;
    this.totalExpenses = 0;
  }

  setRevenue(amount) {
    this.totalRevenue = amount;
  }

  setExpenses(amount) {
    this.totalExpenses = amount;
  }

  generateReport() {
    const netProfit = this.totalRevenue - this.totalExpenses;
    const profitMargin = ((netProfit / this.totalRevenue) * 100).toFixed(2);

    console.log("\n=== Financial Report ===");
    console.log(`Revenue:       ${this.totalRevenue.toLocaleString()}`);
    console.log(`Expenses:      ${this.totalExpenses.toLocaleString()}`);
    console.log(`Net Profit:    ${netProfit.toLocaleString()}`);
    console.log(`Profit Margin: ${profitMargin}%`);
  }
}

const financialReport = new FinancialReportGenerator();
financialReport.setRevenue(5_250_000);
financialReport.setExpenses(3_875_000);
financialReport.generateReport();

// Example 5: Shopping Cart with List Formatting
console.log("\n--- Example 5: Shopping Cart ---");

class ShoppingCart {
  constructor(locale = "en") {
    this.cartItems = [];
    this.listFormatter = new Intl.ListFormat(locale, {
      style: "long",
      type: "conjunction",
    });
  }

  addItem(item) {
    this.cartItems.push(item);
  }

  addMultipleItems(...items) {
    this.cartItems.push(...items);
  }

  getSummary() {
    if (this.cartItems.length === 0) {
      return "Your cart is empty";
    }
    return `Your cart contains: ${this.listFormatter.format(this.cartItems)}.`;
  }

  getItemCount() {
    return this.cartItems.length;
  }

  clear() {
    this.cartItems = [];
  }
}

const cart = new ShoppingCart("en");
cart.addMultipleItems("MacBook Pro", "AirPods", "Magic Mouse", "USB-C Cable");
console.log(cart.getSummary());
console.log(`Total items: ${cart.getItemCount()}`);

// Example 6: Event Scheduler
console.log("\n--- Example 6: Event Scheduler ---");

class EventScheduler {
  constructor(locale = "en") {
    this.scheduledEvents = [];
    this.locale = locale;
    this.dateFormatter = new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
      timeStyle: "short",
    });
  }

  addEvent(name, dateTime) {
    this.scheduledEvents.push({ name, dateTime: new Date(dateTime) });
  }

  listEvents() {
    console.log("\n=== Event Schedule ===");

    if (this.scheduledEvents.length === 0) {
      console.log("No events scheduled");
      return;
    }

    this.scheduledEvents
      .sort((a, b) => a.dateTime - b.dateTime)
      .forEach((evt) => {
        console.log(`📅 ${evt.name}`);
        console.log(`   ${this.dateFormatter.format(evt.dateTime)}`);
      });
  }

  getNextEvent() {
    const currentTime = new Date();
    const upcomingEvents = this.scheduledEvents
      .filter((e) => e.dateTime > currentTime)
      .sort((a, b) => a.dateTime - b.dateTime);

    if (upcomingEvents.length === 0) {
      return "No upcoming events";
    }

    const nextEvt = upcomingEvents[0];
    return `Next: ${nextEvt.name} on ${this.dateFormatter.format(
      nextEvt.dateTime
    )}`;
  }
}

const scheduler = new EventScheduler("en-US");
scheduler.addEvent("Team Standup", "2021-12-25T10:00:00");
scheduler.addEvent("Code Review", "2021-12-27T14:00:00");
scheduler.addEvent("Sprint Planning", "2022-01-03T09:00:00");
scheduler.listEvents();
console.log(scheduler.getNextEvent());

// Example 7: Form Validator
console.log("\n--- Example 7: Form Validator ---");

class FormValidator {
  constructor() {
    this.errors = [];
  }

  validateEmail(email) {
    if (!email) {
      this.errors.push(new Error("Email is required"));
    } else if (!email.includes("@")) {
      this.errors.push(new Error("Email must be valid"));
    }
  }

  validatePassword(password) {
    if (!password) {
      this.errors.push(new Error("Password is required"));
    } else if (password.length < 8) {
      this.errors.push(new Error("Password must be 8+ characters"));
    } else if (!/\d/.test(password)) {
      this.errors.push(new Error("Password must contain a number"));
    }
  }

  validateUsername(username) {
    if (!username) {
      this.errors.push(new Error("Username is required"));
    } else if (username.length < 3) {
      this.errors.push(new Error("Username must be 3+ characters"));
    }
  }

  validate(formData) {
    this.errors = [];

    this.validateEmail(formData.email);
    this.validatePassword(formData.password);
    this.validateUsername(formData.username);

    if (this.errors.length > 0) {
      throw new AggregateError(this.errors, "Form validation failed");
    }

    return true;
  }
}

const validator = new FormValidator();

try {
  validator.validate({
    email: "test",
    password: "123",
    username: "ab",
  });
} catch (err) {
  console.log("\nValidation failed:");
  err.errors.forEach((e) => console.log(`  ❌ ${e.message}`));
}

// Example 8: Memory Manager
console.log("\n--- Example 8: Memory Manager ---");

class MemoryManager {
  constructor() {
    this.memoryCache = new Map();
    this.cleanupRegistry = new FinalizationRegistry((key) => {
      console.log(`Memory freed: ${key}`);
      this.memoryCache.delete(key);
    });
  }

  allocate(key, data) {
    const weakRef = new WeakRef(data);
    this.memoryCache.set(key, weakRef);
    this.cleanupRegistry.register(data, key);
    console.log(`Allocated: ${key}`);
  }

  retrieve(key) {
    const ref = this.memoryCache.get(key);
    if (!ref) {
      console.log(`Not found: ${key}`);
      return null;
    }

    const data = ref.deref();
    if (!data) {
      console.log(`Garbage collected: ${key}`);
      this.memoryCache.delete(key);
      return null;
    }

    console.log(`Retrieved: ${key}`);
    return data;
  }

  getCacheSize() {
    return this.memoryCache.size;
  }
}

const memManager = new MemoryManager();
let dataBlock1 = { id: 1, content: new Array(1000).fill("data") };
let dataBlock2 = { id: 2, content: new Array(1000).fill("info") };

memManager.allocate("block-1", dataBlock1);
memManager.allocate("block-2", dataBlock2);
console.log("Cache size:", memManager.getCacheSize());

// Example 9: Notification System
console.log("\n--- Example 9: Notification System ---");

class NotificationService {
  constructor(locale = "en") {
    this.locale = locale;
    this.listFormatter = new Intl.ListFormat(locale, {
      style: "long",
      type: "conjunction",
    });
    this.dateFormatter = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  notifyFollowers(followers) {
    const followerNames = followers.map((f) => f.name);
    return `${this.listFormatter.format(followerNames)} started following you.`;
  }

  notifyMessages(count, senders) {
    const senderNames = senders.map((s) => s.name);
    return `You have ${count} new messages from ${this.listFormatter.format(
      senderNames
    )}.`;
  }

  notifyEvent(eventName, eventDateTime) {
    return `Reminder: ${eventName} at ${this.dateFormatter.format(
      eventDateTime
    )}`;
  }
}

const notifyService = new NotificationService("en");

console.log(
  notifyService.notifyFollowers([
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
  ])
);

console.log(
  notifyService.notifyMessages(7, [{ name: "David" }, { name: "Emma" }])
);

console.log(
  notifyService.notifyEvent("Sprint Review", new Date("2021-12-28T15:00:00"))
);

// Example 10: Batch Processor
console.log("\n--- Example 10: Batch Processor ---");

class BatchProcessor {
  constructor() {
    this.successCount = 0;
    this.failureCount = 0;
  }

  async processBatch(items) {
    const batchErrors = [];

    for (const item of items) {
      try {
        await this.processItem(item);
        this.successCount++;
      } catch (err) {
        this.failureCount++;
        batchErrors.push(err);
      }
    }

    if (batchErrors.length > 0) {
      throw new AggregateError(
        batchErrors,
        `${batchErrors.length} items failed to process`
      );
    }

    return `Processed ${this.successCount} items successfully`;
  }

  async processItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (item.shouldFail) {
          reject(new Error(`Failed to process item ${item.id}`));
        } else {
          console.log(`✓ Processed item ${item.id}`);
          resolve();
        }
      }, 50);
    });
  }

  getStats() {
    return {
      success: this.successCount,
      failure: this.failureCount,
      total: this.successCount + this.failureCount,
    };
  }
}

const batchProcessor = new BatchProcessor();

(async () => {
  try {
    await batchProcessor.processBatch([
      { id: 1, shouldFail: false },
      { id: 2, shouldFail: true },
      { id: 3, shouldFail: false },
      { id: 4, shouldFail: true },
    ]);
  } catch (err) {
    console.log("\nBatch processing completed with errors:");
    console.log(`Failed: ${err.errors.length}`);
    console.log("Stats:", batchProcessor.getStats());
  }
})();

console.log("");

// ============================================
// ES12 FEATURE SUMMARY
// ============================================

console.log("=== ES12 (ES2021) Complete Feature Summary ===\n");

console.log("✅ 1. String.prototype.replaceAll()");
console.log("   - Replace all occurrences in strings");
console.log("   - Works with strings and regex");
console.log("");

console.log("✅ 2. Promise.any()");
console.log("   - Resolves with first successful promise");
console.log("   - Returns AggregateError if all fail");
console.log("");

console.log("✅ 3. Logical Assignment Operators");
console.log("   - &&= (AND assignment)");
console.log("   - ||= (OR assignment)");
console.log("   - ??= (Nullish coalescing assignment)");
console.log("");

console.log("✅ 4. Numeric Separators");
console.log("   - Use _ for readability in numbers");
console.log("   - Works with decimal, binary, hex, BigInt");
console.log("");

console.log("✅ 5. WeakRef");
console.log("   - Hold weak references to objects");
console.log("   - Useful for caching and memory management");
console.log("");

console.log("✅ 6. FinalizationRegistry");
console.log("   - Cleanup callbacks on garbage collection");
console.log("   - Resource management and leak detection");
console.log("");

console.log("✅ 7. AggregateError");
console.log("   - Group multiple errors together");
console.log("   - Used by Promise.any() and validation");
console.log("");

console.log("✅ 8. Intl.ListFormat");
console.log("   - Format lists in locale-specific way");
console.log("   - Supports conjunction, disjunction, unit");
console.log("");

console.log("✅ 9. Intl.DateTimeFormat (dateStyle & timeStyle)");
console.log("   - Simplified date/time formatting");
console.log("   - Four styles: full, long, medium, short");
console.log("");

console.log("🎉 All ES12 features covered with practical examples!");
console.log("📅 Released: June 2021");
console.log("🔗 Specification: ES2021 / ECMA-262 12th Edition\n");
