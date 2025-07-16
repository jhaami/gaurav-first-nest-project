import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';
import { Student } from 'src/students/entities/student.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([Detail, Student]), StudentsModule],
  controllers: [DetailController],
  providers: [DetailService],
})
export class DetailModule {}
