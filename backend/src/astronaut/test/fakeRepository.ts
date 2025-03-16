
import Astronaut from "../entities/Astronaut";
import AstronautToUpdate from "../entities/AstronautToUpdate";
import AstronautToCreate from "../entities/AstronautToCreate";
import IAstronautRepository from "../interfaces/IAstronautRepository";
import NotFoundError from "../../common/notFoundError";
import UnexpectedError from "../../common/unexpectedError";
import Filter from "../entities/Filter";

export class FakeAstronautRepository implements IAstronautRepository {
  constructor(private readonly error: boolean = false) {
  }
  public astronauts: Astronaut[] = [
    { id: 1, firstname: 'John', lastname: 'Doe', originPlanet: { id: 1, name: 'Planet 1' } },
    { id: 2, firstname: 'Jane', lastname: 'Smith', originPlanet: { id: 1, name: 'Planet 1' } },
    { id: 3, firstname: 'Alice', lastname: 'Johnson', originPlanet: { id: 2, name: 'Planet 2' } },
    { id: 4, firstname: 'Bob', lastname: 'Brown', originPlanet: { id: 3, name: 'Planet 3' } },
    { id: 5, firstname: 'Charlie', lastname: 'Davis', originPlanet: { id: 2, name: 'Planet 2' } },
    { id: 6, firstname: 'Eve', lastname: 'Wilson', originPlanet: { id: 4, name: 'Planet 4' } },
    { id: 7, firstname: 'Frank', lastname: 'Miller', originPlanet: { id: 5, name: 'Planet 5' } },
    { id: 8, firstname: 'Grace', lastname: 'Garcia', originPlanet: { id: 3, name: 'Planet 3' } },
    { id: 9, firstname: 'Hank', lastname: 'Martinez', originPlanet: { id: 6, name: 'Planet 6' } },
    { id: 10, firstname: 'Ivy', lastname: 'Clark', originPlanet: { id: 4, name: 'Planet 4' } },
    { id: 11, firstname: 'Jack', lastname: 'Lopez', originPlanet: { id: 7, name: 'Planet 7' } },
    { id: 12, firstname: 'Kara', lastname: 'Lewis', originPlanet: { id: 5, name: 'Planet 5' } },
    { id: 13, firstname: 'Liam', lastname: 'Walker', originPlanet: { id: 8, name: 'Planet 8' } },
    { id: 14, firstname: 'Mia', lastname: 'Hall', originPlanet: { id: 6, name: 'Planet 6' } },
    { id: 15, firstname: 'Noah', lastname: 'Allen', originPlanet: { id: 9, name: 'Planet 9' } },
    { id: 16, firstname: 'Olivia', lastname: 'Young', originPlanet: { id: 7, name: 'Planet 7' } },
    { id: 17, firstname: 'Paul', lastname: 'Hernandez', originPlanet: { id: 10, name: 'Planet 10' } },
    { id: 18, firstname: 'Quinn', lastname: 'King', originPlanet: { id: 8, name: 'Planet 8' } },
    { id: 19, firstname: 'Riley', lastname: 'Scott', originPlanet: { id: 9, name: 'Planet 9' } },
    { id: 20, firstname: 'Sophia', lastname: 'Green', originPlanet: { id: 10, name: 'Planet 10' } },
    { id: 21, firstname: 'Thomas', lastname: 'Adams', originPlanet: { id: 11, name: 'Planet 11' } },
    { id: 22, firstname: 'Uma', lastname: 'Baker', originPlanet: { id: 12, name: 'Planet 12' } },
    { id: 23, firstname: 'Victor', lastname: 'Perez', originPlanet: { id: 11, name: 'Planet 11' } },
    { id: 24, firstname: 'Wendy', lastname: 'Turner', originPlanet: { id: 13, name: 'Planet 13' } },
    { id: 25, firstname: 'Xander', lastname: 'Collins', originPlanet: { id: 12, name: 'Planet 12' } },
    { id: 26, firstname: 'Yara', lastname: 'Stewart', originPlanet: { id: 14, name: 'Planet 14' } },
    { id: 27, firstname: 'Zack', lastname: 'Sanchez', originPlanet: { id: 13, name: 'Planet 13' } },
    { id: 28, firstname: 'Aiden', lastname: 'Morris', originPlanet: { id: 14, name: 'Planet 14' } },
    { id: 29, firstname: 'Bella', lastname: 'Rogers', originPlanet: { id: 15, name: 'Planet 15' } },
    { id: 30, firstname: 'Caleb', lastname: 'Reed', originPlanet: { id: 15, name: 'Planet 15' } }
  ]
    ;
  getAll = async (page?: Filter): Promise<Astronaut[]> => {
    if (this.error) {
      return Promise.reject(new UnexpectedError('database error'))
    }
    if (page) {
      return Promise.resolve(this.astronauts.slice((page.page - 1) * page.pageSize, page.page * page.pageSize))
    }
    return Promise.resolve(this.astronauts)
  }
  getById = async (id: number): Promise<Astronaut> => {
    if (this.error) {
      return Promise.reject(new UnexpectedError('database error'))
    }
    const astronaut: Astronaut | undefined = this.astronauts.find(astronaut => astronaut.id === id)
    if (!astronaut) {
      return Promise.reject(new NotFoundError('astronaut not found'))
    }
    return Promise.resolve(astronaut)
  }

  create = async (astronautToCreate: AstronautToCreate): Promise<Astronaut> => {
    if (this.error) {
      return Promise.reject(new UnexpectedError('database error'))
    }
    const newAstronaut = {
      firstname: astronautToCreate.firstname,
      lastname: astronautToCreate.lastname,
      id: this.astronauts.length + 1,
      originPlanet: { id: astronautToCreate.originPlanetid, name: `Planet ${astronautToCreate.originPlanetid}` }
    }
    this.astronauts.push(newAstronaut);
    return Promise.resolve(newAstronaut)
  }
  update = async (astronautToUpdate: AstronautToUpdate): Promise<Astronaut> => {
    if (this.error) {
      return Promise.reject(new UnexpectedError('database error'))
    }
    const astronaut = this.astronauts.find(a => a.id === astronautToUpdate.id);
    if (!astronaut) {
      return Promise.reject(new NotFoundError('astronaut not found'))

    }
    astronaut.firstname = astronautToUpdate.firstname;
    astronaut.lastname = astronautToUpdate.lastname;
    astronaut.originPlanet = { id: astronautToUpdate.originPlanetId, name: `Planet ${astronautToUpdate.originPlanetId}` }
    return Promise.resolve(astronaut)
  }
  delete = async (id: number): Promise<Astronaut[]> => {
    if (this.error) {
      return Promise.reject(new UnexpectedError('database error'))
    }
    const index = this.astronauts.findIndex(a => a.id === id);
    if (index === -1) {
      return Promise.reject(new NotFoundError('astronaut not found'))
    }
    this.astronauts.splice(index, 1);
    return this.astronauts
  }
}
