import { AstronautService } from './service';
import { TypeORMAstronaut } from '../repositories/typeORM/entities/astronaut.entity';
import { Planet } from '../repositories/typeORM/entities/planet.entity';
import { Recruit } from '../domainObjects/recruit';
import { FakeAstronautRepository } from '../repositories/fake/FakeAstronautRepository';
import { FakePlanetRepository } from '../repositories/fake/FakePlanetRepository';

describe('AstronautService', () => {

  let service: AstronautService;
  let astronautRepository: FakeAstronautRepository;
  let planetRepository: FakePlanetRepository
  beforeEach(() => {
    astronautRepository = new FakeAstronautRepository();
    planetRepository = new FakePlanetRepository()
    service = new AstronautService(astronautRepository, planetRepository);
  })

  it('should get all astronauts', async () => {
    const result = await service.getAstronauts()
    expect(result).toEqual(astronautRepository.astronauts);
  });

  it('should get an astronaut by ID', async () => {
    const expectedResult = {
      id: 'riri id',
      firstname: 'riri',
      lastname: 'duck',
      originPlanet: {
        name: 'Moon',
        id: 'id',
      }
    }
    const result = await service.getAstronautbyId('riri id')
    expect(result).toEqual(expectedResult);
  });

  it('should recruit an astronaut', async () => {
    const recruit: Recruit = { firstname: 'John', lastname: 'Doe' };
    const planet: Planet = { id: 'planet id', name: 'planet' } as Planet;
    const savedAstronaut: TypeORMAstronaut = { firstname: 'John', lastname: 'Doe', originPlanet: planet } as TypeORMAstronaut;

    const result = await service.recruitAstronaut(recruit, 'id');
    expect(result).toEqual({ ...savedAstronaut, id: 'John id' });
  });

  it('should update an astronaut', async () => {
    const updatedAstronaut: TypeORMAstronaut = {
      id: 'riri id',
      createdAt: new Date('2025-02-12T10:16:21.593Z'),
      updatedAt: new Date('2025-02-12T10:16:21.593Z'),
      firstname: 'riri ruka',
      lastname: 'fuck',
      originPlanet: {
        name: 'DuckTown',
        id: 'DuckTown id',
        isHabitable: true,
        astronauts: []
      }
    };
    await service.updateAstronaut(updatedAstronaut)
    const riri = astronautRepository.astronauts.find(astronaut => astronaut.id === 'riri id')
    expect(riri).toEqual(updatedAstronaut)
  });

  it('should fire an astronaut', async () => {
    await service.fireAstronaut('riri id');
    const riri = astronautRepository.astronauts.find(astronaut => astronaut.id === 'riri id')
    expect(astronautRepository.astronauts).toHaveLength(2)
    expect(riri).toBeUndefined()
  });
});
