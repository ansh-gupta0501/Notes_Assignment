// asyncHandler.js – Error Wrapper for Async Routes

/*
 Express doesn't automatically catch errors in async functions- you must use try/catch for next(err) manually. this code is a wrapper that simplifies this.

*/


//making wrapper function which is used to handle async task using try catch and using promises


// const asyncHandler = ()=>{}
// const asyncHandler = (func) => {async () => {}}
// const asyncHandler = (func) => async () => {}



//using try catch 

// const asyncHandler = (fn) => async (req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false,
//             message : error.message
//         })
//     }
// }



//using promises

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
               .catch((err)=>{next(err)})  /// Forward to Express error middleware
    }
}

export {asyncHandler}



//example use
// app.get("/user", asyncHandler(async (req, res) => {
//     const user = await getUser();
//     res.json(user);
// }));

/*
You pass an async function to asyncHandler(...).

asyncHandler(...) returns a new function: (req, res, next) => { ... }

That returned function is what Express stores as the handler for the GET /user/:id route.

So this is conceptually the same as:

const routeHandler = asyncHandler(async (req, res, next) => { ... });
app.get("/user/:id", routeHandler);

When an HTTP GET request comes in to /user/:id, Express calls that stored route handler function:


routeHandler(req, res, next);
Inside the route handler:

Promise.resolve(requestHandler(req, res, next))
       .catch((err) => next(err));
*/

/*

## 🧠 Problem It Solves

### ❌ Without `asyncHandler`:

Express doesn’t automatically catch errors from `async/await` functions.

```js
app.get("/user", async (req, res) => {
    const user = await getUser(); // If this throws an error...
    res.json(user);
});
```

If `getUser()` throws (e.g., DB error), Express **won't handle it** and the server can crash or hang.

---

## ✅ Solution: `asyncHandler`

You wrap your route handlers with `asyncHandler`, which:

* Automatically **catches async errors**
* Passes them to your centralized error middleware using `next(err)`

---

## 🔍 Code Explanation

```js
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err)); // Forward to Express error middleware
    }
}
```

### 🛠 What's going on:

* `asyncHandler()` takes one parameter: your **async route handler**.
* It **wraps** the handler inside a function that runs it as a **Promise**.
* If the Promise rejects (i.e., throws an error), `.catch()` grabs it and calls `next(err)`.


---

## 💥 Example Usage

```js
app.get("/user", asyncHandler(async (req, res, next) => {
    const user = await getUser(); // Let's say this fails
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.json(user);
}));
```

### 🔄 Behind the scenes:

* If `getUser()` throws or rejects:

  * `asyncHandler` catches it
  * It calls `next(err)`
  * The error is handled by your error middleware

---

## 🧩 Works With Central Error Handler

Your `errorHandler.js` (central middleware):

```js
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    });
};
```

Then in `app.js`:

```js
app.use(errorHandler);
```

---

## ✅ Benefits of Using `asyncHandler`

| Feature                | Benefit                               |
| ---------------------- | ------------------------------------- |
| Handles async errors   | No more `try/catch` blocks everywhere |
| Cleaner code           | Routes stay readable                  |
| Central error handling | Consistent responses                  |
| Reusable               | Wrap any async route or middleware    |

---

## 📌 Summary

`asyncHandler`:

* Prevents crashes from uncaught async errors.
* Keeps your route code clean.
* Lets Express handle all errors centrally.

---

Let me know if you want to integrate this into a starter backend template or see how to write your own middleware using this pattern!

*/