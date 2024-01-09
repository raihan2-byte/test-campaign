/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieRepository extends Repository<MovieEntity> {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly MovieEntityRepository: Repository<MovieEntity>,
  ) {
    super(
      MovieEntityRepository.target,
      MovieEntityRepository.manager,
      MovieEntityRepository.queryRunner,
    );
  }
  async findAll(): Promise<MovieEntity[]> {
    return this.MovieEntityRepository.find();
  }

  // async findById(id: number): Promise<MovieEntity> {
  //   return this.MovieEntityRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  async findById(id: number): Promise<MovieEntity> {
    const movie = await this.MovieEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async createMovie(data: Partial<MovieEntity>): Promise<MovieEntity> {
    const newMovie = this.MovieEntityRepository.create(data);
    return this.MovieEntityRepository.save(newMovie);
  }

  async updateMovie(
    id: number,
    newData: Partial<MovieEntity>,
  ): Promise<MovieEntity | null> {
    const movieToUpdate = await this.MovieEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!movieToUpdate) {
      return null;
    }

    // Melakukan pembaruan pada properti yang diperlukan
    Object.assign(movieToUpdate, newData);

    return this.MovieEntityRepository.save(movieToUpdate);
  }

  async deleteMovie(id: number): Promise<boolean> {
    const movieToDelete = await this.MovieEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!movieToDelete) {
      return false;
    }

    await this.MovieEntityRepository.remove(movieToDelete);
    return true;
  }
}
