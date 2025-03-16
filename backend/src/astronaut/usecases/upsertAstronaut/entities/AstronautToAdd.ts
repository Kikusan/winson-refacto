import BadRequestError from "../../../../common/badRequestError";

export default interface AstronautToAdd {
    id?: number;
    firstname: string;
    lastname: string;
    originPlanetId: number

}

export class AstronautToUpsert implements AstronautToAdd {
    readonly id: number | undefined;
    readonly firstname: string;
    readonly lastname: string;
    readonly originPlanetId: number;
    constructor({ id, firstname, lastname, originPlanetId }: AstronautToAdd) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.originPlanetId = originPlanetId
        if (!firstname || !lastname || !originPlanetId) {
            throw new BadRequestError('Invalid astronaut data')
        }
    }

}