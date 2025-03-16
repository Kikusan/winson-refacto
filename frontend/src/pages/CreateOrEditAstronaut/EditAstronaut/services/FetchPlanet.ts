import IFetchPlanets from './IFetchPlanets';
import { Planet, PlanetItem } from './Planet';

export class FetchPlanetService implements IFetchPlanets {
  fetchPlanets = async (searchName: string): Promise<PlanetItem[]> => {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/planets?filterName=${searchName}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const planets: Planet[] = await response.json();
    return planets.map((planet: Planet) => ({
      label: planet.name,
      value: planet.id.toString(),
    }));

  };
}