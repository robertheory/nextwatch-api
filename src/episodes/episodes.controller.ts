import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('watched')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post(':showId/:episodeId')
  create(
    @Param('showId') showId: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.episodesService.create({
      showId: +showId,
      episodeId: +episodeId,
    });
  }

  @Get(':showId')
  findAll(@Param('showId') showId: string) {
    return this.episodesService.findAll(+showId);
  }

  @Delete(':showId/:episodeId')
  remove(
    @Param('showId') showId: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.episodesService.remove(+showId, +episodeId);
  }
}
