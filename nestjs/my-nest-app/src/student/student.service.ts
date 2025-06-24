import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        { id: 1, name: "ansh", age: 22},
        { id: 2, name: "gupta", age: 25}
    ]

    getAllStudents(){
        return this.students;
    }

    getStudentById(id: number){
        const student = this.students.find((s)=>{
            return s.id === id 
        })

        if(!student){
            throw new NotFoundException("Student Not Found!") // it is built-in exception class in nest js for 404 status code 
        }
        return student;
    }

    createStudent(data: {name: string; age: number}){
        const newStudent = {
            id: Date.now(),
            ...data,
        }
        this.students.push(newStudent)
        return newStudent;
    }

    updateStudent(id: number, data:{name: string; age: number}){
        const index = this.students.findIndex((s)=>{
            return s.id === id
        })

        if(index === -1){
            throw new NotFoundException('Student not found');
        }

        this.students[index] = {
            id,
            ...data
        }

        return this.students[index];
    }

    patchStudent(id: number, data: Partial<{name: string; age: number}>) {  // partial is data type of typescript which make properties optional 
        const student = this.getStudentById(id)

        Object.assign(student,data) // it makes the copy of our object 
                                    // assign method will only update the student what the change in data is 

        return student;



    } 

    deleteStudent(id: number){
         const index = this.students.findIndex((s)=>{
            return s.id === id
        })

        if(index === -1){
            throw new NotFoundException('Student not found');
        }
        const deleted = this.students.splice(index,1) 

        return {message: "student deleted",student: deleted[0]}                        
    }
}

 