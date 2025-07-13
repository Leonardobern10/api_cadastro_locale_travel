import "reflect-metadata";
import { DataSource } from 'typeorm';
import 'dotenv/config';
import ClientModel from "infra/database/models/ClientModel";

export const AppDataSource = new DataSource({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [ClientModel],
      ssl: {
            rejectUnauthorized: false,
      },
})