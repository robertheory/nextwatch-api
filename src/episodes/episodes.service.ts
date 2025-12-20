import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShowStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  constructor(private prisma: PrismaService) {}

  private async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisodeData = new Episode(createEpisodeDto);

    const showExists = await this.prisma.show.findUnique({
      where: { showId: newEpisodeData.showId },
    });

    if (!showExists) {
      await this.prisma.show.create({
        data: { showId: newEpisodeData.showId, status: ShowStatus.UNTRACKED },
      });
    }

    const alreadyExists = await this.prisma.watchedEpisode.findFirst({
      where: {
        showId: newEpisodeData.showId,
        episodeId: newEpisodeData.episodeId,
      },
    });

    if (alreadyExists) {
      throw new BadRequestException('Episode already registered.');
    }

    const createdEpisode = await this.prisma.watchedEpisode.create({
      data: {
        showId: newEpisodeData.showId,
        episodeId: newEpisodeData.episodeId,
        watchedAt: newEpisodeData.watchedAt,
      },
    });

    return createdEpisode;
  }

  async findAll(showId: number) {
    const episodes = await this.prisma.watchedEpisode.findMany({
      where: { showId },
    });

    return episodes;
  }

  async markWatched(showId: number, episodeId: number) {
    const exists = await this.prisma.watchedEpisode.findUnique({
      where: { showId, episodeId },
    });

    if (!exists) {
      await this.create({ showId, episodeId });
    }

    const updatedEpisode = await this.prisma.watchedEpisode.update({
      where: { episodeId, showId },
      data: { watchedAt: new Date() },
    });

    return updatedEpisode;
  }

  async markUnwatched(showId: number, episodeId: number) {
    const exists = await this.prisma.watchedEpisode.findUnique({
      where: { showId, episodeId },
    });

    if (!exists) {
      throw new NotFoundException('Episode not found.');
    }

    const updatedEpisode = await this.prisma.watchedEpisode.update({
      where: { episodeId, showId },
      data: { watchedAt: null },
    });

    return updatedEpisode;
  }
}
