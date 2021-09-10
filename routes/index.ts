import express from 'express';
import urlRoute from './url.route';

const router = express.Router();

router.use('/url', urlRoute);

export default router;
