import { Planet } from '@api/planet.api';
import IPlanetService from './IPlanetService';

export class FakePlanetService implements IPlanetService {
  private readonly error: boolean = false;

  constructor(error: boolean = false) {
    this.error = error;
  }

  readonly planets: Planet[] = [
    {
      'id': 1,
      'name': 'Donut Factory',
      'isHabitable': true,
      'description': 'Forte en calories',
      'image': {
        'path': '/assets/donut_factory.jpg',
        'name': 'Donut Factory Image',
      },
    },
    {
      'id': 11,
      'name': 'pouloulou',
      'isHabitable': false,
      'description': 'Mi pou pooooou',
      'image': {
        'path': '/assets/pouloulou.jpg',
        'name': 'pouloulou Image',
      },
    },
    {
      'id': 2,
      'name': 'Duck Invaders',
      'isHabitable': true,
      'description': 'La danse ici est une religion',
      'image': {
        'path': '/assets/duck_invaders.jpg',
        'name': 'Duck Invaders Image',
      },
    },
    {
      'id': 3,
      'name': 'Raccoon from Asgard',
      'isHabitable': true,
      'description': 'Espiegle mais pas trop',
      'image': {
        'path': '/assets/raccoon_asgards.jpg',
        'name': 'Raccoon from Asgard Image',
      },
    },
    {
      'id': 8,
      'name': 'Kikusan world',
      'isHabitable': true,
      'image': {
        'path': '/assets/raccoon_asgards.jpg',
        'name': 'Raccoon from Asgard Image',
      },
    },
    {
      'id': 4,
      'name': 'Schizo Cats',
      'isHabitable': true,
      'description': 'Non leur planete n\'est pas une pelote',
      'image': {
        'path': '/assets/schizo_cats.jpg',
        'name': 'Schizo Cats Image',
      },
    },
  ];

  fetchPlanets = () => {
    if (this.error) {
      throw new Error('cheh');
    }
    return Promise.resolve(this.planets);
  };
}
