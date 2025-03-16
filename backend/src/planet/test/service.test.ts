import { PlanetService } from '../service';
import { FakePlanetRepository } from './fakeRepository';
import NotFoundError from '../../common/notFoundError';
import UnexpectedError from '../../common/unexpectedError';
import PlanetToCreate from '../entities/PlanetToCreate';
import PlanetToUpdate from '../entities/PlanetToUpdate';


describe('AstronautService', () => {
    let planetService: PlanetService;
    const fakeRepository = new FakePlanetRepository();
    const fakeRepositoryWithError = new FakePlanetRepository(true);
    const planetServiceFailure: PlanetService = new PlanetService(fakeRepositoryWithError);
    beforeEach(() => {
        planetService = new PlanetService(fakeRepository);
    });

    describe('getAll', () => {
        it('should return all planets', async () => {
            const result = await planetService.getAll();
            expect(result).toEqual(fakeRepository.planets);
        });

        it('should return planets with name containing search string', async () => {
            const result = await planetService.getAll('ars');
            const expectedResult = [
                { id: 2, name: 'Mars', isHabitable: false, description: 'Description 2', image: { path: 'path2', name: 'name2' } },
                { id: 4, name: 'Farse', isHabitable: false, description: 'Description 4', image: { path: 'path4', name: 'name4' } },
            ]
            expect(result).toEqual(expectedResult);
        });
        it('should throw an UnexpectedError if astronaut not found', async () => {
            await expect(planetServiceFailure.getAll()).rejects.toThrow(UnexpectedError);
        });
    });

    describe('getById', () => {
        it('should return a planet by id', async () => {
            const expectedResult = {
                id: 2, name: 'Mars', isHabitable: false, description: 'Description 2', image: { path: 'path2', name: 'name2' }
            };
            const result = await planetService.getById(2);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an NotFoundError if astronaut not found', async () => {
            await expect(planetService.getById(999)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            await expect(planetServiceFailure.getById(2)).rejects.toThrow(UnexpectedError);
        });

    });

    describe('create', () => {
        it('should create a new astronaut', async () => {
            const planetToCreate: PlanetToCreate = { name: 'Tatooine', isHabitable: true, imageId: 4, description: 'description 4' }
            const expectedResult = { id: 5, name: 'Tatooine', isHabitable: true, description: 'description 4', image: { path: 'path 4', name: 'name 4' } };
            const result = await planetService.create(planetToCreate);
            expect(fakeRepository.planets.length).toEqual(5);
            expect(result).toEqual(expectedResult);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            const planetToCreate: PlanetToCreate = { name: 'Tatooine', isHabitable: true, imageId: 4, description: 'description 4' }
            await expect(planetServiceFailure.create(planetToCreate)).rejects.toThrow(UnexpectedError);
        });
    });

    describe('update', () => {
        it('should update an astronaut', async () => {
            const planetToUpdate: PlanetToUpdate = { id: 4, name: 'Naboo', isHabitable: true, imageId: 2, description: 'description 2' }
            const expectedResult = { id: 4, name: 'Naboo', isHabitable: true, description: 'description 2', image: { path: 'path 2', name: 'name 2' } }

            const result = await planetService.update(planetToUpdate);

            expect(result).toEqual(expectedResult);
        });
        it('should throw an NotFoundError if astronaut not found', async () => {
            const planetToUpdate: PlanetToUpdate = { id: 888, name: 'Naboo', isHabitable: true, imageId: 2, description: 'description 2' }
            await expect(planetService.update(planetToUpdate)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            const planetToUpdate: PlanetToUpdate = { id: 4, name: 'Naboo', isHabitable: true, imageId: 2, description: 'description 2' }
            await expect(planetServiceFailure.update(planetToUpdate)).rejects.toThrow(UnexpectedError);
        });
    });


    describe('delete', () => {
        it('should delete an astronaut', async () => {
            await planetService.delete(2);
            await expect(planetService.getById(2)).rejects.toThrow(NotFoundError);
        });

        it('should throw an NotFoundError if astronaut not found', async () => {
            await expect(planetService.delete(999)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            await expect(planetServiceFailure.delete(2)).rejects.toThrow(UnexpectedError);
        });

    });
});
