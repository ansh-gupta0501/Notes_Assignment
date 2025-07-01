import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { StudentMongoService } from './student-mongo.service';
import { StudentMongoController } from './student-mongo.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}])], // here we are register our schema with mongoose model which create a database follow the schema .// name: Student.name this tells name of our schema
    providers: [StudentMongoService],
    controllers: [StudentMongoController]  
})
export class StudentMongoModule {}


