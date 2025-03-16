interface Astronaut {
    id: number;
    firstname: string;
    lastname: string;
    originPlanet: Planet;
}

interface Planet {
    id: number,
    name: string,
}

export default Astronaut;
