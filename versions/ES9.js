/**
 * ECMAScript 9 (ES9 / ES2018) - 2018
 *
 * ES9 continued the yearly release cycle with focus on asynchronous programming
 * and improved object manipulation. It introduced major improvements to async/await,
 * regular expressions, and object/array operations.
 *
 * Key Changes:
 * - Asynchronous Iteration (for-await-of)
 * - Promise.prototype.finally()
 * - Rest/Spread Properties for Objects
 * - RegExp improvements (named capture groups, lookbehind assertions, dotAll flag, Unicode property escapes)
 *
 * Note: ES9 significantly improved async patterns and made object manipulation
 * more consistent with array operations from ES6.
 */

console.log("=== ECMAScript 9 (ES9 / ES2018) - 2018 ===");
console.log("ES9 introduced major improvements for async programming\n");

// ============================================
// 1. ASYNCHRONOUS ITERATION (for-await-of)
// ============================================

console.log("=== 1. Asynchronous Iteration (for-await-of) ===");

/**
 * PROBLEM: No clean way to iterate over async data sources (streams, paginated APIs)
 * SOLUTION: ES9 added for-await-of loop for async iterables and async generators
 */

// NEW WAY (ES9): Async iteration with for-await-of
async function demonstrateAsyncIteration() {
  console.log("\n--- Basic Async Iteration ---");

  // Simulate async data source
  async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
  }

  for await (const num of asyncGenerator()) {
    console.log("Async value:", num);
  }
}

// NEW WAY (ES9): Async iteration with promises
async function processAsyncData() {
  console.log("\n--- Processing Async Data ---");

  const promises = [
    Promise.resolve("First"),
    Promise.resolve("Second"),
    Promise.resolve("Third"),
  ];

  for await (const result of promises) {
    console.log("Resolved:", result);
  }
}

// NEW WAY (ES9): Custom async iterable
async function demonstrateCustomAsyncIterable() {
  console.log("\n--- Custom Async Iterable ---");

  const asyncIterable = {
    [Symbol.asyncIterator]() {
      let i = 0;
      return {
        async next() {
          if (i < 3) {
            return { value: await Promise.resolve(i++), done: false };
          }
          return { done: true };
        },
      };
    },
  };

  for await (const value of asyncIterable) {
    console.log("Custom async value:", value);
  }
}

// NEW WAY (ES9): Fetching paginated API data
async function fetchPaginatedData() {
  console.log("\n--- Simulated Paginated API ---");

  async function* paginatedFetch(url, maxPages = 3) {
    for (let page = 1; page <= maxPages; page++) {
      // Simulate API call
      const data = await Promise.resolve({
        page: page,
        data: [`Item ${page * 2 - 1}`, `Item ${page * 2}`],
      });
      yield data;
    }
  }

  for await (const response of paginatedFetch("/api/items")) {
    console.log(`Page ${response.page}:`, response.data);
  }
}

// NEW WAY (ES9): Processing async stream
async function processStream() {
  console.log("\n--- Processing Stream ---");

  async function* streamData() {
    const chunks = ["Hello", " ", "World", "!"];
    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      yield chunk;
    }
  }

  let message = "";
  for await (const chunk of streamData()) {
    message += chunk;
    console.log("Building message:", message);
  }
}

// NEW WAY (ES9): Error handling in async iteration
async function asyncIterationWithErrors() {
  console.log("\n--- Async Iteration with Error Handling ---");

  async function* dataGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    throw new Error("Something went wrong");
  }

  try {
    for await (const value of dataGenerator()) {
      console.log("Value:", value);
    }
  } catch (error) {
    console.log("Caught error:", error.message);
  }
}

// NEW WAY (ES9): Reading file streams (Node.js-like example)
async function processFileStream() {
  console.log("\n--- File Stream Processing (Simulated) ---");

  async function* readLines() {
    const lines = ["Line 1", "Line 2", "Line 3", "Line 4"];
    for (const line of lines) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      yield line;
    }
  }

  let lineNumber = 0;
  for await (const line of readLines()) {
    console.log(`${++lineNumber}: ${line}`);
  }
}

// OLD WAY (ES6/ES7/ES8): Manual promise handling
function processAsyncDataOld() {
  console.log("\n--- Old Way: Manual Promise Handling ---");

  const promises = [
    Promise.resolve("First"),
    Promise.resolve("Second"),
    Promise.resolve("Third"),
  ];

  return promises.reduce((chain, promise) => {
    return chain.then(() =>
      promise.then((result) => {
        console.log("Old - Resolved:", result);
      })
    );
  }, Promise.resolve());
}

// OLD WAY (ES6/ES7/ES8): Using Promise.all (not sequential)
async function processWithPromiseAll() {
  console.log("\n--- Old Way: Promise.all (Not Sequential) ---");

  const promises = [
    Promise.resolve("First"),
    Promise.resolve("Second"),
    Promise.resolve("Third"),
  ];

  const results = await Promise.all(promises);
  results.forEach((result) => {
    console.log("Old - Result:", result);
  });
}

// OLD WAY (ES6/ES7/ES8): Recursive async processing
async function processRecursively(items, index = 0) {
  console.log("\n--- Old Way: Recursive Processing ---");
  if (index >= items.length) return;

  const item = await items[index];
  console.log("Old - Processing:", item);
  await processRecursively(items, index + 1);
}

console.log("");

// ============================================
// 2. PROMISE.PROTOTYPE.FINALLY()
// ============================================

console.log("=== 2. Promise.prototype.finally() ===");

/**
 * PROBLEM: Cleanup code had to be duplicated in both .then() and .catch()
 * SOLUTION: ES9 added .finally() which runs regardless of promise outcome
 */

// NEW WAY (ES9): Using finally()
console.log("\n--- Promise finally() ---");

function fetchDataWithFinally() {
  let isLoading = true;
  console.log("Loading: true");

  return Promise.resolve({ data: "User data" })
    .then((response) => {
      console.log("Success:", response.data);
      return response;
    })
    .catch((error) => {
      console.log("Error:", error.message);
    })
    .finally(() => {
      isLoading = false;
      console.log("Loading: false (cleanup in finally)");
    });
}

