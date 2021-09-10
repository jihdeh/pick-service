import config from '../configuration';

const configEnvs = {
  development: {
    url: config.devDatabaseUrl,
    options: {},
  },
  test: {
    url: config.devDatabaseUrl,
    options: {},
  },
  production: {
    url: config.prodDatabaseUrl,
    options: {},
  },
};

export default configEnvs;
