
## 🔍 What Is a Mock Database?

### ❓ Real Problem

When testing this:

```js
router.post('/users', (req, res) => {
  // save user to DB
  res.send({ userId: 0 });
});
```

In a real app, you'd save the user to a database like:

```js
const userId = await userService.saveUser(username, password);
res.send({ userId });
```

But in tests, you **don't want to connect to the real database**, because:

* It's **slow**
* It can have **side effects** (like writing real data)
* It makes tests **less reliable and harder to isolate**

---

### ✅ Mocking: The Solution

> A **mock** is a fake version of a real module or function, used just for testing.

Mocking lets you **simulate** the behavior of your DB or services:

* Return fake values (e.g., a `userId`)
* Track if the function was called
* Control its output and behavior

---

## 🛠️ How to Set Up a Mock for DB

### Step 1: Extract DB logic into a separate file

👉 `services/userService.js`

```js
// services/userService.js
export async function saveUser(username, password) {
  // Imagine this connects to a real DB
  return 42; // mock userId
}
```

---

### Step 2: Use it in your route via **dependency injection**

👉 `routes/hello.js` becomes:

```js
import express from 'express';

const router = express.Router();

export default function createRouter(userService) {
  router.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
  });

  router.post('/users', async (req, res) => {
    const { password, username } = req.body;
    if (!password || !username) {
      return res.sendStatus(400);
    }

    const userId = await userService.saveUser(username, password);
    res.send({ userId });
  });

  return router;
}
```

---

### Step 3: Update `app.js` to inject real service
This setup requires a makeApp() function that takes those dependencies (your mocked services) and returns an Express app configured with the routes.


👉 `app.js`:

```js
import express from 'express';
import createRouter from './routes/hello.js';

export default function makeApp(dependencies) {
  const app = express();
  app.use(express.json());
  app.use('/api', createRouter(dependencies));
  return app;
}

```

---

---

## ✅ What You Achieve Here

| Feature                    | Without Mocking | With Mocking                   |
| -------------------------- | --------------- | ------------------------------ |
| Test DB logic?             | ❌               | ✅ if needed                    |
| Test route behavior?       | ✅               | ✅                              |
| DB side effects?           | ✅               | ❌                              |
| Fast and isolated?         | ❌               | ✅                              |
| Easy to simulate failures? | ❌               | ✅ (use `.mockRejectedValue()`) |

---

## 🧪 Bonus: Simulate a DB error

You can also test error handling:

```js
mockUserService.saveUser = jest.fn().mockRejectedValue(new Error("DB down"));
```

---

## 📝 Summary

* **Mocking a database** means replacing real DB functions with fake ones during tests.
* You use **dependency injection** to inject the mocked service into your route.
* This keeps your tests **fast, safe, and focused**.
* Use `jest.fn().mockResolvedValue()` to simulate returns, and `mockRejectedValue()` for errors.

---

Would you like a version of this using a **class-based service**, or saving users in an in-memory list to simulate a mini-DB?
