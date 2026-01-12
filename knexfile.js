require('dotenv').config();

const sharedConfig = {
  client: "pg",
  migrations: {
    directory: "./dist/migrations",
  },
};

module.exports = {
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
    connection: process.env.DB_URL,
    migrations: {
      directory: "./dist/migrations",
    },
  },
};
