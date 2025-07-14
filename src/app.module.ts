import { Module } from '@nestjs/common';

import { StudentsModule } from './students/students.module';
import { DetailModule } from './detail/detail.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [StudentsModule, DetailModule, CoursesModule],
})
export class AppModule {}
