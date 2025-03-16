import { Module } from '@nestjs/common';
import { AstronautController } from './primaryAdapter/controller';
import { AstronautService } from './services/service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMAstronaut } from './repositories/typeORM/entities/astronaut.entity';
import { Planet } from './repositories/typeORM/entities/planet.entity';
import { TypeOrmAstronautRepository } from './repositories/typeORM/TypeORMAstronautRepository';
import { TypeOrmPlanetRepository } from './repositories/typeORM/TypeORMPlanetRepository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeORMAstronaut, Planet
    ]),
  ],
  controllers: [AstronautController],
  providers: [
    {
      provide: AstronautService,
      useFactory: (
        astronautRepository,
        planetRepository,

      ) => {

        return new AstronautService(
          astronautRepository,
          planetRepository,
        );
      },
      inject: [
        'astronautRepository',
        'planetRepository',
      ],
    },
    {
      provide: 'astronautRepository',
      useClass: TypeOrmAstronautRepository,
    },
    {
      provide: 'planetRepository',
      useClass: TypeOrmPlanetRepository,
    },
  ],
})
export class AstronautModule { }
