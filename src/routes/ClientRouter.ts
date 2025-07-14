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
            this.deleteById();
      }

      /**
       * @swagger
       * /clients:
       *   post:
       *     summary: Cria um novo cliente
       *     tags: [CLIENTS]
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             required:
       *               - nome
       *               - sobrenome
       *               - idade
       *               - email
       *               - senha
       *             properties:
       *               nome:
       *                type: string
       *               sobrenome:
       *                type: string
       *               idade:
       *                type: integer
       *               email:
       *                type: string
       *               senha:
       *                type: string
       *     responses:
       *       201:
       *         description: Cliente criado
       */
      private create(): void {
            this.router.post('/', async (req: Request, res: Response) => {
                  console.log(req.body);
                  await this.controller.saveClient(req, res);
            })
      }

      /**
       * @swagger
       * /clients/{clientId}:
       *   get:
       *     summary: Busca um cliente pelo ID
       *     tags: [CLIENTS]
       *     parameters:
       *       - in: path
       *         name: clientId
       *         required: true
       *         schema:
       *           type: string
       *         description: ID do cliente a ser buscado
       *     responses:
       *       200:
       *         description: Cliente encontrado com sucesso
       *       404:
       *         description: Cliente não encontrado
       */
      private getOneClient(): void {
            this.router.get('/:clientId', async (req: Request, res: Response) => {
                  await this.controller.getOneClient(req, res);
            })
      }

      /**
      * @swagger
      * /clients :
      *    get:
      *      summary: Obtém todos os registros de CLIENT
      *      tags: [CLIENTS]          
      *      responses:
      *          200:
      *                description: Acessa todos os registros
      */
      private all(): void {
            this.router.get('/', async (req: Request, res: Response) => {
                  await this.controller.getAllClients(req, res);
            })
      }

      /**
       * @swagger
       * /clients/{clientId}:
       *    delete:
       *          summary: Remove um registro de CLIENT pelo ID
       *          tags: [CLIENTS]
       *          parameters:
       *              - in: path
       *                name: clientId
       *                required: true
       *                schema:
       *                      type: string
       *                description: ID do CLIENT a ser removido
       *          responses:
       *                200:
       *                      description: Registo removido com sucesso
       *                400:
       *                      description: Erro ao remover registro
       *                500:
       *                      description: Não foi possivel processar a solicitação
       */
      private deleteById(): void {
            this.getRouter().delete('/:clientId', async (req: Request, res: Response) => {
                  this.controller.delClientById(req, res);
            })
      }

      public getRouter(): Router {
            return this.router;
      }

      public getController(): ClientController {
            return this.controller;
      }


}