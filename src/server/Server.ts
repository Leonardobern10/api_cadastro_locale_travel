import { Application } from 'express';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import { swaggerSpec } from 'docs/swagger';
import cors from 'cors';
import { ClientRoutersType } from 'domain/type/ClientRoutersType';
import cookieParser from 'cookie-parser';

export default class Server {
     private app: Application;
     private port: number;
     private clientRouters: ClientRoutersType;

     constructor(app: Application, port: number, routers: ClientRoutersType) {
          this.app = app;
          this.port = port;
          this.clientRouters = routers;
          this.initMiddleware();
          this.initSwagger();
          this.initRouters();
          this.testApi();
     }

     /**
      * Retorna a instância do Express Application.
      * @returns Application Express
      */
     public getApp() {
          return this.app;
     }

     /**
      * Retorna a porta configurada para o servidor.
      * @returns Número da porta
      */
     public getPort() {
          return this.port;
     }

     /**
      * Define a instância do Express Application.
      * @param app Nova instância do Application
      */
     public setApp(app: Application) {
          this.app = app;
     }

     /**
      * Define a porta do servidor.
      * @param port Nova porta
      */
     public setPort(port: number) {
          this.port = port;
     }

     /**
      * Rota de teste para verificar se a API está funcionando.
      */
     public testApi(): void {
          this.app.get('/', (req, res) => {
               res.status(200).json({ message: 'Tudo certo!' });
          });
     }

     private initMiddleware(): void {
          this.app.use(express.json());
          this.app.use(
               cors({
                    origin:
                         process.env.CLIENT_ORIGIN || 'http://localhost:5173',
                    methods: ['GET', 'POST', 'PUT', 'DELETE'],
                    credentials: true
               })
          );
          this.app.use(cookieParser());
     }

     private initSwagger(): void {
          this.app.use(
               `${process.env.PATH_DOC}`,
               swaggerUi.serve,
               swaggerUi.setup(swaggerSpec)
          );
     }

     private initRouters(): void {
          this.app.use('/api/v1/users', this.clientRouters.user.getRouter());
          this.app.use('/api/v1/admin', this.clientRouters.admin.getRouter());
     }
}
