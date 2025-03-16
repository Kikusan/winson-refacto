import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RecruitAstronautDTO } from './dto/recruitAstronaut.dto';
import { ReadAstronautDTO } from './dto/readAstronaut.dto';
import { mapAstronautsToReadAstronauts, mapAstronautToReadAstronaut } from './mappers';

import { Recruit } from '../domainObjects/recruit';
import { Astronaut } from '../domainObjects/astronaut';
import { AstronautService } from '../services/service';

@Controller('astronauts')
@ApiTags('astronauts')
export class AstronautController {
  constructor(private readonly astronautService: AstronautService) { }

  @Get()
  async getAstronauts(): Promise<ReadAstronautDTO[]> {
    const astronauts: Astronaut[] = await this.astronautService.getAstronauts();
    const readAstronaut: ReadAstronautDTO[] = mapAstronautsToReadAstronauts(astronauts)
    return readAstronaut;
  }

  @Get(':id')
  async getAstronautById(@Param('id') id: string): Promise<ReadAstronautDTO> {
    const astronaut: Astronaut = await this.astronautService.getAstronautbyId(id);
    const updatedAstronautDTO: ReadAstronautDTO = mapAstronautToReadAstronaut(astronaut)
    return updatedAstronautDTO;
  }

  @Post()
  async RecruitAstronaut(@Body() recruit: RecruitAstronautDTO): Promise<ReadAstronautDTO> {
    const newRecruit: Recruit = {
      firstname: recruit.firstname,
      lastname: recruit.lastname,
    }
    const planetId = recruit.originPlanet.id
    const newAstronaut = await this.astronautService.recruitAstronaut(newRecruit, planetId);
    const newAstronautDTO: ReadAstronautDTO = mapAstronautToReadAstronaut(newAstronaut)
    return newAstronautDTO;
  }

  @Put(':id')
  async UpdateAstronaut(@Param('id') id: string, @Body() astronautToBeUpdated: Astronaut): Promise<ReadAstronautDTO> {
    const updatedAstronaut: Astronaut = await this.astronautService.updateAstronaut(astronautToBeUpdated);
    const updatedAstronautDTO: ReadAstronautDTO = mapAstronautToReadAstronaut(updatedAstronaut)
    return updatedAstronautDTO;
  }

  @Delete(':id')
  async fireAstronaut(@Param('id') id: string): Promise<ReadAstronautDTO[]> {
    const astronauts: Astronaut[] = await this.astronautService.fireAstronaut(id);
    const readAstronaut: ReadAstronautDTO[] = mapAstronautsToReadAstronauts(astronauts)
    return readAstronaut;
  }

}


