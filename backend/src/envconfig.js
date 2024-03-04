const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: envFile });

module.exports = {
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
