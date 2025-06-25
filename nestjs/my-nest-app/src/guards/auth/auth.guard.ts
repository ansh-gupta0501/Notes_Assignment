import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs'; // used because canActivate can return an Observable<boolean> for asynchronous checks.


@Injectable() // we use injectable so that we can integrate and inject this class into another class using dependency injection.  
export class AuthGuard implements CanActivate {
  canActivate(               // this canActive method is the main method of our guard. This method runs before the controller route becuase in this we write logic for authentication or authorization whether to allow this route or not 
    context: ExecutionContext,  // ExecutionContext: Gives access to the details of the current request, controller, handler, etc
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() // in this we will store whatever request user makes in  the get request 
    
    const authHeader = request.headers['authorization']  // in this we are checking if we are getting anything under the authorization here or not 
    
    return authHeader === 'Bearer my-secret-token';
  
  }
} 
//  It returns:

// true → allow access.

// false → deny access (NestJS will return a 403 Forbidden).

// You can also return a Promise<boolean> or Observable<boolean> for async logic (e.g., DB or token check).


