import ClientController from 'domain/interfaces/ClientControllerInterface';
import { Router } from 'express';

export default abstract class ClientRouter {
     private router: Router;
     private controller: ClientController;

     constructor(router: Router, controller: ClientController) {
          this.router = router;
          this.controller = controller;
     }

     protected abstract registerRoutes(): void;

     protected abstract create(): void;

     protected abstract getOne(): void;

     protected abstract all(): void;

     protected abstract updateById(): void;

     protected abstract deleteById(): void;

     protected abstract login(): void;

     public getRouter(): Router {
          return this.router;
     }

     public getController(): ClientController {
          return this.controller;
     }
}
