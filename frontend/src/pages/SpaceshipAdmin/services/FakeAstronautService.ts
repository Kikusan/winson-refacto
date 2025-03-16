import { Astronaut } from './Astronaut';
import IFetchAstronautService from './IFetchAstronautService';

export class FakeAstronautService implements IFetchAstronautService {
  private readonly error: boolean = false;

  astronauts: Astronaut[] = [
    {
      'id': 9,
      'firstname': 'Johnny',
      'lastname': 'Ingal',
      'originPlanet': {
        'name': "Kikusan's world",
        'id': 5,
      },
    },
    {
      'id': 11,
      'firstname': 'Johnnny',
      'lastname': 'Smith',
      'originPlanet': {
        'name': 'Schizo Cats',
        'id': 4,
      },
    },
    {
      'id': 12,
      'firstname': 'John',
      'lastname': 'Nguyen',
      'originPlanet': {
        'name': 'Duck Invaders',
        'id': 2,
      },
    },
    {
      'id': 13,
      'firstname': 'Bob',
      'lastname': 'koko',
      'originPlanet': {
        'name': 'Raccoon from Asgard',
        'id': 3,
      },
    },
    {
      'id': 17,
      'firstname': 'Bobby',
      'lastname': 'Trap',
      'originPlanet': {
        'name': 'Donut Factory',
        'id': 1,
      },
    },
    {
      'id': 18,
      'firstname': 'Kenshiro',
      'lastname': 'Watcha',
      'originPlanet': {
        'name': 'Duck Invaders',
        'id': 2,
      },
    },
  ];

  constructor(error: boolean = false) {
    this.error = error;
  }

  fetchAstronauts = async () => {
    if (this.error) {
      throw new Error('cheh');
    }
    return Promise.resolve(this.astronauts);
  };

  deleteAstronaut = async (id: number): Promise<Astronaut[]> => {
    if (this.error) {
      throw new Error('cheh again');
    }
    const index = this.astronauts.findIndex(astronaut => astronaut.id === id);
    if (index !== -1) {
      this.astronauts = [
        ...this.astronauts.slice(0, index),
        ...this.astronauts.slice(index + 1),
      ];
      console.log(`Astronaut with ID ${id} has been deleted.`);
    } else {
      throw new Error(`Astronaut with ID ${id} not found.`);
    }

    return Promise.resolve(this.astronauts);
  };
}