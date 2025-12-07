/**
 * ============================================
 * ECMAScript 13 (ES13 / ES2022) - Complete Guide
 * Release Date: June 2022
 * ============================================
 *
 * ES13 brought significant improvements to classes, arrays, and error handling,
 * making JavaScript more powerful and developer-friendly.
 *
 * Complete Feature List:
 * 1. Class Fields (Public & Private)
 * 2. Private Methods and Accessors
 * 3. Static Class Fields and Methods
 * 4. Static Initialization Blocks
 * 5. Top-Level await
 * 6. .at() Method for Arrays and Strings
 * 7. Object.hasOwn()
 * 8. Error.cause
 * 9. Array.prototype.findLast() and findLastIndex()
 * 10. RegExp Match Indices (/d flag)
 * 11. Ergonomic Brand Checks for Private Fields (#field in obj)
 */

console.log("=== ECMAScript 13 (ES13 / ES2022) - Complete Guide ===\n");

// ============================================
// 1. CLASS FIELDS (PUBLIC & PRIVATE)
// ============================================

console.log("=== 1. Class Fields (Public & Private) ===");
console.log("Problem: Could only declare fields in constructor");
console.log("Solution: Declare fields directly in class body\n");

// Public class fields
class UserAccount {
  username = "guest";
  email = "";
  isActive = true;
  loginCount = 0;

  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  login() {
    this.loginCount++;
    console.log(`${this.username} logged in. Count: ${this.loginCount}`);
  }
}

const account1 = new UserAccount("alice", "alice@example.com");
console.log("Username:", account1.username);
console.log("Active:", account1.isActive);
account1.login();

// Private class fields
class BankAccount {
  #balance = 0;
  #accountNumber = "";
  holderName = "";

  constructor(holderName, accountNumber, initialBalance) {
    this.holderName = holderName;
    this.#accountNumber = accountNumber;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited: $${amount}`);
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrawn: $${amount}`);
    } else {
      console.log("Insufficient funds");
    }
  }

  getBalance() {
    return this.#balance;
  }

  getAccountInfo() {
    return `Account: ${this.#accountNumber}, Balance: $${this.#balance}`;
  }
}

const bankAcc = new BankAccount("John Doe", "ACC123456", 1000);
console.log("\nHolder:", bankAcc.holderName);
bankAcc.deposit(500);
console.log("Balance:", bankAcc.getBalance());
bankAcc.withdraw(200);
console.log(bankAcc.getAccountInfo());

// Multiple private fields
class SecureStorage {
  #apiKey = "";
  #secret = "";
  #token = "";
  serviceName = "";

  constructor(serviceName, apiKey, secret) {
    this.serviceName = serviceName;
    this.#apiKey = apiKey;
    this.#secret = secret;
    this.#token = this.#generateToken();
  }

  #generateToken() {
    return `${this.#apiKey}-${this.#secret}-${Date.now()}`;
  }

  authenticate() {
    console.log(`Authenticating ${this.serviceName}...`);
    return this.#token !== "";
  }

  getPublicInfo() {
    return { service: this.serviceName, authenticated: this.authenticate() };
  }
}

const storage = new SecureStorage("CloudAPI", "key123", "secret456");
console.log("\nPublic info:", storage.getPublicInfo());

console.log("");

// ============================================
// 2. PRIVATE METHODS AND ACCESSORS
// ============================================

console.log("=== 2. Private Methods and Accessors ===");
console.log("Problem: No true private methods in classes");
console.log("Solution: Use # prefix for private methods\n");

// Private methods
class PaymentProcessor {
  #transactionFee = 0.029;
  merchantName = "";

  constructor(merchantName) {
    this.merchantName = merchantName;
  }

  #calculateFee(amount) {
    return amount * this.#transactionFee;
  }

  #validateAmount(amount) {
    return amount > 0 && amount < 1000000;
  }

  #logTransaction(amount, fee) {
    console.log(`Transaction: $${amount}, Fee: $${fee.toFixed(2)}`);
  }

  processPayment(amount) {
    if (!this.#validateAmount(amount)) {
      console.log("Invalid amount");
      return false;
    }

    const fee = this.#calculateFee(amount);
    const total = amount + fee;
    this.#logTransaction(amount, fee);
    console.log(`Total charged: $${total.toFixed(2)}`);
    return true;
  }
}

const processor = new PaymentProcessor("Tech Store");
processor.processPayment(100);
processor.processPayment(250);

// Private getters and setters
class TemperatureSensor {
  #celsius = 0;

  get #fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  set #fahrenheit(value) {
    this.#celsius = ((value - 32) * 5) / 9;
  }

  setCelsius(temp) {
    this.#celsius = temp;
    console.log(`Set to ${temp}°C (${this.#fahrenheit.toFixed(1)}°F)`);
  }

  setFahrenheit(temp) {
    this.#fahrenheit = temp;
    console.log(`Set to ${temp}°F (${this.#celsius.toFixed(1)}°C)`);
  }

  getTemperature() {
    return {
      celsius: this.#celsius,
      fahrenheit: this.#fahrenheit,
    };
  }
}

