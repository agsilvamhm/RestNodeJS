import express, { NextFunction, Request, Response } from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import errorHandler from './middlewares/error-handler.middlewares';
import authorizationRoute from './routes/authorization.route';

const app = express();
const porta = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);


// Configuração do Handler de error
app.use(errorHandler);

/*app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'bar' });
});*/

app.listen(porta, () => {
    console.log(`Aplicação executando na porta :`, porta);
});