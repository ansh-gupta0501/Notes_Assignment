### Nest js
- A progressive Node.js framework for building efficient and scalable server-side appliations.
- Built with typescript and heavily inspired by Angular.
- Used modular architecture for better organization.


### Why we need nest js
- To simplify backend development using modern architecture
- Provides a structured way to build scalable and testable applications
- Solves the limitations of traditional express apps.


### Difference between express vs nest

- Express is unopinionated framework. (means there is no fixed structure in this)(we can make project in single file or by multiple folders)(to fixed file name stucture). means it is very flexible. Different developers have different way for writing code 

- Nest js  is opinionated framework . less flexible but more scalable. anyone can understand the code as it has fixed structure

- Nestjs have many build in support like database integration , graphql , rest api


### Benefits of nest js 
- Fully supports Typescript
- Built-in dependency injection system
- Easy integration with databases, websockets,graphql, microservices
- Scalbale and maintainable codebase
- Active and growing community support

---

### Installation
- npm i -g @nest/cli      - nest js command line interface tool which is used to control the nest using commands 
- nest new project-name  - this command will only run if we have nest js cli installed 

### File and folder structure

- **app.controller.spec.ts** inside src/ folder. This file is for testing of our controller file **app.controller.ts**. This is for unit testing 

- **app.controller.ts** inside src/folder. this is controller file in which we work with req, res. take request and send response 

- **app.module.ts** inside src/folder. As nestjs is based on modules. In the module file, we tell about our  imports , controllers, providers we use in our project. This file is basically our root module and all imports , controllers are registered in this file. 

- **app.service.ts** inside src/folder. In this file we write our business logic, calculations. Controller file call this service file. Whatever req comes to controller , controller call the service based on the request

**main.ts** inside src/ folder. This is the entry point of our nest js application. This is the first file which will executed. It registers our app on a port number 

**test/** this directory is for testing any specific feature or any controller.

**eslint.config.mjs** This file gives warning if we don't follow nest js standards. Purpose: ESLint configuration in modern ES Module format.Defines code style, formatting, linting rules.

**nest-cli.json** Configuration file for Nest CLI.
 Nestjs cli read this file when we run any command on cli 

**tsconfig.build.json** This file is used during production. when optimization typescript compilation done this file is used

**tsconfig.json** This tells how to compile typescript

**package-lock.json** The dependencies used in our application was listed in package.json file. But There are also subdependencies of these dependencies. So these are listed in this file.Means in this file we get detailed information of the subdependencies or the detailed information of dependenices listed in our package.json file . This file also locks dependency version. Records exact versions of all installed packages and their sub-dependencies.Ensures consistency across different environments and installs.

**package.json** this file have information regarding our project like versions , script,dependencies

| File/Folder                  | Purpose                                 |
| ---------------------------- | --------------------------------------- |
| `src/app.controller.ts`      | Handles requests and sends responses    |
| `src/app.service.ts`         | Business logic layer                    |
| `src/app.module.ts`          | Main module for configuration           |
| `src/main.ts`                | Entry point of the application          |
| `src/app.controller.spec.ts` | Unit test for controller                |
| `test/`                      | Folder for integration/end-to-end tests |
| `eslint.config.mjs`          | Code linting configuration              |
| `nest-cli.json`              | Nest CLI behavior config                |
| `tsconfig.json`              | TypeScript compiler settings            |
| `tsconfig.build.json`        | Production build TypeScript settings    |
| `package.json`               | Project metadata and dependencies       |
| `package-lock.json`          | Exact dependency lock file              |


---

# Controllers
- Controllers handle incoming HTTP requests. It is first place where http requests lands first
- They define routes(eg. GET,POST,PUT,DELETE)
- Bridge between client and business login (services)

### Importance of Controllers
- Organize API endpoints clearly and modularly.
- Help separate concerns: routing vs business logic
- Make code scalable and maintainable.
- Improve code readability with clearn structure

### Decorators
- They are special functions that give special behaviour to a class , method, or parameter. 
- They define meta data of any parameter, of any method ,of any class, as to what special powers this class, method or parameter have.
- Start with @symbol (eg., @Controller(),@Get())
- Tell nest js how to treat the class or method
- Used for routing , dependency injection , validation etc. 


### creating controllers file using cli
- **nest g controller controller_name**  g means generate . It will create a folder with name controller_name and inside that folder , it also create 2 files controller_name.controller.ts and controller_name.controller.spec.ts (for testing).
It will also update the app.module file by registering controller in that. 

# Services
- A typescript class with logic like calculations, data access ,etc.
- Used to write business logic in a clean and reusable way.
- They are marked with @injectable() so nest js can use them . 
- We have to provide our services inside the controllers. so we use @injectable decorator. Nest js internally inject the services inside the controller

### Why Use services??
- To separate logic from controllers
- Makes code modular, clean and testable
- services can be reused in mutiple places
- Helps keep your app organized and scalable.

### Important points 
- Always use @Injectable() decorator on services
- Inject services into controllers using constructor injection 
- Services are part of the dependency injection system.
- Logic like fetching data , calculations, or API calls goes inside services.

### creating services file using cli
- **nest g s service_name** g means generate , s means services

# Modules
- A container where we keep related controllers,services and providers for our application
- Core part of nest js architecture
- Everty nest js app has at least on module
- we should make separate module for each feature. like we have employee feature in our app so we make a module employee and in this we register our employee controller, service. In the main app.module , we import this employee module

### creating module file using cli
- **nest g module module_name** g means generate

# Architecture Overview of nest js 
- Nest js architecture is modular,scalable and maintainable.
- This pattern helps in writing reusable and well-structured code .

### Client(User)
- The person or app that sends a request(e.g,. from browser or mobile). in short frontend
- Triggers the process by accessing an endpoint (like /products.)

### Controller
- Acts like a receptionist
- Request generated by client is received by the controller
- Calls the right service method to handle logic
- Sends back a response to the client

### Service
- Contains business logic(eg, fetch data, apply rules)
- Does not deal with HTTP direcly- just logic

### Provider
- Any class that can be injected and reused (like service, custom classes, etc.)
- Registered in the module to be used via Dependency injection 

### Module
- The container that groups controllers, services and providers.
- Organizes the app into features (Eg., ProductModule, UserModule)
- Helps keep the app scalable and clean

### Dependency Injection
- NestJS automatically provides services where they are needed.
- You don't create new instances manually.
- Improves testability and reusability.

### Decorators
- Special functions starting with @ (eg, @Controller(), @Injectable())
- Tell nestjs how to treat a class, method, or variable
- Used for routing , injecting services, and more. 

---

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

### **why directly creating a service instance (`new CategoryService()`) inside a controller is generally a bad idea in NestJS** and what benefits Dependency Injection (DI) brings.

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

# Rest API & HTTP methods

### What is an api?
- It allows two applications to talk to each other.( frontend and backend communicate with each other through api )

- Acts as a bridge between frontend and backend

### What is REST api?
- REST = Representational State Transfer
- It is a type of API that follows certain rules.
- Uses HTTP methods like GET,POST,PUT,PATCH,DELETE
- Simple, scalable,stateless(no need to store anything in memory) communication


### HTTP methods
- GET :- Used to read or fetch data
- POST :- Used to create new data
- PUT :- Used to update existing data completely
- PATCH :- Used to partially update existing data
- Delete :- Used to remove data.
 
 ### Importance of Rest API
 - Organzes how clients interact with your server.
 - Keeps code clean, structured, and reusable
 - Makes your backend work like a service