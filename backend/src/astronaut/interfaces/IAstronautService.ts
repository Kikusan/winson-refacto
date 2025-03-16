import Astronaut from "../entities/Astronaut";
import AstronautToUpdate from '../entities/AstronautToUpdate'
import AstronautToCreate from "../entities/AstronautToCreate";
import Filter from "../entities/Filter";

export default interface IAstronautService {
  getAll(filter?: Filter): Promise<Astronaut[]>;
  getById(id: number): Promise<Astronaut>;
  create(astronaut: AstronautToCreate): Promise<Astronaut>;
  update(astronaut: AstronautToUpdate): Promise<Astronaut>;
  delete(id: number): Promise<Astronaut[]>;
}

