import { Astronaut } from './Astronaut';
import { AstronautToUpdate } from './AstronautToUpdate';


export default interface IUpdateAstronaut {
  update(astronaut: AstronautToUpdate): Promise<Astronaut>;
  getById(id: string): Promise<Astronaut>;
}