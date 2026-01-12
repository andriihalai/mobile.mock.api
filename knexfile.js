require("dotenv").config();

const sharedConfig = {
  client: "pg",
  migrations: {
    directory: "./dist/migrations",
  },
};

console.log("CA:", process.env.DB_CA_CERT);

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
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CA_CERT,
      },
    },
    migrations: {
      directory: "./dist/migrations",
    },
  },
};
