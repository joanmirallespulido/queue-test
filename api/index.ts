import express, { Response } from 'express';
import cors from 'cors';
import QueueRoutes from './routes/queue.routes';
import { dbConnection } from './database/config';
import { webHookQueue } from './webhookQueue';
import { loadMockData } from './mock/loadMockData';

require('dotenv').config();

const app = express();

const port = process.env.PORT || 4002;

//Directorio publico
app.use(express.static('public'));

app.use(cors());



app.use(express.json());


//Base de datos
dbConnection();


loadMockData();


webHookQueue();

app.get('/', (req: any, res: Response) => {
    res.send(true);
});

app.use('/queue', QueueRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

export default app;