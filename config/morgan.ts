import * as express from 'express';
import morgan from 'morgan';
import config from '../configuration';
import logger from './logger';

morgan.token('message', (_: any, res: express.Response) => res.locals.errorMessage || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_: any, res: { statusCode: number }) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_: any, res: { statusCode: number }) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

export default {
  errorHandler,
  successHandler,
};
