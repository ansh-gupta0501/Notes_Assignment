
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
