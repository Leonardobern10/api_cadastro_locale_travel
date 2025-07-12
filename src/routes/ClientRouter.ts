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
      }

      private create(): void {
            this.router.post('/', async (req: Request, res: Response) => {
                  console.log(req.body);
                  await this.controller.saveClient(req, res);
            })
      }

      private all(): void {
            this.router.get('/', async (req: Request, res: Response) => {
                  await this.controller.allClients(req, res);
            })
      }

      public getRouter(): Router {
            return this.router;
      }

      public getController(): ClientController {
            return this.controller;
      }


}