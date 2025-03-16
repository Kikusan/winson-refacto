import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeORMAstronaut } from './entities/astronaut.entity';
import { IAstronautRepository } from '../IAstronautRepository';
import { Recruit, Astronaut } from 'src/Astronauts/domainObjects';

@Injectable()
export class TypeOrmAstronautRepository implements IAstronautRepository {
  constructor(
    @InjectRepository(TypeORMAstronaut)
    private readonly astronautRepository: Repository<TypeORMAstronaut>,
  ) { }


  getAstronauts() {
    return this.astronautRepository.find();
  }

  getAstronautbyId(id: string) {
    return this.astronautRepository.findOne({ where: { id } });
  }

  saveAstronaut(recruit: Recruit, planetId: string): Promise<Astronaut> {
    const newAstronaut: TypeORMAstronaut = new TypeORMAstronaut();
    newAstronaut.firstname = recruit.firstname;
    newAstronaut.lastname = recruit.lastname;
    newAstronaut.originPlanet = { ...newAstronaut.originPlanet, id: planetId }
    return this.astronautRepository.save(newAstronaut);
  }


  updateAstronaut(updatedAstronaut: Astronaut) {
    return this.astronautRepository.save(updatedAstronaut);
  }

  async fireAstronaut(id: string) {
    await this.astronautRepository.delete(id)
    return this.getAstronauts()
  }
}