const sensor = new TemperatureSensor();
sensor.setCelsius(25);
sensor.setFahrenheit(100);
console.log("Temperature:", sensor.getTemperature());

// Private method chains
class DataValidator {
  #data = null;
  #errors = [];

  constructor(data) {
    this.#data = data;
  }

  #checkRequired() {
    if (!this.#data) {
      this.#errors.push("Data is required");
    }
    return this;
  }

  #checkType() {
    if (typeof this.#data !== "object") {
      this.#errors.push("Data must be an object");
    }
    return this;
  }

  #checkFields() {
    if (!this.#data.name) {
      this.#errors.push("Name is required");
    }
    return this;
  }

  validate() {
    this.#errors = [];
    this.#checkRequired().#checkType().#checkFields();
    return {
      valid: this.#errors.length === 0,
      errors: this.#errors,
    };
  }
}

const validator = new DataValidator({ name: "Test" });
console.log("\nValidation:", validator.validate());

console.log("");

// ============================================
// 3. STATIC CLASS FIELDS AND METHODS
// ============================================

console.log("=== 3. Static Class Fields and Methods ===");
console.log("Problem: No direct way to declare static fields");
console.log("Solution: Use static keyword for fields and methods\n");

// Static fields
class DatabaseConnection {
  static connectionCount = 0;
  static maxConnections = 10;
  static activeConnections = [];

  constructor(dbName) {
    if (
      DatabaseConnection.connectionCount >= DatabaseConnection.maxConnections
    ) {
      throw new Error("Max connections reached");
    }
    this.dbName = dbName;
    this.connectionId = ++DatabaseConnection.connectionCount;
    DatabaseConnection.activeConnections.push(this);
    console.log(`Connected to ${dbName} (ID: ${this.connectionId})`);
  }

  static getConnectionCount() {
    return DatabaseConnection.connectionCount;
  }

  static getActiveConnections() {
    return DatabaseConnection.activeConnections.length;
  }

  disconnect() {
    const index = DatabaseConnection.activeConnections.indexOf(this);
    if (index > -1) {
      DatabaseConnection.activeConnections.splice(index, 1);
    }
    console.log(`Disconnected from ${this.dbName}`);
  }
}

const db1 = new DatabaseConnection("users_db");
const db2 = new DatabaseConnection("products_db");
console.log("Total connections:", DatabaseConnection.getConnectionCount());
console.log("Active connections:", DatabaseConnection.getActiveConnections());

// Static private fields
class IDGenerator {
  static #lastId = 0;
  static #prefix = "ID";

  static generateId() {
    return `${IDGenerator.#prefix}-${++IDGenerator.#lastId}`;
  }

  static resetCounter() {
    IDGenerator.#lastId = 0;
    console.log("ID counter reset");
  }

  static getLastId() {
    return IDGenerator.#lastId;
  }
}

console.log("\nGenerated IDs:");
console.log(IDGenerator.generateId());
console.log(IDGenerator.generateId());
console.log(IDGenerator.generateId());
console.log("Last ID:", IDGenerator.getLastId());

// Static methods with inheritance
class MathUtils {
  static PI = 3.14159;
  static E = 2.71828;

  static square(num) {
    return num * num;
  }

  static cube(num) {
    return num * num * num;
  }

  static circleArea(radius) {
    return MathUtils.PI * MathUtils.square(radius);
  }
}

class AdvancedMath extends MathUtils {
  static PHI = 1.618;

  static fibonacci(n) {
    if (n <= 1) return n;
    return AdvancedMath.fibonacci(n - 1) + AdvancedMath.fibonacci(n - 2);
  }
}

console.log("\nMath calculations:");
console.log("Square of 5:", MathUtils.square(5));
console.log("Circle area (r=3):", MathUtils.circleArea(3).toFixed(2));
console.log("Fibonacci(8):", AdvancedMath.fibonacci(8));

console.log("");

// ============================================
// 4. STATIC INITIALIZATION BLOCKS
// ============================================

console.log("=== 4. Static Initialization Blocks ===");
console.log("Problem: Complex static initialization was difficult");
console.log("Solution: static {} blocks for initialization logic\n");

// Basic static block
class Configuration {
  static env = "development";
  static settings = {};

  static {
    console.log("Initializing Configuration...");
    Configuration.settings = {
      apiUrl:
        Configuration.env === "production"
          ? "https://api.prod.com"
          : "https://api.dev.com",
      timeout: 5000,
      retries: 3,
    };
  }

  static getConfig() {
    return Configuration.settings;
  }
}

console.log("Config:", Configuration.getConfig());

// Multiple static blocks
class Application {
  static modules = [];
  static initialized = false;

  static {
    console.log("\n1. Loading core modules...");
    Application.modules.push("Core");
  }

