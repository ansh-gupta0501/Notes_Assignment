
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

| Feature            | Middleware                         | Guards                                                  |
| ------------------ | ---------------------------------- | ------------------------------------------------------- |
| Purpose            | Request pre-processing             | Authorization / conditional route activation            |
| Runs before/after  | **Before** route handler           | **Before** route handler, after middleware              |
| Access to DI?      | Yes (if injectable)                | Yes                                                     |
| Access to req/res? | Yes                                | Only request and context (no direct access to response) |
| Can block request? | Yes (by not calling `next()`)      | Yes (by returning `false` or throwing exception)        |
| Used with          | `apply()` in `configure()`         | `@UseGuards()` decorator on routes or controllers       |
| Return value       | Nothing (uses `next()` to proceed) | `boolean` or `Promise<boolean>` or throws an exception  |


---
### Why Not Use Middleware for Authorization in NestJS?

- Middleware runs before the NestJS lifecycle:
- It can't access route metadata (e.g., @Roles() decorator).
- No access to Dependency Injection unless you use @Injectable() middleware carefully.

- Guards are designed for authorization:
- Guards can access route metadata, like roles or permissions.
- They integrate with decorators like @UseGuards() and @Roles().
