
import Planet from "./entities/Planet";
import PlanetToCreate from "./entities/PlanetToCreate";
import PlanetToUpdate from "./entities/PlanetToUpdate";
import IPlanetRepository from "./interfaces/IPlanetRepository";
import IPlanetService from "./interfaces/IPlanetService";

export class PlanetService implements IPlanetService {
    private readonly planetRepository: IPlanetRepository;
    constructor(planetRepository: IPlanetRepository) {
        this.planetRepository = planetRepository
    }
    getAll = async (searchPlanet: string | undefined = undefined): Promise<Planet[]> => {
        const astronauts = await this.planetRepository.getAll(searchPlanet);
        return astronauts;
    }
    getById = async (id: number): Promise<Planet> => {
        const astronaut = await this.planetRepository.getById(id);
        return astronaut;
    }
    create = (astronaut: PlanetToCreate): Promise<Planet> => {
        return this.planetRepository.create(astronaut)
    }
    update = (astronaut: PlanetToUpdate): Promise<Planet> => {
        return this.planetRepository.update(astronaut)
    }
    delete = (id: number): Promise<void> => {
        return this.planetRepository.delete(id)
    }
}