  static {
    console.log("2. Loading plugins...");
    Application.modules.push("Plugins");
  }

  static {
    console.log("3. Finalizing initialization...");
    Application.modules.push("UI");
    Application.initialized = true;
  }

  static getModules() {
    return Application.modules;
  }
}

console.log("Loaded modules:", Application.getModules());
console.log("Initialized:", Application.initialized);

// Static block with error handling
class CacheManager {
  static cache = new Map();
  static maxSize = 100;

  static {
    try {
      console.log("\nInitializing cache...");
      const savedData = { key1: "value1", key2: "value2" };
      Object.entries(savedData).forEach(([key, val]) => {
        CacheManager.cache.set(key, val);
      });
      console.log(`Cache initialized with ${CacheManager.cache.size} items`);
    } catch (err) {
      console.error("Cache initialization failed:", err);
    }
  }

  static get(key) {
    return CacheManager.cache.get(key);
  }

  static set(key, val) {
    if (CacheManager.cache.size < CacheManager.maxSize) {
      CacheManager.cache.set(key, val);
    }
  }
}

console.log("Cache item:", CacheManager.get("key1"));

// Static block with inheritance
class Vehicle {
  static defaultColor = "white";
  static vehicleTypes = [];

  static {
    console.log("\nVehicle class initializing...");
    Vehicle.vehicleTypes.push("Generic");
  }
}

class ElectricCar extends Vehicle {
  static batteryTypes = [];

  static {
    console.log("ElectricCar class initializing...");
    this.vehicleTypes.push("Electric");
    this.batteryTypes.push("Lithium-ion", "Solid-state");
  }

  static {
    console.log("Loading electric car configurations...");
    this.defaultColor = "silver";
  }
}

console.log("Vehicle types:", ElectricCar.vehicleTypes);
console.log("Battery types:", ElectricCar.batteryTypes);

console.log("");

// ============================================
// 5. TOP-LEVEL AWAIT
// ============================================

console.log("=== 5. Top-Level await ===");
console.log("Problem: await only worked inside async functions");
console.log("Solution: Use await at module top level\n");

// Simulating async data fetching
async function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John", email: "john@example.com" });
    }, 100);
  });
}

async function fetchConfig() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ apiUrl: "https://api.example.com", timeout: 5000 });
    }, 100);
  });
}

// Top-level await usage (in module context)
console.log("Fetching data with top-level await...");

(async () => {
  // This demonstrates what you can do at top level in modules
  const userData = await fetchUserData(1);
  console.log("User data:", userData);

  const configData = await fetchConfig();
  console.log("Config:", configData);
})();

// Multiple top-level awaits
async function loadResource(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} loaded`);
    }, delay);
  });
}

(async () => {
  console.log("\nLoading multiple resources...");
  const resource1 = await loadResource("Database", 50);
  const resource2 = await loadResource("Cache", 30);
  const resource3 = await loadResource("API", 40);

  console.log(resource1);
  console.log(resource2);
  console.log(resource3);
})();

// Error handling with top-level await
async function fetchWithError() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Network error"));
    }, 50);
  });
}

(async () => {
  try {
    console.log("\nTesting error handling...");
    const result = await fetchWithError();
    console.log(result);
  } catch (err) {
    console.log("Caught error:", err.message);
  }
})();

// Conditional loading with top-level await
async function loadFeature(featureName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Feature ${featureName} loaded`);
    }, 50);
  });
}

(async () => {
  const environment = "production";

  if (environment === "production") {
    const prodFeature = await loadFeature("Analytics");
    console.log("\n" + prodFeature);
  } else {
    const devFeature = await loadFeature("DebugTools");
    console.log("\n" + devFeature);
  }
})();

console.log("");

// ============================================
// 6. .AT() METHOD FOR ARRAYS AND STRINGS
// ============================================

console.log("=== 6. .at() Method ===");
console.log(
  "Problem: Accessing elements from end required arr[arr.length - n]"
);
console.log("Solution: Use .at() with negative indices\n");

// Array .at() method
const colorArray = ["red", "green", "blue", "yellow", "purple"];

console.log("Array methods:");
console.log("First element:", colorArray.at(0));
console.log("Second element:", colorArray.at(1));
console.log("Last element:", colorArray.at(-1));
console.log("Second from end:", colorArray.at(-2));
console.log("Third from end:", colorArray.at(-3));

// String .at() method
const textString = "JavaScript";

console.log("\nString methods:");
console.log("First char:", textString.at(0));
console.log("Last char:", textString.at(-1));
console.log("Second char:", textString.at(1));
console.log("Second from end:", textString.at(-2));

// Comparison: old vs new way
const dataArray = [10, 20, 30, 40, 50];

console.log("\nComparison:");
console.log("Old way - last:", dataArray[dataArray.length - 1]);
console.log("New way - last:", dataArray.at(-1));
console.log("Old way - 2nd last:", dataArray[dataArray.length - 2]);
console.log("New way - 2nd last:", dataArray.at(-2));

