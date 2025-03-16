import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Planets } from './entities/planet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Planets)
    private readonly planetRepository: Repository<Planets>,
  ) { }

  getPlanets() {
    return this.planetRepository.find();
  }

  discoverPlanet(newPlanet: Planets) {
    return this.planetRepository.save(newPlanet);
  }
}