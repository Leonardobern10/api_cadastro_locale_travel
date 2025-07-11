import App from 'application/App';
import Server from 'server/Server';
import express from 'express';
import { DataSource } from 'typeorm';
import { AppDataSource } from 'config/data-source';

const server: Server = new Server(express(), Number(process.env.PORT));
const db: DataSource = AppDataSource;
const app: App = new App(server, db);
app.init();
