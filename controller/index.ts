import * as express from 'express';
import httpStatus from 'http-status';
import { customAlphabet } from 'nanoid';
import config from '../configuration';
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

    // convert non protocol urls to have http protocol by default
    const originalUrl =
      req.body.url.indexOf('://') === -1 ? `http://${req.body.url}` : req.body.url;

    const updateUrlRecord = await Url.findOneAndUpdate(
      { originalUrl },
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
        originalUrl,
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
    }
    // redirect to 404 route
    return res.redirect(`${config.clientUrl}/404`);
  }
);

export const getFrequentlyAccessedUrls = catchAsync(
  async (_: express.Request, res: express.Response) => {
    const getMostVisited = await Url.find({}).sort({ visitedCount: -1 }).limit(100);
    res.send(getMostVisited);
  }
);
