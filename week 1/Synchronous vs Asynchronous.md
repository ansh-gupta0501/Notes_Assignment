
---

````markdown
# Synchronous vs Asynchronous in JavaScript

## 🕰️ Synchronous vs Asynchronous

- **Synchronous**: Executes code line by line, waiting for each operation to finish.
- **Asynchronous**: Allows tasks to happen in the background, not blocking further code execution.

Common asynchronous operations in JavaScript:
- User input
- API calls
- File system I/O
- Uploading/downloading files
- Database operations
- Interacting with external services

---

## 1. 🧵 Callback Approach

```js
import fs from 'node:fs';

const fileWriteCompleted = () => {
  console.log("file written");
};

const data = JSON.stringify({});

fs.writeFile("./data.json", data, fileWriteCompleted);
````

### ❗ Callback Hell (Pyramid of Doom)

```js
fs.writeFile("./file1.json", data, () => {
  console.log("file 1 written");
  fs.writeFile("./file2.json", data, () => {
    console.log("file 2 written");
    fs.writeFile("./file3.json", data, () => {
      console.log("file 3 written");
      fs.writeFile("./file4.json", data, () => {
        console.log("file 4 written");
      });
    });
  });
});
```

---

## 2. 📦 Promises

```js
import fs from 'node:fs/promises';

const data = JSON.stringify({});

fs.writeFile("./file1.json", data)
  .then(() => fs.writeFile("./file2.json", data))
  .then(() => fs.writeFile("./file3.json", data))
  .then(() => fs.writeFile("./file4.json", data))
  .then(() => console.log("All files written"));
```

---

## 3. 🧘 Async/Await

```js
import fs from 'node:fs/promises';

async function writeFiles() {
  await fs.writeFile("./file1.json", data);
  await fs.writeFile("./file2.json", data);
  await fs.writeFile("./file3.json", data);
  await fs.writeFile("./file4.json", data);
}

writeFiles().then(() => console.log("file written"));
```

---

## 🔧 Error Handling

### Using Try/Catch (Async/Await)

```js
try {
  const rawData = await fs.readFile("./data.json");
  const dataObj = JSON.parse(rawData);
} catch (err) {
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);
}
```

### Using `.catch()` with Promises

```js
fs.readFile("./data.json")
  .then(rawData => JSON.parse(rawData))
  .catch(err => {
    console.log(`Error Name: ${err.name}`);
    console.log(`Error Message: ${err.message}`);
  });
```

---

## 🚨 The `throw` Keyword

Used to manually throw errors during execution:

### With Callbacks

```js
import fs from 'node:fs';

fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.log("error reading the file");
    throw err;
  }

  try {
    const dataObj = JSON.parse(data);
    console.log(dataObj);
    console.log("complete");
  } catch (err) {
    console.log("cannot parse JSON from file");
    throw err;
  }
});
```

---

## 🛠️ Wrapping Callback APIs with Promises

```js
import fsc from 'node:fs';

const readFile = async (filename) => {
  return new Promise((resolve, reject) => {
    fsc.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
```

### Using it in Chain:

```js
import fs from 'node:fs/promises';

fs.readFile('./data.json', 'utf8')
  .then(data => {
    const dataObj = JSON.parse(data);
    console.log(dataObj);
    console.log("complete");
  })
  .then(() => readFile('./data.json'))
  .then(data => console.log(data))
  .catch(err => {
    console.log("could not complete loading and parsing");
    throw err;
  });
```

---

## 🔁 Using Async/Await with Try/Catch

```js
import fs from 'node:fs/promises';

async function loadData() {
  try {
    const data = await fs.readFile('./data.json', 'utf8');
    const dataObj = JSON.parse(data);
    console.log(dataObj);
    console.log("complete");
  } catch (err) {
    console.log("could not load and parse file");
    throw err;
  }
}

loadData().then(() => console.log("Promise completed"));
```

---

## ⏳ Top-Level Await

* Top-level `await` allows awaiting in ES modules directly at the top level.

```js
import fs from 'node:fs/promises';

const rawData = await fs.readFile('./data.json', 'utf8');
const dataObj = JSON.parse(rawData);
console.log(dataObj);
```

> 📌 Note: Top-level await works only in ES modules (`type: "module"` in package.json or using `.mjs` files)

---

## ✅ Summary

| Approach    | Syntax Style      | Best For                                  |
| ----------- | ----------------- | ----------------------------------------- |
| Callback    | Nested functions  | Legacy systems, SDKs                      |
| Promises    | `.then().catch()` | Chaining tasks                            |
| Async/Await | `async`/`await`   | Cleaner async code, better error handling |

---

```

```
