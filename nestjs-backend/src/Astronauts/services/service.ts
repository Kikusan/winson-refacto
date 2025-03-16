import { Recruit } from '../domainObjects/recruit';
import { IAstronautRepository } from '../repositories/IAstronautRepository';
import { IPlanetRepository } from '../repositories/IPlanetRepository';
import { Astronaut } from '../domainObjects/astronaut';
import { BadRequestError, NotFoundError } from '../../tools/errors';

export class AstronautService {
  constructor(
    private readonly astronautRepository: IAstronautRepository,
    private readonly planetRepository: IPlanetRepository,
  ) { }

  getAstronauts() {
    return this.astronautRepository.getAstronauts();
  }

  async getAstronautbyId(id: string) {
    const astronaut = await this.astronautRepository.getAstronautbyId(id);
    if (!astronaut) {
      throw new NotFoundError(`Astronaut with id ${id} not found`)
    }
    return astronaut;
  }

  async recruitAstronaut(recruit: Recruit, planetId: string) {
    const planet = await this.planetRepository.getPlanetById(planetId)
    if (!planet)
      throw new NotFoundError(`planet with id ${planetId} not found`)
    if (!planet.isHabitable) {
      throw new BadRequestError(`The planet is not habitable !`)
    }

    return this.astronautRepository.saveAstronaut(recruit, planetId);
  }

  updateAstronaut(updatedAstronaut: Astronaut) {
    return this.astronautRepository.updateAstronaut(updatedAstronaut);
  }

  async fireAstronaut(id: string) {
    await this.astronautRepository.fireAstronaut(id)
    return this.getAstronauts()
  }
}