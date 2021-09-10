import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

const envVarsSchema = Joi.object()
  .keys({
    ENV: Joi.string().valid('production', 'development', 'staging', 'test').required(),
    PORT: Joi.number().default(3000),
    DEV_DATABASE_URL: Joi.string().required().description('Dev database url'),
    DATABASE_URL: Joi.string().required().description('database url'),
    CLIENT_URL: Joi.string().required().description('client url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envs = {
  env: envVars.ENV,
  port: envVars.PORT,
  devDatabaseUrl: envVars.DEV_DATABASE_URL,
  prodDatabaseUrl: envVars.DATABASE_URL,
  clientUrl: envVars.CLIENT_URL,
};

export default envs;
