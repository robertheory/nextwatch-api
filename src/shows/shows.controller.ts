import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { ShowsService } from './shows.service';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showsService.create(createShowDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('status') status?: string) {
    return this.showsService.findAll(status);
  }

  @Get(':showId')
  findOne(@Param('showId') showId: number) {
    return this.showsService.findOne(showId);
  }

  @Put(':showId')
  update(
    @Param('showId') showId: number,
    @Body() updateShowDto: UpdateShowDto,
  ) {
    return this.showsService.update(showId, updateShowDto);
  }

  @Delete(':showId')
  remove(@Param('showId') showId: number) {
    return this.showsService.remove(showId);
  }
}
