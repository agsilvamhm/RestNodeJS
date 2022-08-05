import { Router, NextFunction, Response, Request } from 'express';
import { nextTick } from 'process';
import ForbiddenError from '../models/error/forbidden.erros.models';

const authorizationRoute = Router();

authorizationRoute.post('./token', (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];  

    try {
        if(!authorizationHeader){
            throw new ForbiddenError('Credencias não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token )  {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }
        
    } catch (error){
        next(error);
    }
});

export default authorizationRoute;