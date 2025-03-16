// DO NOT TOUCH

import express from 'express';
import cors from 'cors';
import ImageRouter from './src/image/router';
import PlanetRouter from './src/planet/router';
import AstronautRouter from './src/astronaut/router';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/images', ImageRouter);
app.use('/planets', PlanetRouter);
app.use('/astronauts', AstronautRouter);

app.listen(4000, () => { });

