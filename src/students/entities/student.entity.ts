// 📁 src/student/student.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  // JoinTable,
} from 'typeorm';
import { Detail } from 'src/detail/entities/detail.entity';
import { Course } from 'src/courses/entities/course.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Detail, (detail) => detail.student, {
    cascade: true,
    eager: true,
  })
  detail: Detail;

  @ManyToMany(() => Course, (course) => course.students)
  // @JoinTable()
  courses: Course[]; // ✅ Add this line
}
