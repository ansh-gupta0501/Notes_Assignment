
### Role based Authorization(for practical implementation check role folder inside guards folder)

- first generate guard **nest g guard guards/roles**
- make file roles.decorator.ts and roles.enums.ts
- make controller user-roles

### Reflector

Great question! The `Reflector` class in NestJS is a **powerful utility** for reading metadata set using decorators like `SetMetadata` (e.g. your `@Roles()`).

---

## 🧰 Commonly Used Methods in `Reflector` Class

Here are the most useful and commonly used methods of the `Reflector` class:

| Method                                            | Description                                                                             |                                                    |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `get<T>(metadataKey, target)`                     | Get metadata for a specific target (class or method)                                    |                                                    |
| \`getAll<T>(metadataKey, targets: Array\<Function | Type<any>>)\`                                                                           | Get metadata from all targets (e.g. method, class) |
| `getAllAndMerge<T>(metadataKey, targets)`         | Collects metadata from all targets and merges the results into a single array           |                                                    |
| `getAllAndOverride<T>(metadataKey, targets)`      | Returns the **first defined metadata** found in the list of targets (top-down override) |                                                    |

Let’s go through them one by one:

---

### 1. `get<T>(metadataKey, target)`

🔹 **Get metadata from a single target**

```ts
const roles = this.reflector.get<Role[]>('roles', context.getHandler());
```

* Use this if you just want to get metadata from **one target** (method or class).
* If metadata isn’t present, returns `undefined`.

---

### 2. `getAll<T>(metadataKey, targets)`

🔹 **Get metadata from multiple targets without merging or overriding**

```ts
const roles = this.reflector.getAll<Role[]>('roles', [
  context.getHandler(),
  context.getClass()
]);
```

* Returns an array of metadata values (can contain `undefined` if not found).
* It **doesn’t merge or override** — just collects all values.

Example output:

```ts
[ ['admin'], ['user'] ]
```

---

### 3. `getAllAndMerge<T>(metadataKey, targets)`

🔹 **Get and merge all values into a single array**

```ts
const roles = this.reflector.getAllAndMerge<Role[]>('roles', [
  context.getHandler(),
  context.getClass()
]);
```

* If handler has `['admin']` and class has `['user']`, you get:

```ts
['admin', 'user']
```

* Good for **accumulating all roles** without overriding.

---

### 4. `getAllAndOverride<T>(metadataKey, targets)`

🔹 **Get the first defined metadata value**

```ts
const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
  context.getHandler(),
  context.getClass()
]);
```

* If method-level has `['admin']`, it returns that.
* If not, and class-level has `['user']`, it returns that.
* Used when **method-level metadata should override** class-level metadata.

---

## 📘 Example Use Case Summary

| Use case                                           | Use this                            |
| -------------------------------------------------- | ----------------------------------- |
| You only care about **method** or **class**        | `get()`                             |
| You want to **see all metadata**, even `undefined` | `getAll()`                          |
| You want to **merge roles** from method + class    | `getAllAndMerge()`                  |
| You want **method-level to override class-level**  | `getAllAndOverride()` ✅ (your case) |

---

## 💡 Bonus: When to use which?

| Method                | Behavior                | Ideal When                                      |
| --------------------- | ----------------------- | ----------------------------------------------- |
| `get()`               | Simple fetch            | You know exactly where metadata is set          |
| `getAll()`            | Just collect            | You're inspecting or debugging multiple layers  |
| `getAllAndMerge()`    | Combine all values      | You want all possible permissions/roles applied |
| `getAllAndOverride()` | Prioritize method-level | You want specific route-level settings to win   |

---
