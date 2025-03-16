
import Image from "./entities/image";
import IimageRepository from "./interfaces/IImageRepository";
import knex from "../db";

export class KnexImageRepository implements IimageRepository {

    getAll = async (): Promise<Image[]> => {
        try {
            const images: Image[] = await knex('images').select('*');
            return images
        } catch (error) {
            throw new Error('internal server error')
        }
    }
    getById = async (id: number): Promise<Image> => {
        try {
            const image: Image = await knex('images').where('id', id).first();
            if (image) {
                return image;
            } else {
                throw new Error("not found.");
            }
        } catch (error) {
            throw new Error("wtf.");
        }
    }

    create = async (imageToCreate: Image): Promise<Image> => {
        try {
            const imageIdsCreated = await knex('images').insert(imageToCreate);
            return this.getById(imageIdsCreated[0])

        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    update = async (imageToUpdate: Image): Promise<Image> => {
        const { id, name, path } = imageToUpdate;
        try {
            const updatedRows = await knex('images').where('id', id).update({ name, path });
            if (updatedRows === 0) {
                throw new Error("Not found.");
            }
            return this.getById(imageToUpdate.id!)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    delete = async (id: number): Promise<void> => {
        try {
            const deletedRows = await knex('images').where('id', id).del();
            if (deletedRows === 0) {
                throw new Error("not found.");

            }
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}
