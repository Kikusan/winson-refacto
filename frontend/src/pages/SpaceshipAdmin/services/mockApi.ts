/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { Astronaut } from './Astronaut';

const mockAstronautList: Astronaut[] = [
  {
    'id': 11,
    'firstname': 'Johnny',
    'lastname': 'Smith',
    'originPlanet': {
      'name': 'Schizo Cats',
      'id': 4,
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
    'id': 20,
    'firstname': 'Eikichi',
    'lastname': 'Onizuka',
    'originPlanet': {
      'name': 'Raccoon from Asgard',
      'id': 3,
    },
  },
];


export const handlers = [
  http.get(
    `http://${import.meta.env.VITE_API_URL}/astronauts`,
    () => {
      return HttpResponse.json(mockAstronautList);
    },
  ),

  http.delete(
    `http://${import.meta.env.VITE_API_URL}/astronauts/:id`,
    () => {
      return HttpResponse.json(mockAstronautList);
    },
  ),
];

export const server = setupServer(...handlers);