fetchDataWithFinally();

// NEW WAY (ES9): finally() runs on rejection too
console.log("\n--- finally() with rejection ---");

function fetchWithError() {
  let isLoading = true;
  console.log("Loading: true");

  return Promise.reject(new Error("Network error"))
    .then((response) => {
      console.log("Success:", response);
    })
    .catch((error) => {
      console.log("Error caught:", error.message);
    })
    .finally(() => {
      isLoading = false;
      console.log("Loading: false (runs even on error)");
    });
}

fetchWithError();

// NEW WAY (ES9): Chaining after finally()
console.log("\n--- Chaining after finally() ---");

Promise.resolve(42)
  .finally(() => {
    console.log("Finally block executed");
    // Return value is ignored
    return 999;
  })
  .then((value) => {
    console.log("Original value preserved:", value); // 42, not 999
  });

// NEW WAY (ES9): finally() doesn't receive arguments
Promise.resolve("data").finally((value) => {
  console.log("finally() receives no args:", value); // undefined
});

// NEW WAY (ES9): finally() with rejection in finally
console.log("\n--- Rejection in finally() ---");

Promise.resolve("success")
  .finally(() => {
    console.log("Finally executed");
    throw new Error("Error in finally");
  })
  .catch((error) => {
    console.log("Caught error from finally:", error.message);
  });

// NEW WAY (ES9): Practical example - closing connections
async function databaseOperation() {
  console.log("\n--- Database Operation Example ---");
  const connection = { connected: true };
  console.log("Database connected:", connection.connected);

  return Promise.resolve({ rows: [1, 2, 3] })
    .then((result) => {
      console.log("Query result:", result.rows);
      return result;
    })
    .catch((error) => {
      console.log("Query error:", error);
      throw error;
    })
    .finally(() => {
      connection.connected = false;
      console.log("Database connection closed:", !connection.connected);
    });
}

databaseOperation();

// NEW WAY (ES9): Loading spinner example
console.log("\n--- Loading Spinner Example ---");

function showSpinner() {
  console.log("🔄 Spinner shown");
}

function hideSpinner() {
  console.log("✓ Spinner hidden");
}

showSpinner();
Promise.resolve({ items: [1, 2, 3] })
  .then((data) => {
    console.log("Data loaded:", data);
    return data;
  })
  .catch((error) => {
    console.log("Error:", error.message);
  })
  .finally(() => {
    hideSpinner();
  });

// NEW WAY (ES9): Multiple finally blocks
console.log("\n--- Multiple finally() blocks ---");

Promise.resolve("data")
  .finally(() => {
    console.log("First finally");
  })
  .finally(() => {
    console.log("Second finally");
  })
  .then((value) => {
    console.log("Value:", value);
  });

// NEW WAY (ES9): File operations cleanup
async function writeFile(filename, content) {
  console.log("\n--- File Operation Example ---");
  const fileHandle = { open: true };
  console.log("File opened:", filename);

  return Promise.resolve()
    .then(() => {
      console.log("Writing content:", content);
      return { success: true };
    })
    .catch((error) => {
      console.log("Write failed:", error.message);
      throw error;
    })
    .finally(() => {
      fileHandle.open = false;
      console.log("File closed");
    });
}

writeFile("data.txt", "Hello World");

// OLD WAY (ES6/ES7/ES8): Duplicating cleanup code
console.log("\n--- Old Way: Duplicated Cleanup ---");

function fetchDataOld() {
  let isLoading = true;
  console.log("Old - Loading: true");

  return Promise.resolve({ data: "User data" })
    .then((response) => {
      console.log("Old - Success:", response.data);
      isLoading = false;
      console.log("Old - Loading: false (in then)");
      return response;
    })
    .catch((error) => {
      console.log("Old - Error:", error.message);
      isLoading = false; // Duplicated!
      console.log("Old - Loading: false (in catch)");
      throw error;
    });
}

fetchDataOld();

// OLD WAY (ES6/ES7/ES8): Using helper function
console.log("\n--- Old Way: Helper Function ---");

function fetchWithHelper() {
  let isLoading = true;
  console.log("Old - Loading: true");

  function cleanup() {
    isLoading = false;
    console.log("Old - Loading: false (helper function)");
  }

  return Promise.resolve({ data: "User data" })
    .then((response) => {
      console.log("Old - Success:", response.data);
      cleanup();
      return response;
    })
    .catch((error) => {
      console.log("Old - Error:", error.message);
      cleanup(); // Still need to call in both places
      throw error;
    });
}

fetchWithHelper();

// OLD WAY (ES6/ES7/ES8): Try-catch-finally pattern
async function fetchWithTryCatch() {
  console.log("\n--- Old Way: Try-Catch-Finally ---");
  let isLoading = true;
  console.log("Old - Loading: true");

  try {
    const response = await Promise.resolve({ data: "User data" });
    console.log("Old - Success:", response.data);
    return response;
  } catch (error) {
    console.log("Old - Error:", error.message);
    throw error;
  } finally {
    isLoading = false;
    console.log("Old - Loading: false (try-catch-finally)");
  }
}

fetchWithTryCatch();

console.log("");

// ============================================
// 3. REST/SPREAD PROPERTIES FOR OBJECTS
// ============================================

console.log("=== 3. Rest/Spread Properties for Objects ===");

/**
 * PROBLEM: ES6 had rest/spread for arrays but not objects
 * SOLUTION: ES9 extended rest/spread syntax to work with objects
 */

// NEW WAY (ES9): Object spread
console.log("\n--- Object Spread ---");

const defaults = { theme: "light", language: "en", notifications: true };
const userPrefs = { theme: "dark", fontSize: 14 };

const settings = { ...defaults, ...userPrefs };
console.log("Merged settings:", settings);
// { theme: 'dark', language: 'en', notifications: true, fontSize: 14 }

// NEW WAY (ES9): Shallow cloning objects
const original = { a: 1, b: 2, c: 3 };
const clone = { ...original };
console.log("Cloned object:", clone);
console.log("Are they same reference?", original === clone); // false

