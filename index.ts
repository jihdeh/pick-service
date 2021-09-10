import appServer from 'http';
import mongoose from 'mongoose';
import app from './app';
import logger from './config/logger';
import config from './configuration';
import database from './database/configuration';

const dbConf = (database as { [key: string]: any })[config.env];
const server = appServer.createServer(app);

mongoose.connect(dbConf.url, dbConf.options, () => {
  console.info('database connected');

  server.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// Unhandled error event -lookinto

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
