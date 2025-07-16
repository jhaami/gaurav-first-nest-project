import { Module } from '@nestjs/common';

import { StudentsModule } from './students/students.module';
import { DetailModule } from './detail/detail.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './students/entities/student.entity';
import { Course } from './courses/entities/course.entity';
import { Detail } from './detail/entities/detail.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Amit@2054',
      database: 'school',
      entities: [Student, Course, Detail],
      synchronize: true,
    }),
    StudentsModule,
    DetailModule,
    CoursesModule,
  ],
})
export class AppModule {}
