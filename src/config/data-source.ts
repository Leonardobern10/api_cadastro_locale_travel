import ClientModel from "@models/ClientModel";
import "reflect-metadata";
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [ClientModel],
      subscribers: [],
      migrations: []
})