// Practical use: circular array access
function getCircularElement(arr, index) {
  const length = arr.length;
  const normalizedIndex = ((index % length) + length) % length;
  return arr.at(normalizedIndex);
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
console.log("\nCircular access:");
console.log("Index 0:", getCircularElement(weekDays, 0));
console.log("Index -1:", getCircularElement(weekDays, -1));
console.log("Index 8:", getCircularElement(weekDays, 8));

// TypedArray .at() method
const typedArray = new Uint8Array([10, 20, 30, 40, 50]);
console.log("\nTypedArray:");
console.log("Last element:", typedArray.at(-1));
console.log("First element:", typedArray.at(0));

// Edge cases
const emptyArray = [];
const singleArray = [42];

console.log("\nEdge cases:");
console.log("Empty array .at(0):", emptyArray.at(0));
console.log("Single element .at(-1):", singleArray.at(-1));

console.log("");

// ============================================
// 7. OBJECT.HASOWN()
// ============================================

console.log("=== 7. Object.hasOwn() ===");
console.log("Problem: Object.prototype.hasOwnProperty is verbose and unsafe");
console.log("Solution: Object.hasOwn() is more reliable\n");

// Basic Object.hasOwn()
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

console.log("Basic usage:");
console.log("Has 'name':", Object.hasOwn(person, "name"));
console.log("Has 'age':", Object.hasOwn(person, "age"));
console.log("Has 'country':", Object.hasOwn(person, "country"));

// Comparison with hasOwnProperty
const product = {
  title: "Laptop",
  price: 999,
};

console.log("\nComparison:");
console.log("Old way:", product.hasOwnProperty("title"));
console.log("New way:", Object.hasOwn(product, "title"));

// Works with null prototype objects
const nullProtoObj = Object.create(null);
nullProtoObj.key = "value";

console.log("\nNull prototype object:");
console.log("Has 'key':", Object.hasOwn(nullProtoObj, "key"));
// nullProtoObj.hasOwnProperty would throw error

// Checking inherited properties
const parentObj = { inherited: true };
const childObj = Object.create(parentObj);
childObj.own = true;

console.log("\nInheritance:");
console.log("Has 'own':", Object.hasOwn(childObj, "own"));
console.log("Has 'inherited':", Object.hasOwn(childObj, "inherited"));

// Safe property checking
function checkProperty(obj, prop) {
  if (Object.hasOwn(obj, prop)) {
    console.log(`Property '${prop}' exists with value:`, obj[prop]);
  } else {
    console.log(`Property '${prop}' does not exist`);
  }
}

const sampleObj = { username: "john_doe", email: null };
console.log("\nSafe checking:");
checkProperty(sampleObj, "username");
checkProperty(sampleObj, "email");
checkProperty(sampleObj, "phone");

// Object validation
function validateObject(obj, requiredProps) {
  const missing = requiredProps.filter((prop) => !Object.hasOwn(obj, prop));
  return {
    valid: missing.length === 0,
    missing,
  };
}

const userInput = { name: "Bob", email: "bob@test.com" };
const validation = validateObject(userInput, ["name", "email", "age"]);
console.log("\nValidation:", validation);

console.log("");

// ============================================
// 8. ERROR.CAUSE
// ============================================

console.log("=== 8. Error.cause ===");
console.log("Problem: No standard way to chain errors");
console.log("Solution: Error.cause property for error context\n");

// Basic Error.cause
function processData(data) {
  try {
    if (!data) {
      throw new Error("Data is null");
    }
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Failed to process data", { cause: err });
  }
}

try {
  processData(null);
} catch (err) {
  console.log("Error:", err.message);
  console.log("Cause:", err.cause?.message);
}

// Error chain
async function fetchData(url) {
  throw new Error("Network timeout");
}

async function getData() {
  try {
    return await fetchData("https://api.example.com");
  } catch (err) {
    throw new Error("Failed to fetch data", { cause: err });
  }
}

async function processRequest() {
  try {
    return await getData();
  } catch (err) {
    throw new Error("Request processing failed", { cause: err });
  }
}

(async () => {
  try {
    await processRequest();
  } catch (err) {
    console.log("\nError chain:");
    console.log("Top level:", err.message);
    console.log("Caused by:", err.cause?.message);
    console.log("Root cause:", err.cause?.cause?.message);
  }
})();

// Database error with context
class DatabaseError extends Error {
  constructor(message, query, cause) {
    super(message, { cause });
    this.name = "DatabaseError";
    this.query = query;
  }
}

function executeQuery(sql) {
  try {
    throw new Error("Connection lost");
  } catch (err) {
    throw new DatabaseError("Query execution failed", sql, err);
  }
}

try {
  executeQuery("SELECT * FROM users");
} catch (err) {
  console.log("\nDatabase error:");
  console.log("Message:", err.message);
  console.log("Query:", err.query);
  console.log("Cause:", err.cause.message);
}

// API error with status code
class APIError extends Error {
  constructor(message, statusCode, cause) {
    super(message, { cause });
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

async function callAPI() {
  try {
    throw new Error("Server unavailable");
  } catch (err) {
    throw new APIError("API request failed", 503, err);
  }
}

(async () => {
  try {
    await callAPI();
  } catch (err) {
    console.log("\nAPI error:");
    console.log("Status:", err.statusCode);
    console.log("Message:", err.message);
    console.log("Root cause:", err.cause.message);
  }
})();

console.log("");

// ============================================
// 9. ARRAY.PROTOTYPE.FINDLAST() AND FINDLASTINDEX()
// ============================================

console.log("=== 9. findLast() and findLastIndex() ===");
console.log("Problem: No way to search arrays from the end");
console.log("Solution: findLast() and findLastIndex() methods\n");

// Basic findLast()
const numbers = [7, 14, 3, 8, 10, 9, 12];

const lastEven = numbers.findLast((num) => num % 2 === 0);
const lastEvenIndex = numbers.findLastIndex((num) => num % 2 === 0);

console.log("Array:", numbers);
console.log("Last even number:", lastEven);
console.log("Last even index:", lastEvenIndex);

// Finding last matching object
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "admin" },
  { id: 4, name: "David", role: "user" },
];

const lastAdmin = users.findLast((user) => user.role === "admin");
const lastAdminIndex = users.findLastIndex((user) => user.role === "admin");

console.log("\nUsers array:");
console.log("Last admin:", lastAdmin);
console.log("Last admin index:", lastAdminIndex);

// Comparison: find vs findLast
const scores = [85, 92, 78, 95, 88, 91];

const firstHighScore = scores.find((score) => score > 90);
const lastHighScore = scores.findLast((score) => score > 90);

console.log("\nScores:", scores);
console.log("First score > 90:", firstHighScore);
console.log("Last score > 90:", lastHighScore);

// Finding last negative number
const mixedNumbers = [5, -3, 8, -7, 12, -2, 15];

const lastNegative = mixedNumbers.findLast((num) => num < 0);
const lastNegativeIdx = mixedNumbers.findLastIndex((num) => num < 0);

console.log("\nMixed numbers:", mixedNumbers);
console.log("Last negative:", lastNegative);
console.log("Last negative index:", lastNegativeIdx);

// Log entries - finding most recent error
const logEntries = [
  { level: "info", message: "App started" },
  { level: "error", message: "Connection failed" },
  { level: "info", message: "Retrying..." },
  { level: "error", message: "Timeout occurred" },
  { level: "info", message: "Connected" },
];

const lastError = logEntries.findLast((entry) => entry.level === "error");
console.log("\nLog entries - Last error:", lastError);

// Performance benefit for end-heavy searches
const largeArray = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  value: i * 2,
}));

