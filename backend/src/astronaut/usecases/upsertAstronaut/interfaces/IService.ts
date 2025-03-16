import Astronaut from "../entities/Astronaut";
import AstronautToAdd from "../entities/AstronautToAdd";

export default interface IUpsertAstronautService {
    execute(astronaut: AstronautToAdd): Promise<Astronaut>;
}
