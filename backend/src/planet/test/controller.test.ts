import { Request, Response } from 'express';
import { PlanetController } from './../controller';
import { PlanetService } from './../service';
import { FakePlanetRepository } from './fakeRepository';

describe('AstronautController', () => {
    const fakeRepository = new FakePlanetRepository()
    const planetService = new PlanetService(fakeRepository)
    const planetController = new PlanetController(planetService);
    const fakeRepositoryWithError = new FakePlanetRepository(true)
    const planetServiceWithError = new PlanetService(fakeRepositoryWithError)
    const planetControllerWithError = new PlanetController(planetServiceWithError);
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {


        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    describe('GET /planets', () => {
        it('should return a list of planets with status 200', async () => {
            req = { query: {} }
            await planetController.getAll(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(fakeRepository.planets);
        });

        it('should return status 500 and error message if an unexpected error occurs', async () => {
            req = { query: {} }
            await planetControllerWithError.getAll(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('GET /planets/:id', () => {
        it('should return an planet with status 200', async () => {
            req = { params: { id: "2" } }
            const expectedResult = {
                id: 2, name: 'Mars', isHabitable: false, description: 'Description 2', image: { path: 'path2', name: 'name2' }
            };
            await planetController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedResult);
        });
        it('should return planet not found with status 404 when planet not found', async () => {
            req = { params: { id: "2000" } }
            await planetController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'planet not found' });
        });

        it('should return database error with status 500 when database is down', async () => {
            req = { params: { id: "2" } }
            await planetControllerWithError.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('POST /planets', () => {

        it('should return a list of planets with status 201', async () => {
            req = { body: { name: 'Tatooine', isHabitable: true, imageId: 4, description: 'description 4' } }
            const expectedResult = { id: 5, name: 'Tatooine', isHabitable: true, description: 'description 4', image: { path: 'path 4', name: 'name 4' } };
            await planetController.create(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expectedResult);
        });

        it('should return status 500 and error message if an unexpected error occurs', async () => {
            req = { body: { name: 'Tatooine', isHabitable: true, imageId: 4, description: 'description 4' } }
            await planetControllerWithError.create(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('PUT /planets/:id', () => {
        it('should return an planet with status 200', async () => {
            req = { params: { id: "2" }, body: { name: 'Naboo', isHabitable: true, imageId: 2, description: 'description 2' } }
            const expectedResult = { id: 2, name: 'Naboo', isHabitable: true, description: 'description 2', image: { path: 'path 2', name: 'name 2' } }
            await planetController.update(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedResult);
        });
        it('should return planet not found with status 404 when planet not found', async () => {
            req = { params: { id: "2000" }, body: { name: 'Naboo', isHabitable: true, imageId: 2, description: 'description 2' } }
            await planetController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'planet not found' });
        });

        it('should return database error with status 500 when database is down', async () => {
            req = { params: { id: "2" }, body: { name: 'Naboo', isHabitable: true, imageId: 2, description: 'description 2' } }
            await planetControllerWithError.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })

    describe('DELETE /planets/:id', () => {
        it('should return an planet with status 204', async () => {
            req = { params: { id: "2" } }
            await planetController.delete(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(undefined);
        });
        it('should return planet not found with status 404 when planet not found', async () => {
            req = { params: { id: "2000" } }
            await planetController.delete(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'planet not found' });
        });

        it('should return database error with status 500 when database is down', async () => {
            req = { params: { id: "2" } }
            await planetControllerWithError.delete(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
        });
    })
});
