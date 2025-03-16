import { Request, Response } from 'express';
import { AstronautController } from './../controller';
import { AstronautService } from './../service';
import { FakeAstronautRepository } from './fakeRepository';

describe('AstronautController', () => {
  const fakeRepository = new FakeAstronautRepository()
  const astronautService = new AstronautService(fakeRepository)
  const astronautController = new AstronautController(astronautService);
  const fakeRepositoryWithError = new FakeAstronautRepository(true)
  const astronautServiceWithError = new AstronautService(fakeRepositoryWithError)
  const astronautControllerWithError = new AstronautController(astronautServiceWithError);
  let req: Partial<Request>;
  let res: Partial<Response>;
  beforeEach(() => {


    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  describe('GET /astronauts', () => {
    it('should return a list of astronauts with status 200', async () => {
      await astronautController.getAll(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeRepository.astronauts);
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
      req = { query: { page: filter.page.toString(), pageSize: filter.pageSize.toString() } }
      const result = await astronautService.getAll(filter);
      expect(result).toEqual(expectedResult);
    });

    it('should return status 500 and error message if an unexpected error occurs', async () => {
      await astronautControllerWithError.getAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
    });
  })

  describe('GET /astronauts/:id', () => {
    it('should return an astronaut with status 200', async () => {
      req = { params: { id: "2" } }
      const expectedResult = { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } }
      await astronautController.getById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
    it('should return astronaut not found with status 404 when astronaut not found', async () => {
      req = { params: { id: "2000" } }
      await astronautController.getById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'astronaut not found' });
    });

    it('should return database error with status 500 when database is down', async () => {
      req = { params: { id: "2" } }
      await astronautControllerWithError.getById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
    });
  })

  describe('POST /astronauts', () => {

    it('should return a list of astronauts with status 201', async () => {
      req = { body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
      const expectedResult = { id: 31, firstname: 'Marcel', lastname: 'Dupont', originPlanet: { id: 3, name: 'Planet 3' } }
      await astronautController.create(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it('should return status 500 and error message if an unexpected error occurs', async () => {
      req = { body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
      await astronautControllerWithError.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
    });
  })

  describe('PUT /astronauts/:id', () => {
    it('should return an astronaut with status 200', async () => {
      req = { params: { id: "2" }, body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
      const expectedResult = { id: 2, firstname: 'Marcel', lastname: 'Dupont', originPlanet: { id: 3, name: 'Planet 3' } }
      await astronautController.update(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
    it('should return astronaut not found with status 404 when astronaut not found', async () => {
      req = { params: { id: "2000" }, body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
      await astronautController.getById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'astronaut not found' });
    });

    it('should return database error with status 500 when database is down', async () => {
      req = { params: { id: "2" }, body: { firstname: 'Marcel', lastname: 'Dupont', originPlanetId: '3' } }
      await astronautControllerWithError.getById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
    });
  })

  describe('DELETE /astronauts/:id', () => {
    it('should return an astronaut with status 200', async () => {
      req = { params: { id: "2" } }
      const expectedResult = fakeRepository.astronauts.filter((astronaut) => astronaut.id != 2)
      await astronautController.delete(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
    it('should return astronaut not found with status 404 when astronaut not found', async () => {
      req = { params: { id: "2000" } }
      await astronautController.delete(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'astronaut not found' });
    });

    it('should return database error with status 500 when database is down', async () => {
      req = { params: { id: "2" } }
      await astronautControllerWithError.delete(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'database error' });
    });
  })
});
