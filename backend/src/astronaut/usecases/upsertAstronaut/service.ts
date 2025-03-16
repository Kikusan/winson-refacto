import BadRequestError from "../../../common/badRequestError";
import NotFoundError from "../../../common/notFoundError";
import Astronaut from "./entities/Astronaut";
import AstronautToCreate from "./entities/AstronautToAdd";
import IUpsertAstronautRepository from "./interfaces/IRepository";
import IUpsertAstronautService from "./interfaces/IService";


export class UpsertAstronautService implements IUpsertAstronautService {
    private readonly upsertAstronautRepository: IUpsertAstronautRepository;
    constructor(upsertAstronautRepository: IUpsertAstronautRepository) {
        this.upsertAstronautRepository = upsertAstronautRepository
    }
    execute = async (astronautToCreate: AstronautToCreate): Promise<Astronaut> => {
        const { originPlanetId } = astronautToCreate;
        const planet = await this.upsertAstronautRepository.getPlanetById(originPlanetId);
        if (!planet) {
            throw new NotFoundError(`Planet with id ${originPlanetId} not found`)
        }
        if (!planet.isHabitable) {
            const { id, name } = planet;
            throw new BadRequestError(`Planet ${name} with id ${id} is not habitable`)
        }
        return this.upsertAstronautRepository.execute(astronautToCreate)
    }

}