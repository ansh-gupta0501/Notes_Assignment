import { IsInt, IsString } from "class-validator"

export class CreateCustomerDto{
    // we define dto here. Defining dto means data that comes from the front end, from the client side , should be validated
    // so from client side we will have name having type string , age having type number 
    @IsString() // nestjs dont't allow these decorators to remove
    name: string // but this types get removed during runtime
    @IsInt()
    age: number
} // this will basically validate that data coming from your frontend should contain only name and age  


