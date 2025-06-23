import { Controller, Get } from '@nestjs/common';

@Controller('user') //controller Decorator. This defines UserController class is not normal class . it is special class which defines this is a controller. so nest js knows how to treat controllers. 
                    //@Controller('user') this decorator basically be the base route of the controller
export class UserController {

    @Get() // get decorator. when user hit a get request on this user router , then run this getUser() method   
    getUser(){    // now getUser() is not simple method, it is special method told by get decorator. and this decorator telling us when this method to be called? when user make a get request on this route(user)
        return "User data fetched successfully "
    }
    getUser1(){    // now getUser() is not simple method, it is special method told by get decorator. and this decorator telling us when this method to be called? when user make a get request on this route(user)
        return "User data fetched successfully 2 "
    }
    

}
