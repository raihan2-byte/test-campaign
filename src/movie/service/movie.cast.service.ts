/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieCastEntity } from './../entity/movie-cast';
import { MovieCastRepository } from './../repository/movie-cast-repository';

@Injectable()
export class MovieCastService {
  constructor(private readonly movieCastRepository: MovieCastRepository) {}

  async addMovieCast(
    movieId: number,
    castId: number,
  ): Promise<MovieCastEntity> {
    try {
      const result = await this.movieCastRepository.addMovieCast(
        movieId,
        castId,
      );
      return result; // Return the MovieCastEntity directly
    } catch (error) {
      throw new Error('Failed to add movie cast');
    }
  }

  async findLanguagesByRatingAbove(rate: number): Promise<string[]> {
    try {
      const result =
        await this.movieCastRepository.findAllLanguagesWithRatingAbove(rate);
      return result;
    } catch (error) {
      throw new Error('Failed to find languages by rating above');
    }
  }

  async findAllMovieCasts(): Promise<MovieCastEntity[]> {
    try {
      const result = await this.movieCastRepository.findAll();
      return result;
    } catch (error) {
      throw new Error('Failed to find all movie casts');
    }
  }

  async findAllMovieByRate(rate: number): Promise<MovieCastEntity[]> {
    try {
      const result = await this.movieCastRepository.findAllMovieByRate(rate);
      return result;
    } catch (error) {
      throw new Error('Failed to find all movie by rate');
    }
  }

  async findAllMovieCastsWithDetails(): Promise<MovieCastEntity[]> {
    try {
      const result = await this.movieCastRepository.findAllWithDetails();
      return result;
    } catch (error) {
      throw new Error('Failed to find all movie casts with details');
    }
  }

  async findMovieCastById(id: number): Promise<MovieCastEntity> {
    try {
      const result = await this.movieCastRepository.findById(id);
      if (!result) {
        throw new NotFoundException('Movie cast not found');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('Failed to find movie cast by ID');
    }
  }
}
