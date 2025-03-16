// src/routes/AstronautRouter.ts
import express from 'express';
import { ImageController } from './controller';
import { ImageService } from './service';
import { KnexImageRepository } from './knexRepository'

const imageRepository = new KnexImageRepository();
const imageService = new ImageService(imageRepository);
const imageController = new ImageController(imageService);
const router = express.Router();

router.get('/', imageController.getAll);
router.get('/:id', imageController.getById);
router.post('/', imageController.create);
router.put('/:id', imageController.update);
router.delete('/:id', imageController.delete);

export default router;
