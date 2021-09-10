import compression from 'compression';
import cors from 'cors';
import express from 'express';
import httpStatus from 'http-status';
import morgan from './config/morgan';
import config from './configuration';
import { redirectRequest } from './controller';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './routes';
import AppError from './utils/AppError';

require('dotenv').config({
  allowEmptyValues: true,
});

const app = express();

var expression = /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
app.use(
  cors({
    credentials: true,
    origin: expression,
  })
);

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// gzip compression
app.use(compression());

app.get('/', (_, res) => res.send('not this way'));
app.get('/favicon.ico', (_, res) => res.sendStatus(204));
app.get('/:shortUrlId', redirectRequest);

app.use('/api', routes);
// send back a 404 error for any unknown api request
app.use((_, __, next) => {
  next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
