/* eslint-disable prettier/prettier */

import { CreateMovieCastDTO } from './../dto/movie-cast-dto/create-movie-cast';
import { MovieCastService } from './../service/movie.cast.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MovieCastEntity } from './../entity/movie-cast';
import { ApiResponse, errorResponse, successResponse } from '../helper/helper'; // Pastikan import helper sudah ada

@Controller('/api/v1/movie-casts')
export class MovieCastController {
  constructor(private readonly movieCastService: MovieCastService) {}

  @Post('/')
  async addMovieCast(
    @Body() createMovieCastDTO: CreateMovieCastDTO,
  ): Promise<ApiResponse<MovieCastEntity>> {
    try {
      const { movieId, castId } = createMovieCastDTO;
      const result = await this.movieCastService.addMovieCast(movieId, castId);
      return successResponse(result);
    } catch (error) {
      return errorResponse(500, 'Failed to add movie cast');
    }
  }

  @Get('/')
  async getAllMovieCasts(): Promise<ApiResponse<MovieCastEntity[]>> {
    try {
      const result = await this.movieCastService.findAllMovieCastsWithDetails();
      return successResponse(result);
    } catch (error) {
      return errorResponse(500, 'Failed to fetch all movie casts');
    }
  }

  @Get('/ratingAbove/:rating')
  async findAllMovieByRate(
    @Param('rating') rating: number,
  ): Promise<ApiResponse<MovieCastEntity[]>> {
    try {
      const result = await this.movieCastService.findAllMovieByRate(rating);
      return successResponse(result);
    } catch (error) {
      return errorResponse(500, 'Failed to fetch movies by rating');
    }
  }

  @Get('/unique-languages')
  async findUniqueLanguages(): Promise<ApiResponse<string[]>> {
    try {
      const rate = 4.5;
      const result =
        await this.movieCastService.findLanguagesByRatingAbove(rate);
      return successResponse(result);
    } catch (error) {
      return errorResponse(500, 'Failed to fetch unique languages');
    }
  }

  @Get('/:id')
  async getMovieCastById(
    @Param('id') id: number,
  ): Promise<ApiResponse<MovieCastEntity>> {
    try {
      const result = await this.movieCastService.findMovieCastById(id);
      if (result) {
        return successResponse(result);
      } else {
        return errorResponse(404, 'Movie cast not found');
      }
    } catch (error) {
      return errorResponse(500, 'Failed to fetch movie cast by ID');
    }
  }
}
