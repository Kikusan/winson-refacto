import { Astronaut } from './Astronaut';
import { AstronautToCreate } from './AstronautToCreate';


export default interface IRecruitAstronaut {
  recruit(astronaut: AstronautToCreate): Promise<Astronaut>;
}