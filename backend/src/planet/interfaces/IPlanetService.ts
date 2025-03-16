import Planet from "../entities/Planet";
import PlanetToCreate from "../entities/PlanetToCreate";
import PlanetToUpdate from "../entities/PlanetToUpdate";

export default interface IPlanetService {
    getAll(searchPlanet: string | undefined): Promise<Planet[]>;
    getById(id: number): Promise<Planet>;
    create(planet: PlanetToCreate): Promise<Planet>;
    update(planet: PlanetToUpdate): Promise<Planet>;
    delete(id: number): Promise<void>;
}
