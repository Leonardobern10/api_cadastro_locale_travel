import { Application } from 'express';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import ClientRouter from 'routes/ClientRouter';
import { swaggerSpec } from 'docs/swagger';

export default class Server {
    private app: Application;
    private port: number;
    private clientRouter: ClientRouter;

    constructor(app: Application, port: number, router: ClientRouter) {
        this.app = app;
        this.port = port;
        this.clientRouter = router;
        this.app.use(express.json())
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.app.use('/api/v1/clients', this.clientRouter.getRouter());
        this.testApi();
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
    private testApi(): void {
        this.app.get('/', (req, res) => {
            res.status(200).json({ "message": "Tudo certo!" })
        })
    }
}
