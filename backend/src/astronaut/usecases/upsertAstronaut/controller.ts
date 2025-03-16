import { Request, Response } from 'express';
import NotfoundError from '../../../common/notFoundError';
import UnexpectedError from '../../../common/unexpectedError';
import IUpsertAstronautService from './interfaces/IService';
import BadRequestError from '../../../common/badRequestError';
import { AstronautToUpsert } from './entities/AstronautToAdd';
export class UpsertAstronautController {
    private readonly upsertAstronautService: IUpsertAstronautService;
    constructor(upsertAstronautService: IUpsertAstronautService) {
        this.upsertAstronautService = upsertAstronautService;
    }

    upsert = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { firstname, lastname, originPlanetId } = req.body;
        try {
            const astronautToUpdate: AstronautToUpsert = new AstronautToUpsert({
                id: id ? parseInt(id) : undefined,
                firstname,
                lastname,
                originPlanetId: parseInt(originPlanetId)
            })
            const astronaut = await this.upsertAstronautService.execute(astronautToUpdate)
            res.status(200).json(astronaut);
        } catch (error) {
            if (error instanceof BadRequestError) {
                res.status(400).json({ error: error.message })
            } else if (error instanceof NotfoundError) {
                res.status(404).json({ error: error.message })
            } else if (error instanceof UnexpectedError) {
                res.status(500).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }


}


