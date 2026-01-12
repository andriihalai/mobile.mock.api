import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const db: Knex = knex({
  client: "pg",
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  },
  pool: { min: 2, max: 10 },
});
