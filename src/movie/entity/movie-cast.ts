/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { CastEntity } from './cast.entity';

@Entity({ name: 'movie_cast' })
export class MovieCastEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MovieEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @ManyToOne(() => CastEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cast_id' })
  cast: CastEntity;
}