// NEW WAY (ES9): Adding properties
const user = { name: "Alice", age: 30 };
const userWithId = { ...user, id: 123, verified: true };
console.log("User with ID:", userWithId);

// NEW WAY (ES9): Overriding properties
const baseConfig = { host: "localhost", port: 3000, ssl: false };
const prodConfig = { ...baseConfig, host: "example.com", ssl: true };
console.log("Production config:", prodConfig);

// NEW WAY (ES9): Conditional properties
const isAdmin = true;
const userData = {
  name: "Bob",
  email: "bob@example.com",
  ...(isAdmin && { role: "admin", permissions: ["read", "write", "delete"] }),
};
console.log("User data:", userData);

// NEW WAY (ES9): Merging multiple objects
const obj1 = { a: 1, b: 2 };
const objTwo = { c: 3, d: 4 };
const obj3 = { e: 5, f: 6 };
const merged = { ...obj1, ...objTwo, ...obj3 };
console.log("Merged objects:", merged);

// NEW WAY (ES9): Updating nested objects immutably
const state = {
  user: { name: "Charlie", age: 25 },
  settings: { theme: "dark" },
};

const updatedStates = {
  ...state,
  user: { ...state.user, age: 26 },
};
console.log("Updated state:", updatedStates);
console.log("Original unchanged:", state.user.age); // 25

// NEW WAY (ES9): Object rest properties
console.log("\n--- Object Rest Properties ---");

const person = { name: "Charlie", age: 25, country: "USA", city: "NYC" };
const { name, age, ...location } = person;
console.log("Name:", name);
console.log("Age:", age);
console.log("Location:", location); // { country: 'USA', city: 'NYC' }

// NEW WAY (ES9): Rest in function parameters
function createUser({ id, password, ...publicInfo }) {
  console.log("Storing password separately...");
  console.log("Public info:", publicInfo);
  return { id, ...publicInfo };
}

const newUser = createUser({
  id: 1,
  name: "Diana",
  email: "diana@example.com",
  password: "secret123",
});
console.log("Created user:", newUser);

// NEW WAY (ES9): Excluding properties
const fullData = { id: 1, name: "Product", price: 99, internal_notes: "..." };
const { internal_notes, ...publicData } = fullData;
console.log("Public data:", publicData);

// NEW WAY (ES9): Nested destructuring with rest
const config = {
  server: { host: "localhost", port: 3000 },
  database: { host: "db.local", port: 5432 },
  cache: { enabled: true },
};

const { server, ...otherConfig } = config;
console.log("Server:", server);
console.log("Other config:", otherConfig);

// NEW WAY (ES9): Dynamic property updates
function updateObject(obj, updates) {
  return { ...obj, ...updates };
}

const appStates = { count: 0, loading: false };
const newState = updateObject(appStates, { count: 1, loading: true });
console.log("Updated state:", newState);

// NEW WAY (ES9): Removing properties (functional way)
function removeProperty(obj, prop) {
  const { [prop]: removed, ...resProperties } = obj;
  return resProperties;
}

const item = { id: 1, name: "Item", temp: "temporary" };
const cleaned = removeProperty(item, "temp");
console.log("Cleaned object:", cleaned);

// NEW WAY (ES9): Extracting specific properties
function pick(obj, ...keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

const data = {
  id: 1,
  name: "Product",
  price: 99,
  stock: 50,
  category: "Electronics",
};
const summary = pick(data, "id", "name", "price");
console.log("Summary:", summary);

// NEW WAY (ES9): Default values with spread
const userSettings = { theme: "dark" };
const completeSettings = {
  theme: "light",
  language: "en",
  notifications: true,
  ...userSettings,
};
console.log("Complete settings:", completeSettings);

// NEW WAY (ES9): Combining arrays in objects
const list1 = { items: [1, 2, 3] };
const list2 = { items: [4, 5, 6] };
const combined = {
  ...list1,
  items: [...list1.items, ...list2.items],
};
console.log("Combined lists:", combined);

// OLD WAY (ES6/ES7/ES8): Object.assign()
console.log("\n--- Old Way: Object.assign() ---");

const defaultsOld = { theme: "light", language: "en", notifications: true };
const userPrefsOld = { theme: "dark", fontSize: 14 };

const settingsOld = Object.assign({}, defaultsOld, userPrefsOld);
console.log("Old - Merged settings:", settingsOld);

// OLD WAY (ES6/ES7/ES8): Manual cloning
const originalOld = { a: 1, b: 2, c: 3 };
const cloneOld = Object.assign({}, originalOld);
console.log("Old - Cloned object:", cloneOld);

// OLD WAY (ES6/ES7/ES8): Manual property exclusion
const personOld = { name: "Charlie", age: 25, country: "USA", city: "NYC" };
const locationOld = {};
Object.keys(personOld).forEach((key) => {
  if (key !== "name" && key !== "age") {
    locationOld[key] = personOld[key];
  }
});
console.log("Old - Location:", locationOld);

// OLD WAY (ES6/ES7/ES8): Manual property addition
const userOld = { name: "Alice", age: 30 };
const userWithIdOld = Object.assign({}, userOld, { id: 123, verified: true });
console.log("Old - User with ID:", userWithIdOld);

// OLD WAY (ES5): Manual object merge
var obj1Old = { a: 1, b: 2 };
var obj2Old = { c: 3, d: 4 };
var mergedOld = {};
for (var key in obj1Old) {
  mergedOld[key] = obj1Old[key];
}
for (var key in obj2Old) {
  mergedOld[key] = obj2Old[key];
}
console.log("Old - Manual merge:", mergedOld);

console.log("");

// ============================================
// 4. REGEXP NAMED CAPTURE GROUPS
// ============================================

console.log("=== 4. RegExp Named Capture Groups ===");

/**
 * PROBLEM: Numbered capture groups ($1, $2) are hard to read and maintain
 * SOLUTION: ES9 added named capture groups using (?<name>...) syntax
 */

// NEW WAY (ES9): Named capture groups
console.log("\n--- Named Capture Groups ---");

const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = dateRegex.exec("2024-12-04");

console.log("Year:", match.groups.year); // "2024"
console.log("Month:", match.groups.month); // "12"
console.log("Day:", match.groups.day); // "04"
console.log("Full match:", match[0]);

// NEW WAY (ES9): Using with replace()
const text = "John Smith";
const nameRegex = /(?<first>\w+) (?<last>\w+)/;
const reversed = text.replace(nameRegex, "$<last>, $<first>");
console.log("Reversed name:", reversed); // "Smith, John"

// NEW WAY (ES9): Using with replace() callback
const formatted = text.replace(
  nameRegex,
  (match, p1, p2, offset, string, groups) => {
    return `${groups.last}, ${groups.first}`;
  }
);
console.log("Formatted name:", formatted);

// NEW WAY (ES9): Email parsing
const email = "user@example.com";
const emailRegex = /(?<username>[^@]+)@(?<domain>.+)/;
const emailMatch = emailRegex.exec(email);
console.log("Username:", emailMatch.groups.username);
console.log("Domain:", emailMatch.groups.domain);

// NEW WAY (ES9): URL parsing
const url = "https://example.com:8080/path";
const urlRegex =
  /(?<protocol>https?):\/\/(?<host>[^:\/]+)(:(?<port>\d+))?(?<path>\/.*)?/;
const urlMatch = urlRegex.exec(url);
console.log("URL parts:", urlMatch.groups);

// NEW WAY (ES9): Phone number formatting
const phone = "123-456-7890";
const phoneRegex = /(?<area>\d{3})-(?<prefix>\d{3})-(?<line>\d{4})/;
const formattedPhone = phone.replace(phoneRegex, "($<area>) $<prefix>-$<line>");
console.log("Formatted phone:", formattedPhone);

// NEW WAY (ES9): Destructuring groups
const dateStr = "2024-12-04";
const {
  groups: { year, month, day },
} = dateRegex.exec(dateStr);
console.log(`Date: ${year}/${month}/${day}`);

// NEW WAY (ES9): Credit card formatting
const card = "1234567890123456";
const cardRegex =
  /(?<part1>\d{4})(?<part2>\d{4})(?<part3>\d{4})(?<part4>\d{4})/;
const maskedCard = card.replace(cardRegex, "$<part1> **** **** $<part4>");
console.log("Masked card:", maskedCard);

// NEW WAY (ES9): Time parsing
const time = "14:30:45";
const timeRegex = /(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2})/;
const timeMatch = timeRegex.exec(time);
console.log("Time components:", timeMatch.groups);

