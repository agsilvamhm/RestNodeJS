import express, { NextFunction, Request, Response } from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();
const porta = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoute);
app.use(usersRoute);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({foo: 'bar'});
});

app.listen(porta, () => {
    console.log(`Aplicação executando na porta :`, porta );
});