import Client from "@entities/Client";
import "reflect-metadata";
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      database: "locale_travel",
      synchronize: true,
      logging: true,
      entities: [Client],
      subscribers: [],
      migrations: []
})