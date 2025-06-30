
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

