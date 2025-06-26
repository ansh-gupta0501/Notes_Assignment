import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('user-roles')
// @UseGuards(RolesGuard)   // activates the guard. 
export class UserRolesController {
    @Get('admin-data')
    // @UseGuards(RolesGuard)   // activates the guard. 
    @Roles(Role.Admin) //  sets metadata: { roles: ['admin'] }
    getAdminData(){
        console.log("Roles Decorator",Roles())
        return {message: "Only admin can access"}
    }

    @Get('user-data')
    // @Roles(Role.Admin)
    getUserData(){
        return {message: "anyone can access data"}
    }
}
