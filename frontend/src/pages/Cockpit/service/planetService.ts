import IPlanetService from './IPlanetService';

export class PlanetService implements IPlanetService {
  fetchPlanets = async () => {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/planets`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
}