import { Planet } from '@api/planet.api';

export default interface IPlanetService {
  fetchPlanets(): Promise<Planet[]>;
}