/* eslint-disable prettier/prettier */

import { MovieCastEntity } from './../entity/movie-cast';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieCastRepository extends Repository<MovieCastEntity> {
  constructor(
    @InjectRepository(MovieCastEntity)
    private readonly MovieCastEntityRepository: Repository<MovieCastEntity>,
  ) {
    super(
      MovieCastEntityRepository.target,
      MovieCastEntityRepository.manager,
      MovieCastEntityRepository.queryRunner,
    );
  }

  async addMovieCast(
    movieId: number,
    castId: number,
  ): Promise<MovieCastEntity> {
    const movieCast = new MovieCastEntity();
    movieCast.movie = { id: movieId } as any; // Ganti dengan ID film yang sesuai
    movieCast.cast = { id: castId } as any; // Ganti dengan ID pemeran (cast) yang sesuai
    return this.save(movieCast);
  }

  async findAllWithDetails(): Promise<MovieCastEntity[]> {
    return this.createQueryBuilder('movieCast')
      .leftJoinAndSelect('movieCast.movie', 'movie')
      .leftJoinAndSelect('movieCast.cast', 'cast')
      .getMany();
  }

  async findAll(): Promise<MovieCastEntity[]> {
    return this.MovieCastEntityRepository.find();
  }

  async findAllLanguagesWithRatingAbove(rate: number): Promise<string[]> {
    const query = this.createQueryBuilder('movieCast')
      .leftJoin('movieCast.movie', 'movie')
      .select('DISTINCT movie.language')
      .where('movie.rating > :rate', { rate });

    const languages = await query.getRawMany();
    return languages.map((item) => item.language);
  }

  async findAllMovieByRate(rate: number): Promise<MovieCastEntity[]> {
    const moviesAboveRating =
      await this.MovieCastEntityRepository.createQueryBuilder('movieCast')
        .leftJoinAndSelect('movieCast.movie', 'movie') // Melakukan join dengan tabel Movie
        .leftJoinAndSelect('movieCast.cast', 'cast')
        .where('movie.rating > :rate', { rate }) // Mencari rating di atas 4.5 dari tabel Movie
        .getMany();

    return moviesAboveRating;
  }

  async findById(id: number): Promise<MovieCastEntity> {
    return this.MovieCastEntityRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
