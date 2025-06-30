
# Dependency Injection (DI)

- **Dependency** means that a class depends on another class and **Injection** means provide that dependency automatically.

- Now injections means , you don't need to do manually work, nest js automatically provide that dependency.

- Hence, DI is a mechanism where the framework automatically provides the required dependencies - without creating them manually.
- DI is done by creating constructor in controller

### Importance
- It makes the code reusable and clean
- It makes testing easier
- It promotes loose coupling(classes don't tightly depend on each other)
- It improves readability and maintainability

### **Why directly creating a service instance (`new CategoryService()`) inside a controller is generally a bad idea in NestJS** and what benefits Dependency Injection (DI) brings.

```ts
@Controller('category')
export class CategoryController {
    // constructor(private readonly categoryService: CategoryService){}
    private categoryService = new CategoryService();  // direct instantiation

    @Get()
    getAllCategories(){
        return this.categoryService.getCategories();
    }
}
```

## Why **not** use `new CategoryService()` directly?

### 1. **Breaks the Dependency Injection System**

NestJS uses a **Dependency Injection container** that manages the lifecycle of your providers (services).

* When you write

  ```ts
  constructor(private readonly categoryService: CategoryService) {}
  ```

  NestJS injects the *singleton instance* of `CategoryService` created and managed by the DI container.

* If you use `new CategoryService()`, you bypass this container, creating a **new instance every time the controller is instantiated**.

### 2. **Loss of Singleton Behavior**

* DI container creates **one instance per provider** by default.
* Your direct `new` approach creates **multiple instances** — this may cause inconsistent state or wasted resources if your service keeps state or uses expensive resources (like database connections).

### 3. **Difficult to Manage Dependencies in the Service**

If `CategoryService` itself has dependencies (like a repository or another service), you lose the ability to inject those automatically.

* NestJS automatically resolves and injects dependencies recursively.
* If you create with `new CategoryService()`, you must manually create and manage its dependencies, which can become messy and error-prone.

### 4. **Harder to Test and Mock**

* With DI, you can easily **mock** or replace `CategoryService` during testing by overriding the provider.
* With direct instantiation, your tests become more coupled to the concrete implementation and harder to isolate.

### 5. **Missing Lifecycle Hooks and Interceptors**

* NestJS providers may implement lifecycle hooks (`onModuleInit`, `onModuleDestroy`) that the DI container calls automatically.
* Direct instantiation bypasses these hooks.

## What Dependency Injection gives you:

* **Singleton/shared instances** across the app.
* **Automatic recursive resolution** of dependencies.
* Easier **testing and mocking**.
* Cleaner, **decoupled, maintainable code**.
* Supports **lifecycle hooks**, interceptors, and other NestJS features.

## Recommended way — use constructor injection:

```ts
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getAllCategories(){
        return this.categoryService.getCategories();
    }
}
```

## Summary Table:

| Aspect                 | Direct `new` Instantiation       | Using Dependency Injection        |
| ---------------------- | -------------------------------- | --------------------------------- |
| Object lifecycle       | New instance every time          | Singleton/shared instance managed |
| Dependency management  | Manual                           | Automatic recursive injection     |
| Testability            | Hard to mock                     | Easy to mock/override in tests    |
| NestJS lifecycle hooks | Bypassed                         | Supported                         |
| Resource usage         | Inefficient (multiple instances) | Efficient (singleton/reusable)    |

---
