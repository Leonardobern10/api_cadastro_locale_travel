import App from 'application/App';
import Server from 'server/Server';
import express from 'express';
import { DataSource } from 'typeorm';
import { AppDataSource } from 'configs/data-source';
import ClientService from 'services/ClientService';
import ClientRepository from 'infra/database/repositories/ClientRepository';
import UserRouter from 'routes/UserRouter';
import AdminRouter from 'routes/AdminRouter';
import { UserController } from 'controllers/UserController';
import { AdminController } from 'controllers/AdminController';

const db: DataSource = AppDataSource;
const repository: ClientRepository = new ClientRepository(db);
const service: ClientService = new ClientService(repository);
const userController = UserController(service);
const adminController = AdminController(service);
const userRouter: UserRouter = new UserRouter(userController);
const adminRouter: AdminRouter = new AdminRouter(adminController);
const clientRouters = { user: userRouter, admin: adminRouter };
const server: Server = new Server(
     express(),
     Number(process.env.PORT),
     clientRouters
);
const app: App = new App(server, db);
app.init();
