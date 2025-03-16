import { Planet } from "./typeORM/entities/planet.entity";

export interface IPlanetRepository {
  getPlanetById(planetId: string): Promise<Planet>
}
