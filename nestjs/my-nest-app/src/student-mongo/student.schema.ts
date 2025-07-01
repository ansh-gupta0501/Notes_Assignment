import {Prop,SchemaFactory,Schema} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type StudentDocument = Student & Document

@Schema({timestamps: true})
export class Student{
    @Prop({required: true}) // prop decorator tells which properties should be optional and which properties should be required 
    name: string

    @Prop({required: true})
    age: number 

    @Prop()      // this means this email field is optional 
    email? : string
}

export const StudentSchema = SchemaFactory.createForClass(Student)