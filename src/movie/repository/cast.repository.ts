/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CastEntity } from '../entity/cast.entity';

@Injectable()
export class CastRepository extends Repository<CastEntity> {
  constructor(
    @InjectRepository(CastEntity)
    private readonly CastEntityRepository: Repository<CastEntity>,
  ) {
    super(
      CastEntityRepository.target,
      CastEntityRepository.manager,
      CastEntityRepository.queryRunner,
    );
  }

  async findAllWithZodiac(): Promise<(CastEntity & { zodiac: string })[]> {
    const allCasts = await this.CastEntityRepository.find();
    const castsWithZodiac = allCasts.map((cast) => ({
      ...cast,
      zodiac: this.getZodiacSign(cast.birthday),
      isLeap: this.checkLeapYear(cast.birthday),
    }));
    return castsWithZodiac;
  }

  private checkLeapYear(birthday: Date): boolean {
    const year = birthday.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  private getZodiacSign(birthday: Date): string {
    const month = birthday.getMonth() + 1;
    const day = birthday.getDate();
    const leapYear = this.checkLeapYear(birthday);

    if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) {
      return 'Aquarius';
    } else if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) {
      return 'Pisces';
    } else if ((month === 2 && day >= 21) || (month === 3 && day <= 20)) {
      return 'Aries';
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
      return 'Taurus';
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
      return 'Gemini';
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
      return 'Cancer';
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return 'Leo';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return 'Virgo';
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return 'Libra';
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return 'Scorpio';
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return 'Sagittarius';
    } else if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) {
      return 'Capricorn';
    }

    return `Zodiac sign (${leapYear ? 'True' : 'False'})`;
  }

  async findAll(): Promise<CastEntity[]> {
    return this.CastEntityRepository.find();
  }

  async findById(id: number): Promise<CastEntity> {
    const cast = await this.CastEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!cast) {
      throw new NotFoundException(`Cast with ID ${id} not found`);
    }
    return cast;
  }

  async createNewCast(castData: Partial<CastEntity>): Promise<CastEntity> {
    const newCast = this.create(castData);
    return this.save(newCast);
  }

  async updateCast(
    id: number,
    updatedCastData: Partial<CastEntity>,
  ): Promise<CastEntity | null> {
    const castToUpdate = await this.findOne({
      where: {
        id: id,
      },
    });
    if (!castToUpdate) {
      return null;
    }

    Object.assign(castToUpdate, updatedCastData);
    return this.save(castToUpdate);
  }

  async deleteCast(id: number): Promise<boolean> {
    const castToDelete = await this.CastEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!castToDelete) {
      return false;
    }

    await this.CastEntityRepository.remove(castToDelete);
    return true;
  }
}
