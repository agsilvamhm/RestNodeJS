import express, {Request, Response, NextFunction} from 'express';

const app = express();
const porta = 5000;

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({foo: 'bar'});
});

app.listen(porta, () => {
    console.log(`Aplicação executando na porta :`, porta );
});