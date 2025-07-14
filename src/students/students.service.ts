import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './interfaces/students-interface';

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  create(createStudentDto: CreateStudentDto): Student {
    const newStudent: Student = {
      id: Date.now(),
      ...createStudentDto,
    };

    this.students.push(newStudent);
    return newStudent;
  }

  findAll() {
    return this.students;
  }

  findOne(id: number): Student {
    const student = this.students.find((s) => s.id === id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto): Student {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    this.students[index] = { id, ...updateStudentDto } as Student;
    return this.students[index];
  }

  remove(id: number): void {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    this.students.splice(index, 1);
  }
}
