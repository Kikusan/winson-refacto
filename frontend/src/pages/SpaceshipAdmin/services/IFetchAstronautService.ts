import { Astronaut } from './Astronaut';

export default interface IAstronautService {
  fetchAstronauts(): Promise<Astronaut[]>;
  deleteAstronaut(id: number): Promise<Astronaut[]>;
}