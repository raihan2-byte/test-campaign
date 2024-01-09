/* eslint-disable prettier/prettier */

import { UserModule } from './movie/movie.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {}
