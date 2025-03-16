export default class ErrorWithStatus extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message); // Appelle le constructeur de la classe Error
        this.statusCode = statusCode;
        this.name = "CustomError"; // Nom de l'erreur
    }
}