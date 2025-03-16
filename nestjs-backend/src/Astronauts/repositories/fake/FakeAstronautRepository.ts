import { Injectable } from '@nestjs/common';

import { IAstronautRepository } from '../IAstronautRepository';
import { Recruit, Astronaut } from 'src/Astronauts/domainObjects';
@Injectable()
export class FakeAstronautRepository implements IAstronautRepository {
  constructor(
  ) { }
  astronauts: Astronaut[] = [
    {
      id: 'riri id',
      firstname: 'riri',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
      }
    },
    {
      id: 'fifi id',
      firstname: 'fifi',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
      }
    },
    {
      id: 'loulou id',
      firstname: 'loulou',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
      }
    }
  ];
  getAstronauts() {
    return Promise.resolve(this.astronauts);
  }

  getAstronautbyId(id: string) {
    const astronaut = this.astronauts.find(astronaut => astronaut.id === id)
    if (!astronaut)
      throw new Error('not found')
    return Promise.resolve(astronaut)
  }

  async saveAstronaut(recruit: Recruit, planetId: string) {
    const newAstronaut: Astronaut = {
      ...recruit,
      id: `${recruit.firstname} id`,
      originPlanet: {
        id: `planet ${planetId}`, name: 'planet'
      }
    }
    this.astronauts.push(newAstronaut);
    return Promise.resolve(newAstronaut)
  }

  updateAstronaut(updatedAstronaut: Astronaut) {
    this.astronauts = this.astronauts.map(astronaut =>
      astronaut.id === updatedAstronaut.id ? updatedAstronaut : astronaut
    );
    return Promise.resolve(updatedAstronaut)
  }

  async fireAstronaut(id: string) {
    this.astronauts = this.astronauts.filter(astronaut => astronaut.id !== id)
    return this.getAstronauts()
  }
}