// NEW WAY (ES9): IP address parsing
const ip = "192.168.1.1";
const ipRegex =
  /(?<octet1>\d+)\.(?<octet2>\d+)\.(?<octet3>\d+)\.(?<octet4>\d+)/;
const ipMatch = ipRegex.exec(ip);
console.log("IP octets:", ipMatch.groups);

// NEW WAY (ES9): Backreferences with named groups
const duplicateRegex = /(?<word>\w+)\s+\k<word>/;
const hasDuplicate = duplicateRegex.test("hello hello");
console.log("Has duplicate word:", hasDuplicate); // true

// OLD WAY (ES5-ES8): Numbered groups
console.log("\n--- Old Way: Numbered Groups ---");

const dateRegexOld = /(\d{4})-(\d{2})-(\d{2})/;
const matchOld = dateRegexOld.exec("2024-12-04");

console.log("Old - Year:", matchOld[1]);
console.log("Old - Month:", matchOld[2]);
console.log("Old - Day:", matchOld[3]);

// OLD WAY (ES5-ES8): Replace with numbered groups
const textOld = "John Smith";
const nameRegexOld = /(\w+) (\w+)/;
const reversedOld = textOld.replace(nameRegexOld, "$2, $1");
console.log("Old - Reversed:", reversedOld);

// OLD WAY (ES5-ES8): Manual extraction
const emailOld = "user@example.com";
const emailRegexOld = /([^@]+)@(.+)/;
const emailMatchOld = emailRegexOld.exec(emailOld);
const usernameOld = emailMatchOld[1];
const domainOld = emailMatchOld[2];
console.log("Old - Username:", usernameOld);
console.log("Old - Domain:", domainOld);

console.log("");

// ============================================
// 5. REGEXP LOOKBEHIND ASSERTIONS
// ============================================

console.log("=== 5. RegExp Lookbehind Assertions ===");

/**
 * PROBLEM: ES5 had lookahead (?=) but not lookbehind
 * SOLUTION: ES9 added positive (?<=) and negative (?<!) lookbehind
 */

// NEW WAY (ES9): Positive lookbehind (?<=)
console.log("\n--- Positive Lookbehind ---");

const price1 = "$100";
const dollarRegex = /(?<=\$)\d+/;
const amount = price1.match(dollarRegex);
console.log("Amount after $:", amount[0]); // "100" (without $)

// NEW WAY (ES9): Negative lookbehind (?<!)
const mixed = "100 $200 €300";
const noDollarRegex = /(?<!\$)\d+/g;
const nonDollarAmounts = mixed.match(noDollarRegex);
console.log("Amounts NOT preceded by $:", nonDollarAmounts);

// NEW WAY (ES9): Username without @
const mentions = "Hello @john and @jane";
const usernameRegex = /(?<=@)\w+/g;
const usernames = mentions.match(usernameRegex);
console.log("Usernames:", usernames); // ["john", "jane"]

// NEW WAY (ES9): Getting numbers after specific words
const sentence = "Price: 100, Cost: 200, Fee: 50";
const priceRegex = /(?<=Price: )\d+/;
const priceValue = sentence.match(priceRegex);
console.log("Price value:", priceValue[0]);

