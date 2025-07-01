import { Body, Controller, Post } from '@nestjs/common';
import { Student } from './student.schema';
import { StudentMongoService } from './student-mongo.service';

@Controller('student-mongo')
export class StudentMongoController {
    constructor(private readonly studentService: StudentMongoService){}

    @Post()
    async addStudent(@Body() data: Partial<Student>){
        return this.studentService.createStudent(data)
    }
}
