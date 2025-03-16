export type Astronaut = {
  id: number;
  firstname: string;
  lastname: string;
  originPlanet: {
    name: string,
    id: number
  };
};
