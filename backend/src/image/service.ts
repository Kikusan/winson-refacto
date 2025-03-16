import Image from "./entities/image";
import IAstronautRepository from "./interfaces/IImageRepository";
import IAstronautService from "./interfaces/IImageService";

export class ImageService implements IAstronautService {
    private readonly astronautRepository: IAstronautRepository;
    constructor(astronautRepository: IAstronautRepository) {
        this.astronautRepository = astronautRepository
    }
    getAll = async (): Promise<Image[]> => {
        const astronauts = await this.astronautRepository.getAll();
        return astronauts;
    }
    getById = async (id: number): Promise<Image> => {
        const astronaut = await this.astronautRepository.getById(id);
        return astronaut;
    }
    create = (astronaut: Image): Promise<Image> => {
        return this.astronautRepository.create(astronaut)
    }
    update = (astronaut: Image): Promise<Image> => {
        return this.astronautRepository.update(astronaut)
    }
    delete = (id: number): Promise<void> => {
        return this.astronautRepository.delete(id)
    }
}