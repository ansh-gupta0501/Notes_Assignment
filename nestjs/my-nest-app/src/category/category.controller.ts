import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}
    // private categoryService = new CategoryService()  // this will work but we should not do this because(reason in notes )
    @Get()
    getAllCategories(){
        return this.categoryService.getCategories()
    }
}
