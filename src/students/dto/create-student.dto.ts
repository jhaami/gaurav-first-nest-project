import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
