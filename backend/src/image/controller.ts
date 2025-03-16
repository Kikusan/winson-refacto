import { Request, Response } from 'express';
import ErrorWithStatus from '../common/errorWithStatus';
import IImageService from './interfaces/IImageService';
import Image from './entities/image';
export class ImageController {
    private readonly imageService: IImageService;
    constructor(imageService: IImageService) {
        this.imageService = imageService;
    }
    getAll = async (req: Request, res: Response) => {
        try {
            const images: Image[] = await this.imageService.getAll()
            res.status(200).json(images);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }

    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const idToGet = parseInt(id)
            const astronaut: Image = await this.imageService.getById(idToGet)
            res.status(200).json(astronaut);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }

    create = async (req: Request, res: Response) => {
        const { name, path } = req.body;
        try {
            const imageToCreate: Image = {
                name,
                path
            }
            const astronaut = await this.imageService.create(imageToCreate)
            res.status(201).json(astronaut);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, path } = req.body;
        try {
            const imageToUpdate: Image = {
                id: parseInt(id),
                name,
                path
            }
            const astronaut = await this.imageService.update(imageToUpdate)
            res.status(200).json(astronaut);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {

            const idToDelete = parseInt(id)
            const astronaut = await this.imageService.delete(idToDelete)
            res.status(204).json(astronaut);
        } catch (error) {
            console.log(error)
            if (error instanceof ErrorWithStatus) {
                res.status(error.statusCode).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }
}


