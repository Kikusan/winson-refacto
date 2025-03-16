import { Astronaut } from "../domainObjects/astronaut";
import { Recruit } from "../domainObjects/recruit";

export interface IAstronautRepository {
  getAstronauts(): Promise<Astronaut[]>;
  getAstronautbyId(id: string): Promise<Astronaut | null>;
  saveAstronaut(recruit: Recruit, planetId: string): Promise<Astronaut>;
  updateAstronaut(updatedAstronaut: Astronaut): Promise<Astronaut>;
  fireAstronaut(id: string): Promise<Astronaut[]>;
}
