/* eslint-disable prettier/prettier */
import { UpdateMovie } from '../dto/movie-dto/update-movie-dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MovieRepository } from '../repository/movie.repository';
import { MovieEntity } from '../entity/movie.entity';
import { CreateMovie } from '../dto/movie-dto/create-movie-dto';
import { ApiResponse, errorResponse, successResponse } from '../helper/helper';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<ApiResponse<MovieEntity[]>> {
    try {
      const result = await this.movieRepository.findAll();
      return successResponse(result);
    } catch (error) {
      return errorResponse(500, 'Failed to fetch all movies');
    }
  }

  async findById(id: number): Promise<ApiResponse<MovieEntity>> {
    try {
      const result = await this.movieRepository.findById(id);
      if (result) {
        return successResponse(result);
      } else {
        return errorResponse(404, 'Movie not found');
      }
    } catch (error) {
      return errorResponse(500, 'Failed to fetch movie by ID');
    }
  }

  async createMovie(
    createMovieDto: CreateMovie,
  ): Promise<ApiResponse<MovieEntity>> {
    try {
      if (createMovieDto.rating > 5) {
        throw new BadRequestException('Rating cannot be greater than 5');
      }
      const result = await this.movieRepository.createMovie(createMovieDto);
      return successResponse(result);
    } catch (error) {
      return errorResponse(500, 'Failed to create movie');
    }
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovie,
  ): Promise<ApiResponse<MovieEntity | null>> {
    try {
      if (updateMovieDto.rating > 5) {
        throw new BadRequestException('Rating cannot be greater than 5');
      }

      const movieToUpdate = await this.movieRepository.findById(id);
      if (!movieToUpdate) {
        return errorResponse(404, 'Movie not found');
      }

      Object.assign(movieToUpdate, updateMovieDto);
      const result = await this.movieRepository.save(movieToUpdate);
      return successResponse(result);
    } catch (error) {
      return errorResponse(500, 'Failed to update movie');
    }
  }

  async deleteMovie(id: number): Promise<ApiResponse<string>> {
    try {
      const isDeleted = await this.movieRepository.deleteMovie(id);
      if (isDeleted) {
        return successResponse('Movie has been successfully deleted');
      } else {
        return errorResponse(404, 'Failed to delete movie');
      }
    } catch (error) {
      return errorResponse(500, 'Failed to delete movie');
    }
  }
}
