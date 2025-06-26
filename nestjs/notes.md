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

- **main.ts** inside src/ folder. This is the entry point of our nest js application. This is the first file which will executed. It registers our app on a port number 

- **test/** this directory is for testing any specific feature or any controller.

- **eslint.config.mjs** This file gives warning if we don't follow nest js standards. Purpose: ESLint configuration in modern ES Module format.Defines code style, formatting, linting rules.

- **nest-cli.json** Configuration file for Nest CLI.
 Nestjs cli read this file when we run any command on cli 

- **tsconfig.build.json** This file is used during production. when optimization typescript compilation done this file is used

- **tsconfig.json** This tells how to compile typescript

- **package-lock.json** The dependencies used in our application was listed in package.json file. But There are also subdependencies of these dependencies. So these are listed in this file.Means in this file we get detailed information of the subdependencies or the detailed information of dependenices listed in our package.json file . This file also locks dependency version. Records exact versions of all installed packages and their sub-dependencies.Ensures consistency across different environments and installs.

- **package.json** this file have information regarding our project like versions , script,dependencies

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


### Creating controllers file using cli
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

### Creating services file using cli
- **nest g s service_name** g means generate , s means services

# Modules
- A container where we keep related controllers,services and providers for our application
- Core part of nest js architecture
- Everty nest js app has at least on module
- we should make separate module for each feature. like we have employee feature in our app so we make a module employee and in this we register our employee controller, service. In the main app.module , we import this employee module

### Creating module file using cli
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

# Rest API & HTTP methods (for practical implementation ,check student module )

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

---

# DTO (Data Transfer Object) (for practical implementation check Customer module)
- An object that carries data between layers (like from client to backend).
- Used to define the shape of incoming request data.
- Ensures only required data is passed (security + validation)
- Eg. user had a form on the client side and he is submitting the form. There were three fields inside that form (name,email,password). Now when he submits that form, basicaly we will have a DTO created on the back end. DTO will validate that data. That means it will check that data as we would have already defined this thing inside the DTO that basically the data of student or anything else that is coming to us from frontend , it should only contain name,email, password. There should not be any extra data here. So DTO provides security as we have already define the data that will come from frontend. 
- By default, nest js don't apply dto validations because typscript is compile-time only. During run time , all the validations we have made in typescript, nest js can't apply that. So we need to explicit apply validations using concept **class-validator** , **validation pipes** so that we can apply validations during run time on DTOs

- Install package **class-validator** and **class-transformer** using npm i
- **class-validator** library validates the properties of Typescript classes.In these , we get many such decorators available like isstring, isint, isemail. This ensures data coming from api is of the expected type and format
- **class-transformer** this library helps in converting plain json objects to dto class instances because this class-validator validates data on class instances not on objects. But from the frontend , when data coming from client side is in json format so need to convert this to class instances

# Interface in typescript
- Interface define the structure(Type) of an object
- Help write clean,structured , type-safe code.
- Used for both request(DTOs) and response objects.
- We can use interfaces with DTOs , response objects etc. 

### Doubts regarding dto and interfaces

## What is a DTO (Data Transfer Object)?

A **DTO** is a **TypeScript class** that defines the shape of data you expect to receive or send — especially in communication between client and server.

In your case:

```ts
export class CreateCustomerDto {
  name: string;
  age: number;
}
```

This says: *“When creating a customer, I expect an object with a string `name` and a number `age`.”*

## Why use DTO instead of just an interface or plain `@Body()` object?

### 1. **TypeScript Interfaces are compile-time only**

* Interfaces **do not exist at runtime**.
* You can’t use interfaces for runtime validation or transformation.
* NestJS (and libraries like class-validator) **work with classes**, not interfaces.

### 2. **DTO Classes enable runtime validation**

By defining DTOs as **classes**, you can attach decorators (like from `class-validator`) to validate data automatically:

```ts
import { IsString, IsInt } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
```

Then, with NestJS’s ValidationPipe enabled, invalid data is rejected **before** it reaches your service.

### 3. **Security: Whitelisting properties**

With DTO classes and validation, you can **ensure only expected fields are accepted** and any extra fields are stripped out (using the ValidationPipe option `whitelist: true`).

This protects you from clients sending extra unexpected fields.

## Why not just use `@Body() body: any` or `@Body() body: Customer`?

* `any`: No type safety, no validation, vulnerable to malformed data.
* `Customer` interface: Like other interfaces, no runtime presence → no validation.
* Using DTO classes allows **strict validation and transformation**.


## How does NestJS create DTO instances?

When you use the `@Body()` decorator with a DTO class type like:

```ts
@Post()
addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
  // ...
}
```

NestJS uses **class-transformer** (if ValidationPipe is enabled) to:

* Transform the plain JSON object from the request body into an **instance of the DTO class**.
* Then run the validators attached to the class.

So, you don't create DTO instances manually — NestJS does it for you when handling the incoming request.

---

## Summary

| Aspect                                   | Interface | DTO Class             |
| ---------------------------------------- | --------- | --------------------- |
| Exists at runtime?                       | No        | Yes                   |
| Allows validation?                       | No        | Yes (with decorators) |
| Enables transformation?                  | No        | Yes                   |
| Security (whitelist)                     | No        | Yes                   |
| Used by NestJS `@Body()` for validation? | No        | Yes                   |


## Example with validation

```ts
import { IsString, IsInt } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
```

And enable validation globally in your `main.ts`:

```ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
```

This will **automatically validate incoming data** and reject bad requests.


---
# Custom Pipes (for practical implementation check common folder and myname folder)
- Pipes are used to transform or validate incoming data. 
- NestJS allows you to create your own Custom Pipes.
- They can be used for custom validation, data transformation, or business logic filtering.
- A pipe runs before the data hits the route handler(controller method)
- You can apply pipes at method level, controller level, or globally.
- Custom pipes implement the PipeTransform interface. 
- Generate custom pipes using cli **nest g pipe pipe_name** . pipe_name means for what purpose you are making pipe for like **nest g pipe uppercase**
- Best practice, the above command will make a folder uppercase in the src directory . but we want that we form custom pipes in a seprate folder like a common folder in which we have pipe folder and then uppercase pipe. so for this we use command **nest g pipe common/pipes/uppercase**


# Your Example Recap

You have:

1. **Controller:**

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('myname')
export class MynameController {
  @Post('custom')
  transformName(@Body('name', new UppercasePipe()) name: string) {
    return { message: `Received name: ${name}` };
  }
}
```

2. **Pipe:**

```ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }
}
```


# What’s Happening Here?


## 1. **What is a Pipe in NestJS?**

* Pipes are **classes** that implement the `PipeTransform` interface.
* They receive input data **before** it reaches the route handler.
* Pipes can **transform** the data or **validate** it.
* The transformed data is then passed on to the controller method.

## 2. **Pipe interface — `PipeTransform`**

```ts
export interface PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any;
}
```

* Every pipe must implement a `transform()` method.
* `value` — the input data to transform.
* `metadata` — extra info about the context of the data (like what parameter it's attached to).

---

## 3. **Your custom pipe — `UppercasePipe`**

```ts
@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }
}
```

* The pipe checks if the incoming `value` is a string.
* If yes, it converts it to uppercase.
* Otherwise, it returns the value unchanged.
* The `@Injectable()` decorator marks this class as a provider NestJS can inject if needed (best practice).

---

## 4. **How the pipe is applied in the controller**

```ts
transformName(@Body('name', new UppercasePipe()) name: string)
```

* `@Body('name')` extracts the `name` property from the request body.
* `new UppercasePipe()` tells NestJS to apply this pipe **only** to that `name` property.
* So before `name` gets passed into the method, it flows through the pipe.

Example:

Request body:

```json
{ "name": "john doe" }
```

* `@Body('name')` picks `"john doe"`.
* The pipe receives `"john doe"` as `value`.
* It converts it to `"JOHN DOE"`.
* Controller method receives `"JOHN DOE"` in the `name` parameter.

## 5. **What is `ArgumentMetadata`?**

This is the second parameter passed into `transform()`:

```ts
transform(value: any, metadata: ArgumentMetadata)
```

It contains info about:

* `type`: Where the data comes from (`body`, `query`, `param`, `custom`).
* `metatype`: The expected type (like `String`, `Number`, or a class).
* `data`: The parameter name (e.g., `'name'` in `@Body('name')`).

In your pipe, you’re not using `metadata`, but it’s available for more advanced logic.

---

## 6. **How NestJS calls the pipe**

* When a POST request comes to `/myname/custom` with a body:

```json
{ "name": "john doe" }
```

* NestJS extracts `name` from body using `@Body('name')`.
* It sends `"john doe"` through the `UppercasePipe`’s `transform()` method.
* The pipe returns `"JOHN DOE"`.
* Controller method parameter `name` becomes `"JOHN DOE"`.
* Your method returns `{ message: "Received name: JOHN DOE" }`.

---

## Summary Flow:

| Step | Description                                                                    |
| ---- | ------------------------------------------------------------------------------ |
| 1    | Request hits `/myname/custom` POST endpoint with JSON `{ "name": "john doe" }` |
| 2    | NestJS extracts `name` from body using `@Body('name')`                         |
| 3    | NestJS calls `UppercasePipe.transform('john doe', metadata)`                   |
| 4    | Pipe converts string to uppercase → returns `"JOHN DOE"`                       |
| 5    | Controller method receives `"JOHN DOE"` as `name`                              |
| 6    | Method returns `{ message: "Received name: JOHN DOE" }`                        |
| 7    | Response sent back to client                                                   |

---

## Bonus: Why use pipes?

* **Validation**: Check and reject invalid inputs.
* **Transformation**: Convert formats, trim strings, change cases (like your example).
* **Reusability**: Write once, reuse anywhere by injecting pipes.
* **Clean controllers**: Keep your controller logic simple.


### Pipes can be applied at **method level**, **controller level**, or **globally**—giving you flexible control over when and how data is processed.

Let’s break down each level in detail:

---

## ✅ 1. Method-Level Pipes

### 📌 Scope: Applied only to a specific method (route handler)

### 🔧 How it works:

You apply the pipe directly to a route handler parameter or the entire method.

### 🧪 Example:

```ts
@Get(':id')
getUserById(@Param('id', ParseIntPipe) id: number) {
  return this.userService.findById(id);
}
```

* `ParseIntPipe` ensures that the `id` parameter is parsed into a number.
* If `id` is not a valid integer, NestJS throws a `BadRequestException`.

### ✅ When to use:

* You want strict control over how a specific parameter or method input is validated/transformed.
* Useful for route-level custom behavior.

---

## ✅ 2. Controller-Level Pipes

### 📌 Scope: Applies to all routes in a single controller

### 🔧 How it works:

Use the `@UsePipes()` decorator on the controller class.

### 🧪 Example:

```ts
@UsePipes(new ValidationPipe())
@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
```

* `ValidationPipe` is applied to all handler methods inside the `UsersController`.
* Ensures all incoming data for this controller is validated against DTOs.

### ✅ When to use:

* You want consistent validation across all routes in a controller.
* Avoids repeating `@UsePipes()` on every route method.

---

## ✅ 3. Global-Level Pipes

### 📌 Scope: Applies to **all** routes and controllers in the application.

### 🔧 How it works:

Register global pipes in the main bootstrap file (`main.ts`).

### 🧪 Example:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
```

* `whitelist: true` strips properties that are not part of the DTO.
* `transform: true` automatically transforms payloads into DTO class instances.

### ✅ When to use:

* You want a consistent validation/transformation strategy across the entire app.
* Especially useful for input validation, serialization, and sanitation.

---

## 🔁 Summary Table

| Level          | Scope                       | Use Case                                           | Example Use                         |
| -------------- | --------------------------- | -------------------------------------------------- | ----------------------------------- |
| **Method**     | One route handler           | Validate or transform one specific param           | `@Param('id', ParseIntPipe)`        |
| **Controller** | All methods in a controller | Apply uniform rules to all endpoints in controller | `@UsePipes()` on class              |
| **Global**     | Entire application          | Consistent input validation across app             | `app.useGlobalPipes()` in `main.ts` |


---

# Protecting Routes (for practical implementation check product module and auth folder inside guards folder )

- It means restricting access to specific API routes
- Only authorized users(like logged in users or admins) can access them.
- Done by **Guards**

## Guards
- Guards are classes that implement logic to decide whether a request is allowed or not
- They implement the CanActivate interface and **run before the route handler**
- Mostly used for authentication & authorization 

### Why use Guards
- To sercure private routes
- To avoid duplicating checks in every controller
- To build role-based access control systems

- To generate guard use command **nest g guard guards/auth**  // it will create a auth guard directory inside guards folder 

- Default code generated inside guards folder 
```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

```

---

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

# Exception Filters (for practical implementation check http-exception.filter inside filters folder and exception.controller.ts)

- Handle Errors and exceptions in a centralized way. 
- Help in managing app-wide error handling logic cleanly and consistently.

### Where to use
- Filters can be applied at method-level, controller-level , or gloablly (in main.ts)
- @Catch() decorator is used to define which exception the filter will handle

### generating custom filter using command **nest g filter filters/http-exception**


---
# Middleware (for practical implementation check logger.middleware.ts inside middlwares folder)

- Middleware runs before the request reaches the controller
- Flow:- as soon as request is made from the client side to the front end side , then this middlware function gets executed before that request reaches the controller

### Use cases
- Logging incoming request
- Authentication tokens(checking jwt)
- Request transformation(eg. converting string to numbers)
- Blocking or redirecting requests
- Setting headers

### Middleware vs Guard
- Guard is a feature of nest js . It is not used in express js or node js but middleware is a feature of express js
- We can't use any decorator inside middleware because decorators are part of nest js not express js
- Role base authorisation done by guards . Using middlware we do above usecases

#### Guard
- Before route is accessed(based on auth)
- Authorization (role check, access allowed?)


#### Middlware
- Before controller
- Common tasks(logging,token decode)

### Genearting middlware using command **nest g middleware middleware/logger**
### Default code generated in middlware is 

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}

```

- To apply middleware gloablly, go to app.module file and implement the NestModule interface 