import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './interface/course.interface';

@Injectable()
export class CoursesService {
  private course: Course[] = [];
  create(createCourseDto: CreateCourseDto): Course {
    const newCourse: Course = {
      id: Date.now(),
      ...createCourseDto,
    };
    this.course.push(newCourse);
    return newCourse;
  }

  findAll() {
    return this.course;
  }

  findOne(id: number): Course {
    const courses = this.course.find((c) => c.id === id);
    if (!courses) throw new NotFoundException('Course not found');
    return courses;
  }

  update(id: number, updateCourseDto: UpdateCourseDto): Course {
    const index = this.course.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Course not found');
    this.course[index] = { id, ...updateCourseDto } as Course;
    return this.course[index];
  }

  remove(id: number): void {
    const index = this.course.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Course not found');
    this.course.splice(index, 1);
  }
}
