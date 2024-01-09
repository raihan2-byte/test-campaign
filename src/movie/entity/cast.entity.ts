/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'casts',
})
export class CastEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'timestamp' })
  birthday: Date;

  @Column({ type: 'date' })
  deadday: Date;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  rating: number;
}
