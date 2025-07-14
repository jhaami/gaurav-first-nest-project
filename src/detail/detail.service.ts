import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { Detail } from './interfaces/detail.interface';

@Injectable()
export class DetailService {
  private details: Detail[] = [];
  create(createDetailDto: CreateDetailDto): Detail {
    const deatil: Detail = {
      id: Date.now(),
      ...createDetailDto,
    };
    this.details.push(deatil);
    return deatil;
  }

  findAll() {
    return this.details;
  }

  findOne(id: number): Detail {
    const detail = this.details.find((s) => s.id === id);
    if (!detail) throw new NotFoundException('Not found Student_Details');
    return detail;
  }

  update(id: number, updateDetailDto: UpdateDetailDto) {
    const index = this.details.findIndex((d) => d.id === id);
    if (index === -1) throw new NotFoundException('Students-Detail not found');
    this.details[index] = { id, ...updateDetailDto } as Detail;

    return this.details[index];
  }

  remove(id: number): void {
    const index = this.details.findIndex((d) => d.id === id);
    if (index === -1) throw new NotFoundException('Detail not found');
    this.details.splice(index, 1);
  }
}
