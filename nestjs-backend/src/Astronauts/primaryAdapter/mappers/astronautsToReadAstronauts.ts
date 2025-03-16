import { Astronaut } from "src/Astronauts/domainObjects/astronaut";
import { ReadAstronautDTO } from "../dto/readAstronaut.dto";

export function mapAstronautsToReadAstronauts(astronauts: Astronaut[]): ReadAstronautDTO[] {
  return astronauts.map(astronaut => mapAstronautToReadAstronaut(astronaut));
}

export function mapAstronautToReadAstronaut(astronaut: Astronaut): ReadAstronautDTO {
  return {
    id: astronaut.id,
    firstname: astronaut.firstname,
    lastname: astronaut.lastname,
    originPlanet: {
      id: astronaut.originPlanet.id,
      name: astronaut.originPlanet.name
    }
  }
} 