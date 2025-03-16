import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { IPlanetRepository } from '../IPlanetRepository';

@Injectable()
export class TypeOrmPlanetRepository implements IPlanetRepository {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,

  ) { }

  async getPlanetById(planetId: string) {
    const planet = await this.planetRepository.findOne({ where: { id: planetId } })
    if (!planet) {
      throw new Error('planet not found')
    }
    return planet;
  }
}