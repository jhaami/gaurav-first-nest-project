import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  dob: string;

  @OneToOne(() => Student, (student) => student.detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  student: Student;
}
