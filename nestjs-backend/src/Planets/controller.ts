import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlanetService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { Planets } from './entities/planet.entity';

@Controller('planets')
@ApiTags('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) { }

  @Get()
  async getPlanets(): Promise<Planets[]> {
    return this.planetService.getPlanets();;
  }

  @Post()
  async discoverPlanet(@Body() newPlanet: Planets): Promise<Planets> {
    return this.planetService.discoverPlanet(newPlanet);
  }
}