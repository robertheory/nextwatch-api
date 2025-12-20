import { Controller, Get, Param, Patch } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('watched')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get(':showId')
  findAll(@Param('showId') showId: string) {
    return this.episodesService.findAll(+showId);
  }

  @Patch(':showId/:episodeId')
  markWatched(
    @Param('showId') showId: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.episodesService.markWatched(+showId, +episodeId);
  }

  @Patch(':showId/:episodeId')
  markUnwatched(
    @Param('showId') showId: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.episodesService.markUnwatched(+showId, +episodeId);
  }
}
