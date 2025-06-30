
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
