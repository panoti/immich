import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const immichAppConfig: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().required().valid('development', 'production', 'staging').default('development'),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE_NAME: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    ENABLE_MAPBOX: Joi.boolean().required().valid(true, false),
    MAPBOX_KEY: Joi.any().when('ENABLE_MAPBOX', {
      is: false,
      then: Joi.string().optional().allow(null, ''),
      otherwise: Joi.string().required(),
    }),
    LOG_LEVEL: Joi.string().optional().valid('simple', 'verbose').default('simple'),
    WEBHOOK_URL: Joi.string().optional().allow(null, ''),
    UPLOAD_DIR: Joi.string().optional().default('./upload'),
    IMAGE_CACHE_DIR: Joi.string().optional().default('./cache'),
    VIDEO_CACHE_DIR: Joi.string().optional().default('./cache'),
  }),
};
