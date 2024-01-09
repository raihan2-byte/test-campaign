/* eslint-disable prettier/prettier */
import { CastRepository } from './../repository/cast.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CastEntity } from '../entity/cast.entity';
import { CreateCast } from '../dto/cast-dto/create-cast-dto';
import { UpdateCast } from '../dto/cast-dto/update-cast-dto';
import { ApiResponse, errorResponse, successResponse } from '../helper/helper';

@Injectable()
export class CastService {
  constructor(private readonly castRepository: CastRepository) {}

  async findAll(): Promise<ApiResponse<CastEntity[]>> {
    try {
      const casts = await this.castRepository.findAll();
      return successResponse(casts);
    } catch (error) {
      return errorResponse(500, 'Failed to retrieve casts');
    }
  }

  async findById(id: number): Promise<ApiResponse<CastEntity>> {
    try {
      const cast = await this.castRepository.findById(id);
      if (!cast) {
        return errorResponse(404, `Cast with ID ${id} not found`);
      }
      return successResponse(cast);
    } catch (error) {
      return errorResponse(500, 'Failed to find cast');
    }
  }

  async createCast(createCastDto: CreateCast): Promise<ApiResponse<any>> {
    try {
      if (createCastDto.rating > 5) {
        throw new BadRequestException('Rating cannot be greater than 5');
      }
      const savedCast = await this.castRepository.save(createCastDto);
      return successResponse(savedCast);
    } catch (error) {
      return errorResponse(400, 'Failed to create cast');
    }
  }

  async updateCast(
    id: number,
    updateCastDto: UpdateCast,
  ): Promise<ApiResponse<CastEntity | null>> {
    try {
      if (updateCastDto.rating > 5) {
        throw new BadRequestException('Rating cannot be greater than 5');
      }

      const castToUpdate = await this.castRepository.findById(id);
      if (!castToUpdate) {
        return errorResponse(404, `Cast with ID ${id} not found`);
      }

      Object.assign(castToUpdate, updateCastDto);
      const updatedCast = await this.castRepository.save(castToUpdate);
      return successResponse(updatedCast);
    } catch (error) {
      return errorResponse(500, 'Failed to update cast');
    }
  }

  async findAllCastsWithZodiac(): Promise<
    (any & { zodiac: string; isLeap: boolean })[]
  > {
    return await this.castRepository.findAllWithZodiac();
  }

  async deleteCast(id: number): Promise<ApiResponse<string>> {
    try {
      const isDeleted = await this.castRepository.deleteCast(id);
      if (isDeleted) {
        return successResponse('Cast has been successfully deleted');
      } else {
        return errorResponse(404, `Cast with ID ${id} not found`);
      }
    } catch (error) {
      return errorResponse(500, 'Failed to delete cast');
    }
  }
}
