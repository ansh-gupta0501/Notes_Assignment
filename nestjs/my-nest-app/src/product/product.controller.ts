import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('product')
export class ProductController {
    // to inject a service in this controller , we use constructor method 
    constructor(private readonly productService: ProductService ){} // now our services are injected in the controller

    @Get()
    @UseGuards(AuthGuard) // means when there is get request on this product route , then guard will execute first which check if there is token inside authorisation header or not 
    getProducts(){
        return this.productService.getAllProducts();
    }

    @Get(':id') //dynamic route , complete path formed is /product/:id
    getProduct(@Param('id') id : string){          // @Param is used to get dynamic id from route   // also we always get param value as string from url 
        return this.productService.getProductById(Number(id)) // in the service , we have defined id as number , so need to covert to number 
    }


}