const targetId = 950;
const foundItem = largeArray.findLast((item) => item.id === targetId);
console.log("\nLarge array search - Found item ID:", foundItem?.id);

// No match scenarios
const testArray = [1, 2, 3, 4, 5];
const notFound = testArray.findLast((num) => num > 10);
const notFoundIndex = testArray.findLastIndex((num) => num > 10);

console.log("\nNo match:");
console.log("Result:", notFound); // undefined
console.log("Index:", notFoundIndex); // -1

console.log("");

// ============================================
// 10. REGEXP MATCH INDICES (/d FLAG)
// ============================================

console.log("=== 10. RegExp Match Indices (/d flag) ===");
console.log("Problem: No way to get match start/end positions");
console.log("Solution: /d flag adds indices to matches\n");

// Basic match indices
const inputText = "JavaScript is awesome";
const pattern = /\w+/dg;
const matches = [...inputText.matchAll(pattern)];

console.log("Text:", inputText);
console.log("Matches with indices:");
matches.forEach((match) => {
  console.log(`  "${match[0]}" at indices:`, match.indices[0]);
});

// Capturing groups with indices
const dateText = "2022-06-22";
const datePattern = /(\d{4})-(\d{2})-(\d{2})/d;
const dateMatch = datePattern.exec(dateText);

console.log("\nDate parsing:");
console.log("Full match:", dateMatch[0], "at", dateMatch.indices[0]);
console.log("Year:", dateMatch[1], "at", dateMatch.indices[1]);
console.log("Month:", dateMatch[2], "at", dateMatch.indices[2]);
console.log("Day:", dateMatch[3], "at", dateMatch.indices[3]);

// Email extraction
const emailText = "Contact: john@example.com or jane@test.org";
const emailPattern = /([a-z]+)@([a-z]+\.[a-z]+)/dg;
const emailMatches = [...emailText.matchAll(emailPattern)];

console.log("\nEmail extraction:");
emailMatches.forEach((match, i) => {
  console.log(`Email ${i + 1}: ${match[0]}`);
  console.log(`  Full: indices ${match.indices[0]}`);
  console.log(`  User: indices ${match.indices[1]}`);
  console.log(`  Domain: indices ${match.indices[2]}`);
});

