import express, { Application } from 'express';
import 'dotenv/config';

export default class Server {
    private app: Application;
    private port: number;

    constructor(app: Application, port: number) {
        this.app = app;
        this.port = port;
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
