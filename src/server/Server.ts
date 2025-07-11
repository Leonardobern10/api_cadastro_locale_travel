import { Application } from 'express';
import 'dotenv/config';
import ClientRouter from 'routes/ClientRouter';
import ClientService from 'services/ClientService';

export default class Server {
    private app: Application;
    private port: number;
    private clientRouter: ClientRouter;

    constructor(app: Application, port: number, router: ClientRouter) {
        this.app = app;
        this.port = port;
        this.clientRouter = router;
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
}
