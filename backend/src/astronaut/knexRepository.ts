
import Astronaut from "./entities/Astronaut";
import AstronautToUpdate from "./entities/AstronautToUpdate";
import AstronautToCreate from "./entities/AstronautToCreate";
import IAstronautRepository from "./interfaces/IAstronautRepository";
import knex from "../db";
import NotFoundError from "../common/notFoundError";
import UnexpectedError from "../common/unexpectedError";
import Filter from "./entities/Filter";

export class KnexAstronautRepository implements IAstronautRepository {
  private knexResultToAstronaut(knexResult: KnexResult): Astronaut {
    const { id, firstname, lastname, name, planetId } = knexResult;
    return {
      id,
      firstname,
      lastname,
      originPlanet: {
        name,
        id: planetId,
      },
    }
  }
  getAll = async (filter?: Filter): Promise<Astronaut[]> => {
    try {
      const getAllQuery = knex('astronauts')
        .select('astronauts.*', 'planets.name', 'planets.id as planetId')
        .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
        .join('images', 'images.id', '=', 'planets.imageId')
      if (filter) {
        getAllQuery.limit(filter.pageSize).offset((filter.page - 1) * filter.pageSize);
      }
      const astronauts: Astronaut[] = (await getAllQuery)
        .map((knexResult: KnexResult) => this.knexResultToAstronaut(knexResult));
      return astronauts
    } catch (error) {
      throw new UnexpectedError('database error')
    }
  }
  getById = async (id: number): Promise<Astronaut> => {
    try {
      const knexResult = await knex('astronauts').select('astronauts.*', 'planets.name', 'planets.id as planetId')
        .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
        .where('astronauts.id', id).first();
      if (!knexResult) {
        throw new NotFoundError('astronaut not found');
      }
      const updatedAstronaut: Astronaut = this.knexResultToAstronaut(knexResult);
      return updatedAstronaut

    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError('astronaut not found');
      }
      throw new UnexpectedError('database error')
    }
  }

  create = async (astronautToCreate: AstronautToCreate): Promise<Astronaut> => {
    try {
      const astronautCreated = await knex.insert(astronautToCreate).into('astronauts');
      return this.getById(astronautCreated[0])

    } catch (error) {
      throw new UnexpectedError('database error')
    }
  }
  update = async (astronautToUpdate: AstronautToUpdate): Promise<Astronaut> => {
    const { id, firstname, lastname, originPlanetId } = astronautToUpdate;
    try {
      const updatedRows = await knex('astronauts').where('id', id).update({ firstname, lastname, originPlanetId });
      if (updatedRows === 0) {
        throw new NotFoundError('astronaut not found');
      }
      return this.getById(astronautToUpdate.id)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError('astronaut not found');
      }
      throw new UnexpectedError('database error')
    }
  }
  delete = async (id: number): Promise<Astronaut[]> => {
    try {
      const deletedRows = await knex('astronauts').where('id', id).del();
      if (deletedRows === 0) {
        throw new NotFoundError('astronaut not found');
      }
      return this.getAll();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError('astronaut not found');
      }
      throw new UnexpectedError('database error')
    }
  }
}



interface KnexResult {
  id: number;
  firstname: string;
  lastname: string;
  name: string;
  planetId: number;

}