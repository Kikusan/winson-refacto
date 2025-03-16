import Astronaut from "../entities/Astronaut";
import Planet from "../entities/Planet";
import AstronautToCreate from "../entities/AstronautToAdd";

export default interface IUpsertAstronautRepository {
    execute(astronaut: AstronautToCreate): Promise<Astronaut>;
    getPlanetById(id: number): Promise<Planet>;
}
