import { AstronautService } from '../service';
import { FakeAstronautRepository } from './fakeRepository'
import AstronautToCreate from './../entities/AstronautToCreate';
import AstronautToUpdate from './../entities/AstronautToUpdate';
import NotFoundError from '../../common/notFoundError';
import UnexpectedError from '../../common/unexpectedError';
import Filter from '../entities/Filter';


describe('AstronautService', () => {
    let astronautService: AstronautService;
    const fakeRepository = new FakeAstronautRepository();
    const fakeRepositoryWithError = new FakeAstronautRepository(true);
    const astronautServiceFailure: AstronautService = new AstronautService(fakeRepositoryWithError);
    beforeEach(() => {
        astronautService = new AstronautService(fakeRepository);
    });

    describe('getAll', () => {
        it('should return all astronauts', async () => {
            const result = await astronautService.getAll();
            expect(result).toEqual(fakeRepository.astronauts);
        });

        it.each([
            {
                filter: { page: 1, pageSize: 5 },
                expectedResult: [
                    { id: 1, firstname: 'John', lastname: 'Doe', originPlanet: { id: 1, name: 'Planet 1' } },
                    { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } },
                    { id: 3, firstname: 'Alice', lastname: 'Johnson', originPlanet: { id: 2, name: 'Planet 2' } },
                    { id: 4, firstname: 'Bob', lastname: 'Brown', originPlanet: { id: 3, name: 'Planet 3' } },
                    { id: 5, firstname: 'Charlie', lastname: 'Davis', originPlanet: { id: 2, name: 'Planet 2' } }
                ],
            },
            {
                filter: { page: 2, pageSize: 3 },
                expectedResult: [
                    { id: 4, firstname: 'Bob', lastname: 'Brown', originPlanet: { id: 3, name: 'Planet 3' } },
                    { id: 5, firstname: 'Charlie', lastname: 'Davis', originPlanet: { id: 2, name: 'Planet 2' } },
                    { id: 6, firstname: 'Eve', lastname: 'Wilson', originPlanet: { id: 4, name: 'Planet 4' } },
                ],
            },
            {
                filter: { page: 2, pageSize: 8 },
                expectedResult: [
                    { id: 9, firstname: 'Hank', lastname: 'Martinez', originPlanet: { id: 6, name: 'Planet 6' } },
                    { id: 10, firstname: 'Ivy', lastname: 'Clark', originPlanet: { id: 4, name: 'Planet 4' } },
                    { id: 11, firstname: 'Jack', lastname: 'Lopez', originPlanet: { id: 7, name: 'Planet 7' } },
                    { id: 12, firstname: 'Kara', lastname: 'Lewis', originPlanet: { id: 5, name: 'Planet 5' } },
                    { id: 13, firstname: 'Liam', lastname: 'Walker', originPlanet: { id: 8, name: 'Planet 8' } },
                    { id: 14, firstname: 'Mia', lastname: 'Hall', originPlanet: { id: 6, name: 'Planet 6' } },
                    { id: 15, firstname: 'Noah', lastname: 'Allen', originPlanet: { id: 9, name: 'Planet 9' } },
                    { id: 16, firstname: 'Olivia', lastname: 'Young', originPlanet: { id: 7, name: 'Planet 7' } },
                ],
            },
        ])('should return astronauts for the given filter %#', async ({ filter, expectedResult }) => {
            const result = await astronautService.getAll(filter);
            expect(result).toEqual(expectedResult);
        });


        it('should return astronauts for a given page', async () => {
            const filter: Filter = { page: 1, pageSize: 5 }
            const expectedResult = [{ id: 1, firstname: 'John', lastname: 'Doe', originPlanet: { id: 1, name: 'Planet 1' } },
            { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } },
            { id: 3, firstname: 'Alice', lastname: 'Johnson', originPlanet: { id: 2, name: 'Planet 2' } },
            { id: 4, firstname: 'Bob', lastname: 'Brown', originPlanet: { id: 3, name: 'Planet 3' } },
            { id: 5, firstname: 'Charlie', lastname: 'Davis', originPlanet: { id: 2, name: 'Planet 2' } }]
            const result = await astronautService.getAll(filter);
            expect(result).toEqual(expectedResult);
        });
        it('should throw an UnexpectedError if astronaut not found', async () => {
            await expect(astronautServiceFailure.getAll()).rejects.toThrow(UnexpectedError);
        });
    });

    describe('getById', () => {
        it('should return an astronaut by id', async () => {
            const expectedResult = { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } }
            const result = await astronautService.getById(2);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an NotFoundError if astronaut not found', async () => {
            await expect(astronautService.getById(999)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            await expect(astronautServiceFailure.getById(2)).rejects.toThrow(UnexpectedError);
        });

    });

    describe('create', () => {
        it('should create a new astronaut', async () => {
            const astronautToCreate: AstronautToCreate = { firstname: 'John', lastname: 'Doe', originPlanetid: 2 }
            const expectedResult = { id: 31, firstname: 'John', lastname: 'Doe', originPlanet: { id: 2, name: 'Planet 2' } }
            const result = await astronautService.create(astronautToCreate);
            expect(fakeRepository.astronauts.length).toEqual(31);
            expect(result).toEqual(expectedResult);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            const astronautToCreate: AstronautToCreate = { firstname: 'John', lastname: 'Doe', originPlanetid: 2 }
            await expect(astronautServiceFailure.create(astronautToCreate)).rejects.toThrow(UnexpectedError);
        });
    });

    describe('update', () => {
        it('should update an astronaut', async () => {
            const astronautToUpdate: AstronautToUpdate = { id: 1, firstname: 'Robert', lastname: 'Robichet', originPlanetId: 5 }
            const expectedResult = {
                id: 1, firstname: 'Robert', lastname: 'Robichet', originPlanet: { id: 5, name: 'Planet 5' }
            }

            const result = await astronautService.update(astronautToUpdate);

            expect(result).toEqual(expectedResult);
        });
        it('should throw an NotFoundError if astronaut not found', async () => {
            const astronautToUpdate: AstronautToUpdate = { id: 999, firstname: 'Robert', lastname: 'Robichet', originPlanetId: 5 }
            await expect(astronautService.update(astronautToUpdate)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            const astronautToUpdate: AstronautToUpdate = { id: 1, firstname: 'Robert', lastname: 'Robichet', originPlanetId: 5 }
            await expect(astronautServiceFailure.update(astronautToUpdate)).rejects.toThrow(UnexpectedError);
        });
    });


    describe('delete', () => {
        it('should delete an astronaut', async () => {
            await astronautService.delete(2);
            await expect(astronautService.getById(2)).rejects.toThrow(NotFoundError);
        });

        it('should throw an NotFoundError if astronaut not found', async () => {
            await expect(astronautService.delete(999)).rejects.toThrow(NotFoundError);
        });

        it('should throw an UnexpectedError if unknwon error', async () => {
            await expect(astronautServiceFailure.delete(2)).rejects.toThrow(UnexpectedError);
        });

    });
});
