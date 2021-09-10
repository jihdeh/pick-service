import Joi from 'joi';
import { url } from './custom.validation';
import customMessages from './customMessages';

export default {
  generateShortUrl: {
    body: Joi.object().keys({
      url: Joi.string().required().custom(url).messages(customMessages.url),
    }),
  },
};
