import Planet from "../entities/Planet";
import PlanetToCreate from "../entities/PlanetToCreate";
import PlanetToUpdate from "../entities/PlanetToUpdate";

export default interface IPlanetRepository {
    getAll(searchPlanet: string | undefined): Promise<Planet[]>;
    getById(id: number): Promise<Planet>;
    create(astronaut: PlanetToCreate): Promise<Planet>;
    update(astronaut: PlanetToUpdate): Promise<Planet>;
    delete(id: number): Promise<void>;
}
