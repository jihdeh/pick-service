import * as express from 'express';
import httpStatus from 'http-status';
import Joi, { ObjectSchema } from 'joi';
import pick from 'lodash.pick';
import AppError from '../utils/AppError';

const validate =
  (schema: { body?: Object; query?: ObjectSchema<any>; params?: Object }) =>
  (req: express.Request, _: express.Response, next: Function) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details: { message: string }) => details.message)
        .join(', ');
      return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
