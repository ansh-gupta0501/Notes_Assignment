import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.enums';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}           // Reflector :- The meta data that you are setting inside your decorator like there can be user or admin inside this decorator . so to get these values reflector is used 
  
  canActivate( context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    
   //this.reflector.getAllAndOverride<T>(key: string, targets: (Function | Type<any>)[]): T
  /*
  It reads metadata stored using SetMetadata() (used in your @Roles() decorator).
  It checks multiple targets (like a method and a class).
  It returns the first non-undefined value it finds, going from top (method) to bottom (class).


   The decorator metadata (@Roles())
@Roles(Role.Admin)
Behind the scenes, this is like doing:

SetMetadata('roles', ['admin'])
This metadata gets attached to:

the method (getAdminData)

or optionally the class (UserRolesController)


So This:

Checks for metadata key 'roles'

First in the method (context.getHandler()), then in the controller class (context.getClass())

Returns the first value found (an array of roles), or undefined if not found

  */


/*
🔁 Example Behavior:
// controller
@Roles(Role.Admin)  // ← attached to class
@Controller('admin')
export class AdminController {
  
  @Get('settings')
  @Roles(Role.User)  // ← attached to handler
  getSettings() {}
}
In this case:

getSettings() has @Roles(Role.User) (method-level) → this will be used.

Even though class has @Roles(Role.Admin), it will be overridden by method-level.

So:

getAllAndOverride<Role[]>(ROLES_KEY, [getSettings, AdminController])
// returns ['user'] — method-level overrides class-level
*/
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>( // values inside decorator will be of type Role defined in enum  // getAllAndOverride() → Looks for roles metadata on the method and controller.
      ROLES_KEY , [
        (context.getHandler()) ,    // getHandler() get the metadata of your handler

        context.getClass()     // it get the metadata of your class
       ]
    )    // basically we are extracting the meta data (which was set using setMetadata function) using reflector 
    // console.log("context.getHandler()",context.getHandler())
    // console.log("context.getClass()",context.getClass())


    console.log("requiredroles", requiredRoles)   
    if(!requiredRoles) return true;

    const request= context.switchToHttp().getRequest<{headers: Record<string, string>}>()  
    /*
    <{ headers: Record<string, string> }> (TypeScript part)
    This is a type annotation. It's optional, but helps TypeScript understand what request looks like.


    you are giving TypeScript a hint that:

  The request object you're working with

  Contains a property headers

  And that headers is an object where:

  Each key is a string

  Each value is also a string


    */
    // const request= context.switchToHttp().getRequest()
    // console.log("request",request)
    const userRole = request.headers['x-user-role'] as Role;


    /*
    as is used to tell TypeScript:

“I know the type of this value better than you do — trust me, it’s this type.”

This is called a type assertion (not a type cast — though it's similar).
    */
    console.log('userrole',userRole)
    return requiredRoles.includes(userRole);
     
  }
}
 