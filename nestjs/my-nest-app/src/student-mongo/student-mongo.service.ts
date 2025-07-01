import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentMongoService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>//  @InjectModel(Student.name) it is used to register our schema class here so that we can use it here 
    ){}

    async createStudent(data: Partial<Student>): Promise<Student>{
        const newStudent = new this.studentModel(data)
        return newStudent.save();
    }
    
}
