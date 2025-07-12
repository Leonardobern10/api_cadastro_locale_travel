import App from 'application/App';
import Server from 'server/Server';
import express from 'express';
import { DataSource } from 'typeorm';
import { AppDataSource } from 'configs/data-source';
import ClientService from 'services/ClientService';
import ClientRepository from 'infra/database/repositories/ClientRepository';
import ClientController from 'controllers/ClientController';
import ClientRouter from 'routes/ClientRouter';

const db: DataSource = AppDataSource;
const repository: ClientRepository = new ClientRepository(db);
const service: ClientService = new ClientService(repository);
const controller: ClientController = new ClientController(service);
const clientRouter: ClientRouter = new ClientRouter(controller);


const server: Server = new Server(express(), Number(process.env.PORT), clientRouter);
const app: App = new App(server, db);
app.init();
