import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDetailDto {
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  dob: string;

  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
