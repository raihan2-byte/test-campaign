/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entity/movie.entity';
import { MovieController } from './controllers/movie.controller';
import { MovieRepository } from './repository/movie.repository';
import { MovieService } from './service/movie.service';
import { CastEntity } from './entity/cast.entity';
import { CastController } from './controllers/cast.controller';
import { CastRepository } from './repository/cast.repository';
import { CastService } from './service/cast.service';
import { MovieCastEntity } from './entity/movie-cast';
import { MovieCastRepository } from './repository/movie-cast-repository';
import { MovieCastService } from './service/movie.cast.service';
import { MovieCastController } from './controllers/movie.cast.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, CastEntity, MovieCastEntity]),
  ],
  controllers: [MovieController, CastController, MovieCastController],
  providers: [
    MovieRepository,
    MovieService,
    CastRepository,
    CastService,
    MovieCastRepository,
    MovieCastService,
  ],
})
export class UserModule {}
