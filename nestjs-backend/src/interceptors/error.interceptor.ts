import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { NotFoundError, BadRequestError } from '../tools/errors'; // Remplace avec tes erreurs

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof NotFoundError) {
          throw new NotFoundException(err.message || 'Ressource introuvable');
        }

        if (err instanceof BadRequestError) {
          throw new BadRequestException(err.message || 'Requête invalide');
        }

        console.error(err); // Log l'erreur pour le debug
        throw new InternalServerErrorException('Erreur serveur');
      }),
    );
  }
}