// NEW WAY (ES9): Combining lookbehind and lookahead
const code = "function test() { return 42; }";
const funcNameRegex = /(?<=function )\w+(?=\()/;
const funcName = code.match(funcNameRegex);
console.log("Function name:", funcName[0]);

// NEW WAY (ES9): File extension without dot
const filename = "document.pdf";
const extRegex = /(?<=\.)\w+$/;
const extension = filename.match(extRegex);
console.log("Extension:", extension[0]); // "pdf"

// NEW WAY (ES9): CSS color values
const css = "color: #FF5733; background: #00FF00;";
const colorRegex = /(?<=#)[A-F0-9]{6}/gi;
const colors = css.match(colorRegex);
console.log("Color values:", colors);

// NEW WAY (ES9): Temperature values
const weather = "Today: 75°F, Tomorrow: 68°F";
const tempRegex = /(?<=: )\d+(?=°F)/g;
const temperatures = weather.match(tempRegex);
console.log("Temperatures:", temperatures);

// NEW WAY (ES9): Hashtags without #
const post = "Love this #javascript and #es2018 features!";
const hashtagRegex = /(?<=#)\w+/g;
const hashtags = post.match(hashtagRegex);
console.log("Hashtags:", hashtags);

// NEW WAY (ES9): Negative lookbehind - numbers not after $
const prices2 = "Items: 5, Cost: $20, Tax: $3";
const nonPriceRegex = /(?<!\$)\b\d+\b/g;
const quantities = prices2.match(nonPriceRegex);
console.log("Non-price numbers:", quantities);

// OLD WAY (ES5-ES8): Capturing and removing
console.log("\n--- Old Way: Manual Extraction ---");

const price1Old = "$100";
const matchPrice = price1Old.match(/\$(\d+)/);
const amountOld = matchPrice ? matchPrice[1] : null;
console.log("Old - Amount:", amountOld);

// OLD WAY (ES5-ES8): Using replace
const mentionsOld = "Hello @john and @jane";
const usernamesOld = [];
mentionsOld.replace(/@(\w+)/g, (match, username) => {
  usernamesOld.push(username);
});
console.log("Old - Usernames:", usernamesOld);

// OLD WAY (ES5-ES8): Manual parsing
const sentenceOld = "Price: 100, Cost: 200, Fee: 50";
const priceMatch = sentenceOld.match(/Price: (\d+)/);
const priceValueOld = priceMatch ? priceMatch[1] : null;
console.log("Old - Price value:", priceValueOld);

// OLD WAY (ES5-ES8): Split and filter
const filenameOld = "document.pdf";
const extensionOld = filenameOld.split(".").pop();
console.log("Old - Extension:", extensionOld);

console.log("");

// ============================================
// 6. REGEXP s (dotAll) FLAG
// ============================================

console.log("=== 6. RegExp s (dotAll) Flag ===");

/**
 * PROBLEM: . in regex doesn't match line terminators (\n, \r)
 * SOLUTION: ES9 added 's' flag to make . match any character including newlines
 */

// NEW WAY (ES9): Using s flag
console.log("\n--- dotAll Flag ---");

const multiline = "Hello\nWorld";
const dotAllRegex = /Hello.World/s;
console.log("Matches with s flag:", dotAllRegex.test(multiline)); // true

// NEW WAY (ES9): Matching across multiple lines
const html = "<div>\n  <span>Text</span>\n</div>";
const tagRegex = /<div>.*<\/div>/s;
console.log("HTML match:", tagRegex.test(html)); // true

// NEW WAY (ES9): Extracting content with newlines
const text2 = "Start\n\nMiddle\n\nEnd";
const contentRegex = /Start.*End/s;
const extracted = text2.match(contentRegex);
console.log("Extracted:", extracted[0]);

// NEW WAY (ES9): Complex patterns
const code2 = `
function test() {
  return 42;
}
`;
const functionRegex = /function.*}/s;
console.log("Function matched:", functionRegex.test(code2)); // true

// NEW WAY (ES9): Matching block comments
const sourceCode = `
let x = 10;
/* This is a
   multiline comment */
let y = 20;
`;
const commentRegex = /\/\*.*?\*\//s;
const comment = sourceCode.match(commentRegex);
console.log("Found comment:", comment ? "Yes" : "No");

// NEW WAY (ES9): XML/HTML tag content
const xml = "<data>\n  Value\n</data>";
const dataRegex = /<data>.*<\/data>/s;
console.log("XML matches:", dataRegex.test(xml));

// NEW WAY (ES9): Checking dotAll flag
const regex1 = /./s;
console.log("Has dotAll flag:", regex1.dotAll); // true
const regex2 = /./;
console.log("Without s flag:", regex2.dotAll); // false

// OLD WAY (ES5-ES8): Using [\s\S] workaround
console.log("\n--- Old Way: [\\s\\S] Workaround ---");

const multilineOld = "Hello\nWorld";
const workaroundRegex = /Hello[\s\S]World/;
console.log("Old - Matches:", workaroundRegex.test(multilineOld)); // true

// OLD WAY (ES5-ES8): Using (.|\n)
const altRegex = /Hello(.|\n)World/;
console.log("Old - Alternative:", altRegex.test(multilineOld)); // true

// OLD WAY (ES5-ES8): Using [^] (matches any character)
const anyCharRegex = /Hello[^]World/;
console.log("Old - [^] method:", anyCharRegex.test(multilineOld)); // true

console.log("");

// ============================================
// 7. REGEXP UNICODE PROPERTY ESCAPES
// ============================================

console.log("=== 7. RegExp Unicode Property Escapes ===");

/**
 * PROBLEM: Matching Unicode characters by category was difficult
 * SOLUTION: ES9 added \p{} and \P{} for Unicode property escapes
 */

// NEW WAY (ES9): Matching by Unicode category
console.log("\n--- Unicode Property Escapes ---");

const greekText = "Hello Δημοκρατία World";
const greekRegex = /\p{Script=Greek}+/u;
const greekMatch = greekText.match(greekRegex);
console.log("Greek text:", greekMatch ? greekMatch[0] : "none");

// NEW WAY (ES9): Matching emojis
const textWithEmoji = "Hello 😀 World 🌍";
const emojiRegex = /\p{Emoji}/gu;
const emojis = textWithEmoji.match(emojiRegex);
console.log("Emojis found:", emojis);

// NEW WAY (ES9): Matching all letters (any script)
const multiScript = "Hello Привет 你好 مرحبا";
const letterRegex = /\p{Letter}+/gu;
const words = multiScript.match(letterRegex);
console.log("Words in different scripts:", words);

// NEW WAY (ES9): Matching numbers in any script
const numbers2 = "123 ١٢٣ ๑๒๓"; // Arabic and Thai numerals
const numberRegex = /\p{Number}+/gu;
const allNumbers = numbers2.match(numberRegex);
console.log("Numbers:", allNumbers);

// NEW WAY (ES9): Matching currency symbols
const prices = "$100 €200 ¥300 £400";
const currencyRegex = /\p{Currency_Symbol}/gu;
const currencies = prices.match(currencyRegex);
console.log("Currency symbols:", currencies);

// NEW WAY (ES9): Negative Unicode property
const text3 = "Hello123World";
const nonLetterRegex = /\P{Letter}+/gu;
const nonLetters = text3.match(nonLetterRegex);
console.log("Non-letters:", nonLetters);

// NEW WAY (ES9): General category
const mixed2 = "Hello, World! 123";
const punctuationRegex = /\p{Punctuation}/gu;
const punctuation = mixed2.match(punctuationRegex);
console.log("Punctuation:", punctuation);

// NEW WAY (ES9): Matching whitespace
const text4 = "Hello\t\nWorld";
const whitespaceRegex = /\p{White_Space}+/gu;
const spaces = text4.match(whitespaceRegex);
console.log("Whitespace found:", spaces.length);

// NEW WAY (ES9): Uppercase letters
const text5 = "Hello WORLD";
const uppercaseRegex = /\p{Uppercase_Letter}+/gu;
const uppercase = text5.match(uppercaseRegex);
console.log("Uppercase:", uppercase);

// NEW WAY (ES9): Math symbols
const formula = "x + y = z × 2";
const mathRegex = /\p{Math_Symbol}/gu;
const mathSymbols = formula.match(mathRegex);
console.log("Math symbols:", mathSymbols);

// OLD WAY (ES5-ES8): Manual character ranges
console.log("\n--- Old Way: Manual Ranges ---");

const greekTextOld = "Hello Δημοκρατία World";
const greekRegexOld = /[Α-Ωα-ω]+/g; // Only covers basic Greek
const greekMatchOld = greekTextOld.match(greekRegexOld);
console.log("Old - Greek (limited):", greekMatchOld);

// OLD WAY (ES5-ES8): Limited emoji detection
const textWithEmojiOld = "Hello 😀 World";
// No reliable way to match emojis without Unicode properties
console.log("Old - No built-in emoji detection");

console.log("");

// ============================================
// PRACTICAL EXAMPLES
// ============================================

console.log("=== Practical Examples ===");

// Example 1: Async data fetching with pagination
console.log("\n--- Example 1: Async Pagination ---");

async function fetchAllPages() {
  async function* fetchPages() {
    for (let page = 1; page <= 3; page++) {
      const data = await Promise.resolve({
        page,
        items: [`Item ${page}-1`, `Item ${page}-2`],
      });
      yield data;
    }
  }

  const allItems = [];
  for await (const response of fetchPages()) {
    console.log(`Processing page ${response.page}`);
    allItems.push(...response.items);
  }
  console.log("All items:", allItems);
}

fetchAllPages();

// Example 2: API request with loading state
console.log("\n--- Example 2: API with finally ---");

async function fetchUser(id) {
  console.log(`Fetching user ${id}...`);

  return Promise.resolve({ id, name: "Alice", email: "alice@example.com" })
    .then((user) => {
      console.log("User loaded:", user.name);
      return user;
    })
    .catch((error) => {
      console.error("Failed to load user:", error.message);
      throw error;
    })
    .finally(() => {
      console.log("Request completed");
    });
}

fetchUser(123);

// Example 3: Immutable state updates
console.log("\n--- Example 3: Immutable Updates ---");

const appState = {
  user: { name: "Bob", age: 30 },
  settings: { theme: "dark" },
  data: [1, 2, 3],
};

const updatedState = {
  ...appState,
  user: { ...appState.user, age: 31 },
  settings: { ...appState.settings, notifications: true },
};

console.log("Updated state:", updatedState);
console.log("Original unchanged:", appState.user.age === 30);

// Example 4: Form data validation with named groups
console.log("\n--- Example 4: Email Validation ---");

function validateEmail(email) {
  const emailPattern =
    /^(?<local>[a-z0-9.]+)@(?<domain>[a-z0-9.-]+\.[a-z]{2,})$/i;
  const match = emailPattern.exec(email);

  if (match) {
    console.log("Valid email!");
    console.log("  Local part:", match.groups.local);
    console.log("  Domain:", match.groups.domain);
    return true;
  }
  console.log("Invalid email");
  return false;
}

validateEmail("user@example.com");

// Example 5: Log parsing with lookbehind
console.log("\n--- Example 5: Log Parsing ---");

const logEntry = "[2024-12-04] ERROR: Connection failed";
const levelRegex = /(?<=\] )\w+(?=:)/;
const level = logEntry.match(levelRegex);
console.log("Log level:", level[0]);

const messageRegex = /(?<=: ).+$/;
const message2 = logEntry.match(messageRegex);
console.log("Message:", message2[0]);

// Example 6: Processing streamed data
console.log("\n--- Example 6: Stream Processing ---");

async function processDataStream() {
  async function* dataStream() {
    const batches = [
      { batch: 1, data: [1, 2, 3] },
      { batch: 2, data: [4, 5, 6] },
      { batch: 3, data: [7, 8, 9] },
    ];

    for (const batch of batches) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      yield batch;
    }
  }

  let total = 0;
  for await (const batch of dataStream()) {
    const sum = batch.data.reduce((a, b) => a + b, 0);
    total += sum;
    console.log(`Batch ${batch.batch}: ${sum} (total: ${total})`);
  }
  console.log("Final total:", total);
}

