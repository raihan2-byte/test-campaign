/* eslint-disable prettier/prettier */

import { MovieService } from '../service/movie.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { MovieEntity } from '../entity/movie.entity';
import { CreateMovie } from './../dto/movie-dto/create-movie-dto';
import { UpdateMovie } from '../dto/movie-dto/update-movie-dto';

@Controller('/api/v1/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  async findAll(@Res() res): Promise<MovieEntity[]> {
    return res.json(await this.movieService.findAll());
  }

  @Get('/:id')
  async findById(@Res() res, @Param('id') id): Promise<MovieEntity> {
    return res.json(await this.movieService.findById(id));
  }

  @Post('/')
  async createMovie(
    @Res() res,
    @Body() createMovieDto: CreateMovie,
  ): Promise<any> {
    return res.json(await this.movieService.createMovie(createMovieDto));
  }

  @Put('/:id')
  async updateMovie(
    @Res() res,
    @Param('id') id,
    @Body() updateMovieDto: UpdateMovie,
  ): Promise<any> {
    return res.json(await this.movieService.updateMovie(id, updateMovieDto));
  }

  @Delete('/:id')
  async deleteMovie(@Res() res, @Param('id') id): Promise<MovieEntity> {
    return res.json(await this.movieService.deleteMovie(id));
  }
}
