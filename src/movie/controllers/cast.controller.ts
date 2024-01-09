/* eslint-disable prettier/prettier */

import { CastService } from '../service/cast.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateCast } from '../dto/cast-dto/create-cast-dto';
import { UpdateCast } from '../dto/cast-dto/update-cast-dto';
import { CastEntity } from '../entity/cast.entity';

@Controller('/api/v1/casts')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @Get('/')
  async findAll(@Res() res): Promise<CastEntity[]> {
    return res.json(await this.castService.findAll());
  }

  @Get('/:id')
  async findById(@Res() res, @Param('id') id): Promise<CastEntity> {
    return res.json(await this.castService.findById(id));
  }

  @Post('/')
  async createCast(
    @Res() res,
    @Body() createCastDto: CreateCast,
  ): Promise<any> {
    return res.json(await this.castService.createCast(createCastDto));
  }

  @Get('/zodiak/all')
  async findAllCastsWithZodiac(): Promise<
    (any & { zodiac: string; isLeap: boolean })[]
  > {
    return await this.castService.findAllCastsWithZodiac();
  }

  @Put('/:id')
  async updateCast(
    @Res() res,
    @Param('id') id,
    @Body() updateCastDto: UpdateCast,
  ): Promise<any> {
    return res.json(await this.castService.updateCast(id, updateCastDto));
  }

  @Delete('/:id')
  async deleteCast(@Res() res, @Param('id') id): Promise<CastEntity> {
    return res.json(await this.castService.deleteCast(id));
  }
}