processDataStream();

// Example 7: Redux-style reducer
console.log("\n--- Example 7: Redux Reducer ---");

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "SET_USER":
      return { ...state, user: { ...action.payload } };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    default:
      return state;
  }
}

let reduxState = { count: 0, user: null, settings: { theme: "light" } };
reduxState = reducer(reduxState, { type: "INCREMENT" });
console.log("After INCREMENT:", reduxState);

reduxState = reducer(reduxState, {
  type: "SET_USER",
  payload: { name: "Alice", id: 1 },
});
console.log("After SET_USER:", reduxState);

// Example 8: Parsing markdown-style links
console.log("\n--- Example 8: Markdown Link Parser ---");

const markdown =
  "Check [Google](https://google.com) and [GitHub](https://github.com)";
const linkRegex = /\[(?<text>[^\]]+)\]\((?<url>[^)]+)\)/g;

let linkMatch;
while ((linkMatch = linkRegex.exec(markdown)) !== null) {
  console.log(`Link: ${linkMatch.groups.text} -> ${linkMatch.groups.url}`);
}

// Example 9: Sanitizing user input
console.log("\n--- Example 9: Sanitizing Input ---");

function sanitizeUserData(userData) {
  const { password, ssn, creditCard, ...safeData } = userData;
  return safeData;
}

