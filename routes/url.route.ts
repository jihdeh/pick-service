import express from 'express';
import * as controller from '../controller';
import validate from '../middlewares/validate';
import urlValidation from '../middlewares/validations/url.validation';

const router = express.Router();

router
  .route('/')
  .post(validate(urlValidation.generateShortUrl), controller.generateShortUrl)
  .get(controller.getFrequentlyAccessedUrls);

export default router;
