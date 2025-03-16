import knex from "../../../db";
import Astronaut from "./entities/Astronaut";
import NotFoundError from "../../../common/notFoundError";
import UnexpectedError from "../../../common/unexpectedError";
import IUpsertAstronautRepository from "./interfaces/IRepository";
import AstronautToAdd from "./entities/AstronautToAdd";
import Planet from "./entities/Planet";



export class KnexUpsertAstronautRepository implements IUpsertAstronautRepository {
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
    execute = async (astronautToAdd: AstronautToAdd): Promise<Astronaut> => {
        if (astronautToAdd.id) {
            return this.update(astronautToAdd)
        }
        return this.create(astronautToAdd)

    }
    getPlanetById = async (id: number): Promise<Planet> => {
        const planet = await knex('planets').where('id', id).first();
        if (!planet) {
            throw new NotFoundError('planet not found');
        }
        return planet
    }

    private readonly getById = async (id: number): Promise<Astronaut> => {
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


    private readonly create = async (astronautToCreate: AstronautToAdd): Promise<Astronaut> => {
        try {
            const astronautCreated = await knex('astronauts').insert(astronautToCreate);
            return this.getById(astronautCreated[0])

        } catch (error) {
            throw new UnexpectedError('database error')
        }
    }
    private readonly update = async (astronautToUpdate: AstronautToAdd): Promise<Astronaut> => {
        const { id, firstname, lastname, originPlanetId } = astronautToUpdate;
        try {
            const updatedRows = await knex('astronauts').where('id', id).update({ firstname, lastname, originPlanetId });
            if (updatedRows === 0) {
                throw new NotFoundError('astronaut not found');
            }
            return this.getById(astronautToUpdate.id!)
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