const userInput = {
  name: "John",
  email: "john@example.com",
  password: "secret123",
  ssn: "123-45-6789",
  creditCard: "1234-5678-9012-3456",
  preferences: { theme: "dark" },
};

const sanitized = sanitizeUserData(userInput);
console.log("Sanitized data:", sanitized);

// Example 10: Async iterator for API with rate limiting
console.log("\n--- Example 10: Rate-Limited API ---");

async function rateLimitedFetch() {
  async function* fetchWithDelay(items, delayMs = 200) {
    for (const item of items) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      yield await Promise.resolve({ id: item, data: `Data ${item}` });
    }
  }

  console.log("Fetching with rate limit...");
  for await (const result of fetchWithDelay([1, 2, 3, 4, 5])) {
    console.log("Fetched:", result);
  }
  console.log("All requests completed");
}

rateLimitedFetch();

console.log("");

// ============================================
// EDGE CASES AND GOTCHAS
// ============================================

console.log("=== Edge Cases and Gotchas ===");

// Gotcha 1: Shallow cloning with spread
console.log("\n--- Gotcha 1: Spread is Shallow ---");

const nested = { a: 1, b: { c: 2 } };
const shallowClone = { ...nested };
shallowClone.b.c = 999;
console.log("Original affected:", nested.b.c); // 999 (both changed!)

// Correct way: deep clone needed objects
const deepClone = { ...nested, b: { ...nested.b } };
deepClone.b.c = 3;
console.log("Original safe:", nested.b.c); // Still 999 from above

// Gotcha 2: finally() return value is ignored
console.log("\n--- Gotcha 2: finally() return ignored ---");

Promise.resolve(42)
  .finally(() => {
    return 100; // This is ignored!
  })
  .then((value) => {
    console.log("Value still:", value); // 42, not 100
  });

// Gotcha 3: finally() can change rejection
Promise.reject(new Error("Original"))
  .finally(() => {
    throw new Error("New error");
  })
  .catch((error) => {
    console.log("Error changed:", error.message); // "New error"
  });

// Gotcha 4: Named groups still have numbered indices
console.log("\n--- Gotcha 4: Both Named and Numbered Available ---");

const regex = /(?<year>\d{4})-(?<month>\d{2})/;
const result = regex.exec("2024-12");
console.log("Named:", result.groups.year);
console.log("Numbered:", result[1]); // Still available
console.log("Same value:", result.groups.year === result[1]);

// Gotcha 5: Lookbehind has fixed length
console.log("\n--- Gotcha 5: Lookbehind Limitations ---");

// This works (fixed length)
const fixedLookbehind = /(?<=\$\$)\d+/;
console.log("Fixed lookbehind:", fixedLookbehind.test("$100"));

// Variable length lookbehind works in ES9 (not in all engines)
try {
  const varLookbehind = /(?<=\$+)\d+/;
  console.log("Variable lookbehind:", varLookbehind.test("$$100"));
} catch (e) {
  console.log("Variable lookbehind not supported");
}

// Gotcha 6: for-await-of with sync iterables
console.log("\n--- Gotcha 6: for-await-of with Sync Iterables ---");

async function syncIterableTest() {
  const syncArray = [1, 2, 3];
  // for-await-of works with sync iterables too
  for await (const num of syncArray) {
    console.log("Sync iterable:", num);
  }
}

syncIterableTest();

// Gotcha 7: Object spread order matters
console.log("\n--- Gotcha 7: Spread Order Matters ---");

const obj = { a: 1, b: 2 };
const result1 = { a: 999, ...obj }; // obj.a overwrites
console.log("obj spreads last:", result1); // { a: 1, b: 2 }

const result2 = { ...obj, a: 999 }; // 999 overwrites obj.a
console.log("literal spreads last:", result2); // { a: 999, b: 2 }

// Gotcha 8: Unicode property escapes require 'u' flag
console.log("\n--- Gotcha 8: Unicode Requires 'u' Flag ---");

try {
  // const noFlag = /\p{Letter}/; // SyntaxError without 'u'
  const withFlag = /\p{Letter}/u; // OK
  console.log("Unicode escapes need 'u' flag");
} catch (e) {
  console.log("Error:", e.message);
}

// Gotcha 9: dotAll flag doesn't affect ^ and $
console.log("\n--- Gotcha 9: dotAll Doesn't Affect Anchors ---");

const text6 = "line1\nline2";
const regex3 = /^.*$/s;
console.log("Matches with s flag:", regex3.test(text6)); // true
console.log("But match:", text6.match(regex3)[0]); // Only "line1" (^ and $ still respect newlines)

// With multiline flag
const regex4 = /^.*$/ms;
console.log("With m flag too:", text6.match(regex4)[0]);

// Gotcha 10: Rest must be last in destructuring
console.log("\n--- Gotcha 10: Rest Must Be Last ---");

const obj2 = { a: 1, b: 2, c: 3 };
// const { a, ...restKeyVals, c } = obj2; // SyntaxError in real code!
// Correct way:
const { a, c, ...restKeyVals } = obj2;

console.log("");

// ============================================
// BROWSER COMPATIBILITY NOTES
// ============================================

console.log("=== Browser Compatibility ===");

