import { Module } from '@nestjs/common';

import { PlanetController } from './controller';
import { PlanetService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planets } from './entities/planet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Planets
    ]),
  ],
  controllers: [PlanetController],
  providers: [PlanetService],
})
export class PlanetModule { }
