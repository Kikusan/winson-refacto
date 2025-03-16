import { Planet } from '@api/planet.api';

export type Astronaut = {
  id: number;
  firstname: string;
  lastname: string;
  originPlanet: Planet;
};