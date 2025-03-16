import { Request, Response } from 'express';
import IAstronautService from './interfaces/IAstronautService';
import AstronautToCreate from "./entities/AstronautToCreate";
import AstronautToUpdate from './entities/AstronautToUpdate';
import NotfoundError from '../common/notFoundError';
import UnexpectedError from '../common/unexpectedError';
import Astronaut from './entities/Astronaut';
import Filter from './entities/Filter';
export class AstronautController {
  private readonly astronautService: IAstronautService;
  constructor(astronautService: IAstronautService) {
    this.astronautService = astronautService;
  }
  getAll = async (req: Request, res: Response) => {
    const page: string | undefined = req.query?.page?.toString();
    const pageSize: string | undefined = req.query?.pageSize?.toString();
    let filter: Filter | undefined = undefined
    if (page && pageSize) {
      filter = {
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      }
    }
    try {
      const astronauts: Astronaut[] = await this.astronautService.getAll(filter)
      res.status(200).json(astronauts);
    } catch (error) {
      if (error instanceof UnexpectedError) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }

  }

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const idToGet = parseInt(id)
      const astronaut: Astronaut = await this.astronautService.getById(idToGet)
      res.status(200).json(astronaut);
    } catch (error) {
      if (error instanceof NotfoundError) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof UnexpectedError) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  create = async (req: Request, res: Response) => {
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const astronautToCreate: AstronautToCreate = {
        firstname,
        lastname,
        originPlanetid: parseInt(originPlanetId)
      }
      const astronaut = await this.astronautService.create(astronautToCreate)
      res.status(201).json(astronaut);
    } catch (error) {
      if (error instanceof UnexpectedError) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const astronautToUpdate: AstronautToUpdate = {
        id: parseInt(id),
        firstname,
        lastname,
        originPlanetId: parseInt(originPlanetId)
      }
      const astronaut = await this.astronautService.update(astronautToUpdate)
      res.status(200).json(astronaut);
    } catch (error) {
      if (error instanceof NotfoundError) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof UnexpectedError) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

      const idToDelete = parseInt(id)
      const astronauts: Astronaut[] = await this.astronautService.delete(idToDelete)
      res.status(200).json(astronauts);
    } catch (error) {
      if (error instanceof NotfoundError) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof UnexpectedError) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}


