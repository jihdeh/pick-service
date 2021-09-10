import httpStatus from 'http-status';
import request from 'supertest';
import app from '../app';
import setupTestDB from './setupTestDB';

setupTestDB();

describe('POST /api/url', () => {
  test('should return 200 and generate short url', async () => {
    const inputUrl = 'https://google.com';
    const res = await request(app)
      .post('/api/url')
      .send({
        url: inputUrl,
      })
      .expect(httpStatus.OK);

    expect(res.body).toMatchObject({
      payload: {
        originalUrl: inputUrl,
        shortUrl: expect.stringContaining('http://127.0.0.1'),
      },
    });
  });
});
