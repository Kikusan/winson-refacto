import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AstronautController } from './controller';
import { AstronautService } from '../services/service';
import { FakeAstronautRepository } from '../repositories/fake/FakeAstronautRepository';
import { FakePlanetRepository } from '../repositories/fake/FakePlanetRepository';
import { ReadAstronautDTO } from './dto/readAstronaut.dto';

describe('AstronautController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AstronautController],
      providers: [
        {
          provide: AstronautService,
          useFactory: (
            astronautRepository,
            planetRepository,

          ) => {

            return new AstronautService(
              astronautRepository,
              planetRepository,
            );
          },
          inject: [
            'astronautRepository',
            'planetRepository',
          ],
        },
        {
          provide: 'astronautRepository',
          useFactory: () => new FakeAstronautRepository()
        },
        {
          provide: 'planetRepository',
          useFactory: () => new FakePlanetRepository()
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return an array of astronauts', async () => {
    const response = await request(app.getHttpServer()).get('/astronauts').expect(200);
    const expectedResult: ReadAstronautDTO[] = [
      { "firstname": "riri", "id": "riri id", "lastname": "duck", "originPlanet": { "id": "id", "name": "Moon" } },
      { "firstname": "fifi", "id": "fifi id", "lastname": "duck", "originPlanet": { "id": "id", "name": "Moon" } },
      { "firstname": "loulou", "id": "loulou id", "lastname": "duck", "originPlanet": { "id": "id", "name": "Moon" } }
    ]
    expect(response.body).toEqual(expectedResult);
  });

  afterAll(async () => {
    await app.close();
  });
});
