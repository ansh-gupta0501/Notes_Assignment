import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {
    @Get('hello/:id')
    getHello(@Param('id',ParseIntPipe) id:Number){  // parseintpipe ensures th id you get in the request is of integer type. If it is not integer type then it will throw an exception and that exception will be catch by our custom exception filter .// also ParseIntPipe — which converts the string to a number and throws a BadRequestException if it fails. 
        return {message: `Your id is: ${id}`}
    }
}
