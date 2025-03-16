// src/routes/AstronautRouter.ts
import express from 'express';
import { AstronautController } from './controller';
import { AstronautService } from './service';
import { KnexAstronautRepository } from './knexRepository'
import { KnexUpsertAstronautRepository } from './usecases/upsertAstronaut/knexRepository';
import { UpsertAstronautService } from './usecases/upsertAstronaut/service';
import { UpsertAstronautController } from './usecases/upsertAstronaut/controller';

const astronautRepository = new KnexAstronautRepository();
const astronautService = new AstronautService(astronautRepository);
const astronautController = new AstronautController(astronautService);

const upsertAstronautRepository = new KnexUpsertAstronautRepository();
const upsertAstronautService = new UpsertAstronautService(upsertAstronautRepository);
const upsertAstronautController = new UpsertAstronautController(upsertAstronautService)
const router = express.Router();

router.get('/', astronautController.getAll);
router.get('/:id', astronautController.getById);
router.post('/', upsertAstronautController.upsert);
router.put('/:id', upsertAstronautController.upsert);
router.delete('/:id', astronautController.delete);

export default router;
