import dotenv from 'dotenv';
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url_atlas: process.env.DATABASE_URL_ATLAS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
