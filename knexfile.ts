import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const sharedConfig = {
  client: "pg",
  migrations: {
    directory: "./dist/migrations",
  },
};

const config: { [key: string]: Knex.Config } = {
  development: {
    ...sharedConfig,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/migrations",
      extension: "ts",
    },
  },

  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./dist/migrations",
    },
  },
};

export default config;
