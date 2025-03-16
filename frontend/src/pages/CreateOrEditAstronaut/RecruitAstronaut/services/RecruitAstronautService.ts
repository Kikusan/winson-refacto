import { Astronaut } from './Astronaut';
import { AstronautToCreate } from './AstronautToCreate';
import IRecruitAstronautService from './IRecruitAstronautService';

export class RecruitAstronautService implements IRecruitAstronautService {
  recruit = async (astronaut: AstronautToCreate): Promise<Astronaut> => {
    const astronautToCreateFormatted = {
      firstname: astronaut.firstname,
      lastname: astronaut.lastname,
      originPlanet: {
        id: astronaut.originPlanetId,
      },
    };
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/astronauts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(astronautToCreateFormatted),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

}