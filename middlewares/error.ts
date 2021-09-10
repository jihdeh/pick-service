import httpStatus from 'http-status';
import config from '../configuration';
import logger from '../config/logger';
import AppError from '../utils/AppError';
import { IError, ISetLocals } from './types';

export const errorConverter = (
  err: IError & {
    statusCode?: number | string;
  },
  _req: Express.Request,
  _res: Express.Response,
  next: Function
) => {
  let error = err;
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: IError & {
    statusCode?: number | string;
    isOperational?: boolean;
  },
  _req: Express.Request,
  res: ISetLocals,
  _next: Function
) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
