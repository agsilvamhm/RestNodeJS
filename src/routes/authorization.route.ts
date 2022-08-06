import { StatusCodes } from 'http-status-codes';
import { Router, NextFunction, Response, Request } from 'express';
import { nextTick } from 'process';
import ForbiddenError from '../models/error/forbidden.erros.models';
import usersRepository from '../repositories/users.repository';
import JWT from 'jsonwebtoken';

const authorizationRoute = Router();

authorizationRoute.post('./token', async(req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];  

    try {
        if(!authorizationHeader){
            throw new ForbiddenError('Credencias não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token )  {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        const tokenContente = Buffer.from(token, 'base64').toString('utf-8')
        
        const [username, password] = tokenContente.split(':'); 

        if (!username || !password) {
            throw new ForbiddenError('Credencias não preenchidas');
        }

        const user = await usersRepository.findByUsernameAndPassword(username, password)

        if (!user){
            throw new ForbiddenError('Usuário ou senha inválidos!');
        }

        const jwtPayLoad = { username: user.username};
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';

        const  jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({token: jwt});

    } catch (error){
        next(error);
    }
});

export default authorizationRoute;