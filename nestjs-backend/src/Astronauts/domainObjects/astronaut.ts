export type Astronaut = {
  id: string,
  firstname: string,
  lastname: string,
  originPlanet: {
    id: string,
    name: string
  }
}