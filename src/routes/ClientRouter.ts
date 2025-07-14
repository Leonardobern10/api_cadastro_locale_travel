import ClientController from "controllers/ClientController";
import { Request, Response, Router } from "express";

export default class ClientRouter {
      private router: Router;
      private controller: ClientController;

      constructor(controller: ClientController) {
            this.router = Router();
            this.controller = controller;
            this.registerRoutes();
      }

      private registerRoutes() {
            this.create();
            this.all();
            this.getOneClient();
      }

      private create(): void {
            this.router.post('/', async (req: Request, res: Response) => {
                  console.log(req.body);
                  await this.controller.saveClient(req, res);
            })
      }

      private getOneClient(): void {
            this.router.get('/:clientId', async (req: Request, res: Response) => {
                  await this.controller.getOneClient(req, res);
            })
      }

      private all(): void {
            this.router.get('/', async (req: Request, res: Response) => {
                  await this.controller.getAllClients(req, res);
            })
      }

      public getRouter(): Router {
            return this.router;
      }

      public getController(): ClientController {
            return this.controller;
      }


}