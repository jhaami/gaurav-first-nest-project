// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateCourseDto } from './dto/create-course.dto';
// import { UpdateCourseDto } from './dto/update-course.dto';
// import { Course } from './interface/course.interface';

// @Injectable()
// export class CoursesService {
//   private course: Course[] = [];
//   create(createCourseDto: CreateCourseDto): Course {
//     const newCourse: Course = {
//       id: Date.now(),
//       ...createCourseDto,
//     };
//     this.course.push(newCourse);
//     return newCourse;
//   }

//   findAll() {
//     return this.course;
//   }

//   findOne(id: number): Course {
//     const courses = this.course.find((c) => c.id === id);
//     if (!courses) throw new NotFoundException('Course not found');
//     return courses;
//   }

//   update(id: number, updateCourseDto: UpdateCourseDto): Course {
//     const index = this.course.findIndex((c) => c.id === id);
//     if (index === -1) throw new NotFoundException('Course not found');
//     this.course[index] = { id, ...updateCourseDto } as Course;
//     return this.course[index];
//   }

//   remove(id: number): void {
//     const index = this.course.findIndex((c) => c.id === id);
//     if (index === -1) throw new NotFoundException('Course not found');
//     this.course.splice(index, 1);
//   }
// }

// 📁 src/courses/courses.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({ relations: ['students'] });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });
    if (!course) throw new NotFoundException('Course not found');
    return this.courseRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) throw new NotFoundException('Course not found');
    await this.courseRepository.remove(course);
  }
}
