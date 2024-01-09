/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'movies',
})
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  language: string;

  @Column({ length: 255 })
  status: string;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  rating: number;
}
