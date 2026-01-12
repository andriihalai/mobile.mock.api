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
    connection: {
      connectionString: process.env.DB_URL,
      ssl: process.env.DATABASE_CA_CERT ? { rejectUnauthorized: false } : false,
      ca: process.env.DATABASE_CA_CERT,
    },
    migrations: {
      directory: "./dist/migrations",
    },
  },
};
