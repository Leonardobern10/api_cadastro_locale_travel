import { Application } from 'express';
import express from "express";
import 'dotenv/config';
import ClientRouter from 'routes/ClientRouter';

export default class Server {
    private app: Application;
    private port: number;
    private clientRouter: ClientRouter;

    constructor(app: Application, port: number, router: ClientRouter) {
        this.app = app;
        this.port = port;
        this.clientRouter = router;
        this.app.use(express.json())
        this.app.use('/clients', this.clientRouter.getRouter())
    }

    public getApp() {
        return this.app;
    }

    public getPort() {
        return this.port;
    }

    public setApp(app: Application) {
        this.app = app;
    }

    public setPort(port: number) {
        this.port = port;
    }
    public testApi(): void {
        this.app.use('/', (req, res) => {
            res.status(200).json({ "message": "Tudo certo!" })
        })
    }
}