// Named capture groups with indices
const urlText = "Visit https://example.com:8080/path";
const urlPattern = /(?<protocol>\w+):\/\/(?<domain>[\w.]+):(?<port>\d+)/d;
const urlMatch = urlPattern.exec(urlText);

console.log("\nURL parsing with named groups:");
if (urlMatch) {
  console.log(
    "Protocol:",
    urlMatch.groups.protocol,
    "at",
    urlMatch.indices.groups.protocol
  );
  console.log(
    "Domain:",
    urlMatch.groups.domain,
    "at",
    urlMatch.indices.groups.domain
  );
  console.log(
    "Port:",
    urlMatch.groups.port,
    "at",
    urlMatch.indices.groups.port
  );
}

// Syntax highlighting positions
const codeText = "const x = 42;";
const tokenPattern = /const|let|var|\d+|\w+/dg;
const tokens = [...codeText.matchAll(tokenPattern)];

console.log("\nSyntax tokens:");
tokens.forEach((token) => {
  const [start, end] = token.indices[0];
  console.log(`  "${token[0]}" from ${start} to ${end}`);
});

console.log("");

// ============================================
// 11. ERGONOMIC BRAND CHECKS (#field in obj)
// ============================================

console.log("=== 11. Ergonomic Brand Checks for Private Fields ===");
console.log("Problem: No safe way to check if object has private field");
console.log("Solution: Use #field in obj syntax\n");

// Basic private field check
class EncryptedData {
  #secret;

  constructor(secret) {
    this.#secret = secret;
  }

  static hasSecret(obj) {
    return #secret in obj;
  }

  revealSecret() {
    if (#secret in this) {
      return `Secret: ${this.#secret}`;
    }
    return "No secret";
  }
}

const encrypted1 = new EncryptedData("my-secret-123");
const encrypted2 = { notEncrypted: true };

console.log("Instance 1 has secret:", EncryptedData.hasSecret(encrypted1));
console.log("Instance 2 has secret:", EncryptedData.hasSecret(encrypted2));
console.log(encrypted1.revealSecret());

// Multiple private fields
class AuthenticatedUser {
  #token;
  #refreshToken;
  publicId;

  constructor(id, token, refreshToken) {
    this.publicId = id;
    this.#token = token;
    this.#refreshToken = refreshToken;
  }

  static isAuthenticated(obj) {
    return #token in obj && #refreshToken in obj;
  }

  static hasRefreshToken(obj) {
    return #refreshToken in obj;
  }

  getAuthStatus() {
    const hasToken = #token in this;
    const hasRefresh = #refreshToken in this;
    return { hasToken, hasRefresh };
  }
}

const authUser = new AuthenticatedUser("user123", "token-abc", "refresh-xyz");
const regularUser = { publicId: "user456" };

console.log("\nAuth user check:", AuthenticatedUser.isAuthenticated(authUser));
console.log(
  "Regular user check:",
  AuthenticatedUser.isAuthenticated(regularUser)
);
console.log("Auth status:", authUser.getAuthStatus());

// Safe method delegation
class SecureVault {
  #pin;
  #contents;

  constructor(pin, contents) {
    this.#pin = pin;
    this.#contents = contents;
  }

  static verifyVault(obj) {
    if (#pin in obj && #contents in obj) {
      return "Valid vault";
    }
    return "Invalid vault";
  }

  unlock(inputPin) {
    if (#pin in this && this.#pin === inputPin) {
      return this.#contents;
    }
    return "Access denied";
  }
}

const vault1 = new SecureVault("1234", "diamonds");
const vault2 = { fake: true };

console.log("\nVault 1:", SecureVault.verifyVault(vault1));
console.log("Vault 2:", SecureVault.verifyVault(vault2));
console.log("Unlock attempt:", vault1.unlock("1234"));

// Polymorphism with private fields
class PaymentMethod {
  #cardNumber;

  constructor(cardNumber) {
    this.#cardNumber = cardNumber;
  }

  static isPaymentMethod(obj) {
    return #cardNumber in obj;
  }

  process() {
    if (#cardNumber in this) {
      return `Processing payment with card ${this.#cardNumber.slice(-4)}`;
    }
    return "Invalid payment method";
  }
}

const payment1 = new PaymentMethod("1234567890123456");
const payment2 = { type: "cash" };

console.log("\nPayment 1 valid:", PaymentMethod.isPaymentMethod(payment1));
console.log("Payment 2 valid:", PaymentMethod.isPaymentMethod(payment2));
console.log(payment1.process());

console.log("");

// ============================================
// PRACTICAL REAL-WORLD EXAMPLES
// ============================================

console.log("=== Practical Real-World Examples ===\n");

// Example 1: User Authentication System
console.log("--- Example 1: User Authentication System ---");

