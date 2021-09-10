import mongoose from 'mongoose';
import config from '../configuration';
import dbConf from '../database/configuration';
const database = (dbConf as { [key: string]: { url: string; options: Object } })[
  config.env
];

const setupTestDB = () => {
  beforeAll(async () => {
    return await mongoose.connect(database.url, database.options);
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany({})
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    return await mongoose.connection.close();
  });
};

export default setupTestDB;
