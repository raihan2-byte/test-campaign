/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastEntity } from 'src/movie/entity/cast.entity';
import { MovieCastEntity } from 'src/movie/entity/movie-cast';
import { MovieEntity } from 'src/movie/entity/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'campaign-test',
        entities: [MovieEntity, CastEntity, MovieCastEntity],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