class UserAuthSystem {
  #password;
  #sessionToken;
  #loginAttempts = 0;
  static #maxAttempts = 3;
  username;
  email;

  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.#password = password;
  }

  static {
    console.log("Initializing User Authentication System...");
    console.log(`Max login attempts: ${UserAuthSystem.#maxAttempts}`);
  }

  #validatePassword(inputPassword) {
    return this.#password === inputPassword;
  }

  #generateToken() {
    return `token-${Date.now()}-${Math.random().toString(36)}`;
  }

  login(inputPassword) {
    if (this.#loginAttempts >= UserAuthSystem.#maxAttempts) {
      return { success: false, message: "Account locked" };
    }

    if (this.#validatePassword(inputPassword)) {
      this.#sessionToken = this.#generateToken();
      this.#loginAttempts = 0;
      return { success: true, token: this.#sessionToken };
    }

    this.#loginAttempts++;
    return {
      success: false,
      message: "Invalid password",
      attemptsLeft: UserAuthSystem.#maxAttempts - this.#loginAttempts,
    };
  }

  static isAuthenticatedUser(obj) {
    return #sessionToken in obj;
  }

  getProfile() {
    return {
      username: this.username,
      email: this.email,
      authenticated: #sessionToken in this,
    };
  }
}

const authUser1 = new UserAuthSystem("alice", "alice@example.com", "secret123");
console.log("\nLogin attempt 1:", authUser1.login("wrong"));
console.log("Login attempt 2:", authUser1.login("secret123"));
console.log("Profile:", authUser1.getProfile());

// Example 2: Shopping Cart with History
console.log("\n--- Example 2: Shopping Cart System ---");

class ShoppingCartSystem {
  #items = [];
  #history = [];
  cartId;

  constructor(cartId) {
    this.cartId = cartId;
  }

  addItem(item) {
    this.#items.push(item);
    this.#history.push({ action: "add", item, timestamp: Date.now() });
  }

  removeItem(itemId) {
    const index = this.#items.findLastIndex((item) => item.id === itemId);
    if (index !== -1) {
      const removed = this.#items.splice(index, 1)[0];
      this.#history.push({
        action: "remove",
        item: removed,
        timestamp: Date.now(),
      });
      return removed;
    }
    return null;
  }

  getLastItem() {
    return this.#items.at(-1);
  }

  getItem(index) {
    return this.#items.at(index);
  }

  getTotal() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }

  getHistory() {
    return this.#history.map((entry) => ({
      action: entry.action,
      item: entry.item.name,
      timestamp: new Date(entry.timestamp).toLocaleTimeString(),
    }));
  }
}

const cart = new ShoppingCartSystem("cart-123");
cart.addItem({ id: 1, name: "Laptop", price: 999 });
cart.addItem({ id: 2, name: "Mouse", price: 29 });
cart.addItem({ id: 3, name: "Keyboard", price: 79 });

console.log("Last item:", cart.getLastItem());
console.log("Total:", cart.getTotal());
console.log("Removed:", cart.removeItem(2));
console.log("New total:", cart.getTotal());
console.log("History:", cart.getHistory());

// Example 3: Logger with Error Tracking
console.log("\n--- Example 3: Advanced Logger ---");

class AdvancedLogger {
  #logs = [];
  static #instance = null;
  static logLevel = "info";

  static {
    console.log("Logger system initialized");
  }

  constructor() {
    if (AdvancedLogger.#instance) {
      return AdvancedLogger.#instance;
    }
    AdvancedLogger.#instance = this;
  }

  #formatMessage(level, message, metadata) {
    return {
      level,
      message,
      metadata,
      timestamp: new Date().toISOString(),
    };
  }

  info(message, metadata = {}) {
    const log = this.#formatMessage("info", message, metadata);
    this.#logs.push(log);
    console.log(`[INFO] ${message}`);
  }

  error(message, cause) {
    const errorObj = new Error(message, { cause });
    const log = this.#formatMessage("error", message, {
      cause: cause?.message,
      stack: errorObj.stack,
    });
    this.#logs.push(log);
    console.log(`[ERROR] ${message}`);
    if (cause) {
      console.log(`  Caused by: ${cause.message}`);
    }
  }

  getLastLog() {
    return this.#logs.at(-1);
  }

  getLastError() {
    return this.#logs.findLast((log) => log.level === "error");
  }

  getLogs() {
    return this.#logs;
  }
}

const logger = new AdvancedLogger();
logger.info("Application started");
logger.info("Database connected", { host: "localhost", port: 5432 });

try {
  throw new Error("Connection timeout");
} catch (err) {
  logger.error("Database operation failed", err);
}

console.log("Last log:", logger.getLastLog());
console.log("Last error:", logger.getLastError());

// Example 4: Data Processor
console.log("\n--- Example 4: Data Processor ---");

class DataProcessor {
  #data = [];
  #processingErrors = [];

