import { PlanetItem } from './Planet';

export default interface IFetchPlanets {
  fetchPlanets(searchName?: string): Promise<PlanetItem[]>;
}