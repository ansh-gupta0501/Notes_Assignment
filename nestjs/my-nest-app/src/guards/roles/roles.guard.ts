import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.enums';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}           // Reflector :- The meta data that you are setting inside your decorator like there can be user or admin inside this decorator . so to get these values reflector is used 
  
  canActivate( context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>( // values inside decorator will be of type Role defined in enum 
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
    // const request= context.switchToHttp().getRequest()
    // console.log("request",request)
    const userRole = request.headers['x-user-role'] as Role;
    console.log('userrole',userRole)
    return requiredRoles.includes(userRole);
     
  }
}
 