  async loadData(dataSource) {
    try {
      // Simulate async data loading
      await new Promise((resolve) => setTimeout(resolve, 50));
      this.#data = dataSource;
      return { success: true, count: this.#data.length };
    } catch (err) {
      throw new Error("Failed to load data", { cause: err });
    }
  }

  processRecords() {
    this.#processingErrors = [];

    this.#data.forEach((record, index) => {
      try {
        if (!Object.hasOwn(record, "id")) {
          throw new Error(`Record at index ${index} missing id`);
        }
        if (!Object.hasOwn(record, "value")) {
          throw new Error(`Record at index ${index} missing value`);
        }
      } catch (err) {
        this.#processingErrors.push(err);
      }
    });

    if (this.#processingErrors.length > 0) {
      const aggregateErr = new Error(
        `${this.#processingErrors.length} records failed validation`
      );
      aggregateErr.errors = this.#processingErrors;
      throw aggregateErr;
    }

    return { success: true, processed: this.#data.length };
  }

  findLastValid(condition) {
    return this.#data.findLast(condition);
  }

  findLastValidIndex(condition) {
    return this.#data.findLastIndex(condition);
  }

  getErrors() {
    return this.#processingErrors;
  }
}

(async () => {
  const processor = new DataProcessor();

  await processor.loadData([
    { id: 1, value: 100 },
    { id: 2, value: 200 },
    { value: 300 }, // Missing id
    { id: 4, value: 400 },
  ]);

  try {
    processor.processRecords();
  } catch (err) {
    console.log("Processing errors:", err.message);
    console.log(
      "Error details:",
      err.errors.map((e) => e.message)
    );
  }

  const lastValid = processor.findLastValid((r) => r.value > 150);
  console.log("Last record with value > 150:", lastValid);
})();

// Example 5: Text Parser
console.log("\n--- Example 5: Text Parser with Indices ---");

class TextParser {
  #text = "";

  constructor(text) {
    this.#text = text;
  }

  findAllWords() {
    const wordPattern = /\b\w+\b/dg;
    const matches = [...this.#text.matchAll(wordPattern)];
    return matches.map((match) => ({
      word: match[0],
      start: match.indices[0][0],
      end: match.indices[0][1],
    }));
  }

  extractEmails() {
    const emailPattern = /([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/dg;
    const matches = [...this.#text.matchAll(emailPattern)];
    return matches.map((match) => ({
      full: match[0],
      user: match[1],
      domain: match[2],
      position: match.indices[0],
    }));
  }

  highlightPattern(pattern) {
    const regex = new RegExp(pattern, "gd");
    const matches = [...this.#text.matchAll(regex)];
    return matches.map((match) => ({
      text: match[0],
      indices: match.indices[0],
    }));
  }

  getText() {
    return this.#text;
  }
}

const parser = new TextParser(
  "Contact john@example.com or jane@test.org for info"
);
console.log("Text:", parser.getText());
console.log("Words:", parser.findAllWords());
console.log("Emails:", parser.extractEmails());

console.log("");

// ============================================
// ES13 FEATURE SUMMARY
// ============================================

console.log("=== ES13 (ES2022) Complete Feature Summary ===\n");

console.log("✅ 1. Class Fields (Public & Private)");
console.log("   - Declare fields directly in class body");
console.log("   - Use # prefix for private fields");
console.log("");

console.log("✅ 2. Private Methods and Accessors");
console.log("   - Private methods with # prefix");
console.log("   - Private getters and setters");
console.log("");

console.log("✅ 3. Static Class Fields and Methods");
console.log("   - Static fields and private static fields");
console.log("   - Static methods with inheritance");
console.log("");

console.log("✅ 4. Static Initialization Blocks");
console.log("   - static {} blocks for complex initialization");
console.log("   - Multiple blocks and error handling");
console.log("");

console.log("✅ 5. Top-Level await");
console.log("   - Use await at module top level");
console.log("   - Simplifies async module loading");
console.log("");

console.log("✅ 6. .at() Method");
console.log("   - Access array/string elements with negative indices");
console.log("   - Works with TypedArrays");
console.log("");

console.log("✅ 7. Object.hasOwn()");
console.log("   - Safer alternative to hasOwnProperty");
console.log("   - Works with null prototype objects");
console.log("");

console.log("✅ 8. Error.cause");
console.log("   - Chain errors with context");
console.log("   - Track error origins");
console.log("");

console.log("✅ 9. findLast() and findLastIndex()");
console.log("   - Search arrays from the end");
console.log("   - Performance benefits for end-heavy searches");
console.log("");

console.log("✅ 10. RegExp Match Indices (/d flag)");
console.log("   - Get start/end positions of matches");
console.log("   - Works with capturing groups");
console.log("");

console.log("✅ 11. Ergonomic Brand Checks (#field in obj)");
console.log("   - Safe way to check for private fields");
console.log("   - Enables polymorphism with private data");
console.log("");

console.log("🎉 All ES13 features covered with practical examples!");
console.log("📅 Released: June 2022");
console.log("🔗 Specification: ES2022 / ECMA-262 13th Edition\n");
