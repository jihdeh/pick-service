import * as express from 'express';
import httpStatus from 'http-status';
import { customAlphabet } from 'nanoid';
import { Url } from '../database/model';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

/** move to a utility service */
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 6);

export const generateShortUrl = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const shortId = nanoid();
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const updateUrlRecord = await Url.findOneAndUpdate(
      { originalUrl: req.body.url },
      {
        shortId,
        baseUrl,
      },
      { upsert: true, lean: true, new: true }
    );

    if (!updateUrlRecord) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Error occured creating URL, please try again'
      );
    }

    res.send({
      payload: {
        originalUrl: req.body.url,
        shortUrl: `${updateUrlRecord.baseUrl}/${shortId}`,
      },
    });
  }
);

export const redirectRequest = catchAsync(
  async (req: express.Request, res: express.Response) => {
    if (req.params.shortUrlId) {
      const findUrlByShortId = await Url.findOneAndUpdate(
        {
          shortId: req.params.shortUrlId,
        },
        {
          $inc: { visitedCount: 1 },
        }
      ).lean();

      if (findUrlByShortId) {
        return res.redirect(findUrlByShortId.originalUrl);
      }
      // redirect to 404 route
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid url');
    }
    // redirect to 404 route
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid url');
  }
);

export const getFrequentlyAccessedUrls = () => {};
