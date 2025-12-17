import { Injectable, NotFoundException } from '@nestjs/common';
import { ShowStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  async create(createShowDto: CreateShowDto) {
    const status =
      ShowStatus[createShowDto.status as keyof typeof ShowStatus] ||
      ShowStatus.UNTRACKED;

    const newShow = new Show({
      showId: createShowDto.showId,
      status,
    });

    const alreadyExists = await this.prisma.show.findUnique({
      where: { showId: newShow.showId },
    });

    if (alreadyExists) {
      const updatedShow = await this.prisma.show.update({
        where: { showId: newShow.showId },
        data: { status: newShow.status },
      });

      return updatedShow;
    }

    const createdShow = await this.prisma.show.create({
      data: {
        showId: newShow.showId,
        status: newShow.status,
      },
    });

    return createdShow;
  }

  async findAll(status?: string) {
    if (!status) {
      const shows = await this.prisma.show.findMany();

      return shows;
    }

    const filterStatus =
      ShowStatus[status as keyof typeof ShowStatus] || ShowStatus.NOT_STARTED;

    const shows = await this.prisma.show.findMany({
      where: { status: filterStatus },
    });

    return shows;
  }

  async findOne(showId: number) {
    const show = await this.prisma.show.findUnique({
      where: { showId },
    });

    if (!show) {
      const createdShow = await this.create({ showId, status: 'UNTRACKED' });

      return createdShow;
    }

    return show;
  }

  async update(showId: number, updateShowDto: UpdateShowDto) {
    const status =
      ShowStatus[updateShowDto.status as keyof typeof ShowStatus] ||
      ShowStatus.NOT_STARTED;

    const exists = await this.prisma.show.findUnique({
      where: { showId },
    });

    if (!exists) {
      throw new NotFoundException(`Show with ID ${showId} not found.`);
    }

    const updatedShow = await this.prisma.show.update({
      where: { showId },
      data: { status },
    });

    return updatedShow;
  }

  async remove(showId: number) {
    const exists = await this.prisma.show.findUnique({
      where: { showId },
    });

    if (!exists) {
      throw new NotFoundException(`Show with ID ${showId} not found.`);
    }

    await this.prisma.show.delete({
      where: { showId },
    });
  }
}
