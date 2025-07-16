// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateDetailDto } from './dto/create-detail.dto';
// import { UpdateDetailDto } from './dto/update-detail.dto';
// import { Detail } from './interfaces/detail.interface';

// @Injectable()
// export class DetailService {
//   private details: Detail[] = [];
//   create(createDetailDto: CreateDetailDto): Detail {
//     const deatil: Detail = {
//       id: Date.now(),
//       ...createDetailDto,
//     };
//     this.details.push(deatil);
//     return deatil;
//   }

//   findAll() {
//     return this.details;
//   }

//   findOne(id: number): Detail {
//     const detail = this.details.find((s) => s.id === id);
//     if (!detail) throw new NotFoundException('Not found Student_Details');
//     return detail;
//   }

//   update(id: number, updateDetailDto: UpdateDetailDto) {
//     const index = this.details.findIndex((d) => d.id === id);
//     if (index === -1) throw new NotFoundException('Students-Detail not found');
//     this.details[index] = { id, ...updateDetailDto } as Detail;

//     return this.details[index];
//   }

//   remove(id: number): void {
//     const index = this.details.findIndex((d) => d.id === id);
//     if (index === -1) throw new NotFoundException('Detail not found');
//     this.details.splice(index, 1);
//   }
// }

// 📁 src/detail/detail.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detail } from './entities/detail.entity';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { StudentsService } from 'src/students/students.service';
import { omit, Omit } from 'lodash';

@Injectable()
export class DetailService {
  constructor(
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
    private readonly studentsService: StudentsService,
  ) {}

  async create(createDetailDto: CreateDetailDto): Promise<Detail> {
    const userId = createDetailDto.userId;
    const existingUser = this.studentsService.findOne(userId);

    const detailInstance = new Detail();
    Object.assign(detailInstance, {
      ...omit(createDetailDto, ['userId']),
      student: existingUser,
    });

    const detail = this.detailRepository.create(detailInstance);
    return await this.detailRepository.save(detail);
  }

  async findAll(): Promise<Detail[]> {
    return await this.detailRepository.find({ relations: ['student'] });
  }

  async findOne(id: number): Promise<Detail> {
    const detail = await this.detailRepository.findOne({
      where: { id },
      relations: ['student'],
    });
    if (!detail) throw new NotFoundException('Detail not found');
    return detail;
  }

  async update(id: number, updateDetailDto: UpdateDetailDto): Promise<Detail> {
    const detail = await this.detailRepository.preload({
      id,
      ...updateDetailDto,
    });
    if (!detail) throw new NotFoundException('Detail not found');
    return await this.detailRepository.save(detail);
  }

  async remove(id: number): Promise<void> {
    const detail = await this.detailRepository.findOneBy({ id });
    if (!detail) throw new NotFoundException('Detail not found');
    await this.detailRepository.remove(detail);
  }
}