console.log("\nAsynchronous Iteration:");
console.log("- Chrome: 63+");
console.log("- Firefox: 57+");
console.log("- Safari: 12+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.0+");

console.log("\nPromise.prototype.finally():");
console.log("- Chrome: 63+");
console.log("- Firefox: 58+");
console.log("- Safari: 11.1+");
console.log("- Edge: 18+");
console.log("- Node.js: 10.0+");

console.log("\nObject Rest/Spread:");
console.log("- Chrome: 60+");
console.log("- Firefox: 55+");
console.log("- Safari: 11.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 8.3+");

console.log("\nRegExp Named Capture Groups:");
console.log("- Chrome: 64+");
console.log("- Firefox: 78+");
console.log("- Safari: 11.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.0+");

console.log("\nRegExp Lookbehind Assertions:");
console.log("- Chrome: 62+");
console.log("- Firefox: 78+");
console.log("- Safari: 16.4+");
console.log("- Edge: 79+");
console.log("- Node.js: 9.0+");

console.log("\nRegExp dotAll Flag:");
console.log("- Chrome: 62+");
console.log("- Firefox: 78+");
console.log("- Safari: 12+");
console.log("- Edge: 79+");
console.log("- Node.js: 9.0+");

console.log("\nRegExp Unicode Property Escapes:");
console.log("- Chrome: 64+");
console.log("- Firefox: 78+");
console.log("- Safari: 11.1+");
console.log("- Edge: 79+");
console.log("- Node.js: 10.0+");

console.log("\nPolyfill/Transpiler: Use Babel for older environments");

console.log("");

// ============================================
// POLYFILLS
// ============================================

console.log("=== Polyfills (for older browsers) ===");

// Polyfill for Promise.prototype.finally()
if (typeof Promise.prototype.finally !== "function") {
  Promise.prototype.finally = function (onFinally) {
    return this.then(
      (value) => Promise.resolve(onFinally()).then(() => value),
      (reason) =>
        Promise.resolve(onFinally()).then(() => {
          throw reason;
        })
    );
  };
}

console.log("Promise.finally() polyfill added");

// Note: Other ES9 features cannot be easily polyfilled:
console.log("\nFeatures requiring transpilation (Babel):");
console.log("- Asynchronous iteration (for-await-of)");
console.log("- Object rest/spread properties");
console.log("- RegExp features (named groups, lookbehind, dotAll, Unicode)");

console.log("");

// ============================================
// MIGRATION TIPS
// ============================================

console.log("=== Migration Tips from ES8 to ES9 ===");

console.log("\n1. Async Iteration:");
console.log("   Before: Promise chains or async/await with loops");
console.log("   After: Use for-await-of for cleaner async loops");

console.log("\n2. Cleanup Code:");
console.log("   Before: Duplicate code in .then() and .catch()");
console.log("   After: Use .finally() for cleanup logic");

console.log("\n3. Object Manipulation:");
console.log("   Before: Object.assign() for cloning/merging");
console.log("   After: Use spread operator {...obj}");

console.log("\n4. Property Extraction:");
console.log("   Before: Manual property filtering");
console.log("   After: Use rest properties { prop, ...rest }");

console.log("\n5. RegExp Readability:");
console.log("   Before: Numbered capture groups $1, $2");
console.log("   After: Named capture groups $<name>");

console.log("\n6. Pattern Matching:");
console.log("   Before: Complex workarounds for lookbehind");
console.log("   After: Use (?<=...) and (?<!...)");

console.log("\n7. Multiline Matching:");
console.log("   Before: [\\s\\S] workaround");
console.log("   After: Use 's' flag with .");

console.log("\n8. Unicode Handling:");
console.log("   Before: Manual character ranges");
console.log("   After: Use \\p{Property} with 'u' flag");

console.log("");

// ============================================
// SUMMARY
// ============================================

console.log("\n=== ES9 (ES2018) SUMMARY ===");

console.log("\nMajor Features:");
console.log("✓ Asynchronous Iteration - for-await-of loops");
console.log("✓ Promise.finally() - cleanup regardless of outcome");
console.log("✓ Object Rest/Spread - ...obj and { ...rest }");
console.log("✓ RegExp Named Capture Groups - (?<name>...)");
console.log("✓ RegExp Lookbehind - (?<=...) and (?<!...)");
console.log("✓ RegExp dotAll Flag - 's' flag for . matching newlines");
console.log("✓ RegExp Unicode Properties - \\p{Property}");

console.log("\n=== Key Improvements ===");
console.log("1. Async Programming:");
console.log("   - Cleaner iteration over async data");
console.log("   - Better cleanup patterns with finally()");
console.log("   - Improved stream processing");

console.log("\n2. Object Manipulation:");
console.log("   - Consistent with array spread/rest");
console.log("   - Immutable updates made easier");
console.log("   - Cleaner function parameters");

console.log("\n3. Regular Expressions:");
console.log("   - More readable with named groups");
console.log("   - More powerful with lookbehind");
console.log("   - Better multiline support");
console.log("   - Proper Unicode handling");

console.log("\n=== Practical Impact ===");
console.log("For developers, ES9 meant:");
console.log("1. Easier async stream processing (APIs, files)");
console.log("2. Cleaner promise cleanup code");
console.log("3. More intuitive object operations");
console.log("4. Better regex maintainability");
console.log("5. Improved internationalization support");
console.log("6. Consistency with modern patterns");

console.log("\n=== Common Use Cases ===");
console.log("- Paginated API fetching");
console.log("- Stream processing (files, network)");
console.log("- Redux-style state management");
console.log("- Form validation and parsing");
console.log("- Log parsing and analysis");
console.log("- Internationalized text processing");

console.log("\n=== ES9 Features Complete ===");

// Run all async examples
(async () => {
  try {
    await demonstrateAsyncIteration();
    await processAsyncData();
    await demonstrateCustomAsyncIterable();
    await fetchPaginatedData();
    await processStream();
    await asyncIterationWithErrors();
    await processFileStream();
    await processAsyncDataOld();
    await processWithPromiseAll();
  } catch (error) {
    console.error("Error in async examples:", error);
  }
})();
