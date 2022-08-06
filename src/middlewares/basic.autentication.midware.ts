import { NextFunction, Request, Response } from 'express';


function basicAutenticationMidware(req: Request, res: Response, next: NextFunction){
    try {
        const jwtPayLoad = { username: user.username};
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';

        const  jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({token: jwt});   
    } catch (error) {
        next(error);
    }
}

export default basicAutenticationMidware;