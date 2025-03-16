import Image from "../entities/image";

export default interface IImageService {
    getAll(): Promise<Image[]>;
    getById(id: number): Promise<Image>;
    create(image: Image): Promise<Image>;
    update(image: Image): Promise<Image>;
    delete(id: number): Promise<void>;
}
