import Astronaut from "./entities/Astronaut";
import AstronautToCreate from "./entities/AstronautToCreate";
import AstronautToUpdate from "./entities/AstronautToUpdate";
import Page from "./entities/Filter";
import IAstronautRepository from "./interfaces/IAstronautRepository";
import IAstronautService from "./interfaces/IAstronautService";

export class AstronautService implements IAstronautService {
  private readonly astronautRepository: IAstronautRepository;
  constructor(astronautRepository: IAstronautRepository) {
    this.astronautRepository = astronautRepository
  }
  getAll = async (page?: Page): Promise<Astronaut[]> => {
    const astronauts = await this.astronautRepository.getAll(page);
    return astronauts;
  }
  getById = async (id: number): Promise<Astronaut> => {
    const astronaut = await this.astronautRepository.getById(id);
    return astronaut;
  }
  create = (astronaut: AstronautToCreate): Promise<Astronaut> => {
    return this.astronautRepository.create(astronaut)
  }
  update = (astronaut: AstronautToUpdate): Promise<Astronaut> => {
    return this.astronautRepository.update(astronaut)
  }
  delete = (id: number): Promise<Astronaut[]> => {
    return this.astronautRepository.delete(id)
  }
}