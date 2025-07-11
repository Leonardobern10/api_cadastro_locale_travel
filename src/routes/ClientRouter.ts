import ClientController from "controllers/ClientController";
import { Application, Request, Response, Router } from "express";

export default class ClientRouter {
      private router: Router;
      private controller: ClientController;

      constructor(app: Application, controller: ClientController) {
            this.router = Router();
            this.controller = controller;
            this.registerRoutes();
            app.use("/clients", this.router);
      }

      private registerRoutes() {
            this.router.get('/', (req: Request, res: Response) => {
                  res.json({ message: "Listando clientes..." })
            })
      }

      public getRouter(): Router {
            return this.router;
      }

      public getController(): ClientController {
            return this.controller;
      }


}