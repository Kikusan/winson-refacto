
import Planet from "../entities/Planet";
import PlanetToCreate from "../entities/PlanetToCreate";
import PlanetToUpdate from "../entities/PlanetToUpdate";
import IPlanetRepository from "../interfaces/IPlanetRepository";
import NotFoundError from "../../common/notFoundError";
import UnexpectedError from "../../common/unexpectedError";

export class FakePlanetRepository implements IPlanetRepository {
    constructor(private readonly error: boolean = false) {
    }
    public planets: Planet[] = [
        { id: 1, name: 'Earth', isHabitable: true, description: 'Description 1', image: { path: 'path1', name: 'name1' } },
        { id: 2, name: 'Mars', isHabitable: false, description: 'Description 2', image: { path: 'path2', name: 'name2' } },
        { id: 3, name: 'Jupiter', isHabitable: false, description: 'Description 3', image: { path: 'path3', name: 'name3' } },
        { id: 4, name: 'Farse', isHabitable: false, description: 'Description 4', image: { path: 'path4', name: 'name4' } },
    ];
    getAll = async (searchPlanet: string | undefined): Promise<Planet[]> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        if (searchPlanet) {
            const filteredPlanets = this.planets.filter(planet => planet.name.toLowerCase().includes(searchPlanet.toLowerCase()));
            return Promise.resolve(filteredPlanets)
        }

        return Promise.resolve(this.planets)
    }
    getById = async (id: number): Promise<Planet> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        const planets: Planet | undefined = this.planets.find(planets => planets.id === id)
        if (!planets) {
            return Promise.reject(new NotFoundError('planet not found'))
        }
        return Promise.resolve(planets)
    }

    create = async (planetToCreate: PlanetToCreate): Promise<Planet> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        const planetToAdd: Planet = {
            id: this.planets.length + 1,
            name: planetToCreate.name,
            isHabitable: planetToCreate.isHabitable,
            image: { path: `path ${planetToCreate.imageId}`, name: `name ${planetToCreate.imageId}` },
            description: planetToCreate.description ?? '',
        }
        this.planets.push(planetToAdd);
        return Promise.resolve(planetToAdd)
    }
    update = async (planetToUpdate: PlanetToUpdate): Promise<Planet> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        const planet = this.planets.find(a => a.id === planetToUpdate.id);
        if (!planet) {
            return Promise.reject(new NotFoundError('planet not found'))

        }

        planet.name = planetToUpdate.name;
        planet.isHabitable = planetToUpdate.isHabitable;
        planet.image = { path: `path ${planetToUpdate.imageId}`, name: `name ${planetToUpdate.imageId}` },
            planet.description = planetToUpdate.description ?? '';
        return Promise.resolve(planet)
    }
    delete = async (id: number): Promise<void> => {
        if (this.error) {
            return Promise.reject(new UnexpectedError('database error'))
        }
        const index = this.planets.findIndex(a => a.id === id);
        if (index === -1) {
            return Promise.reject(new NotFoundError('planet not found'))
        }
        this.planets.splice(index, 1);
    }
}
