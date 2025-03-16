import { Planet } from '@api/planet.api';

export type Astronaut = {
  id: string;
  firstname: string;
  lastname: string;
  originPlanet: Planet;
};