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
            this.updateById();
      }

      /**
       * @swagger
       * /api/v1/clients:
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
       * /api/v1/clients/{id}:
       *   get:
       *     summary: Busca um cliente pelo ID
       *     tags: [CLIENTS]
       *     parameters:
       *       - in: path
       *         name: id
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
            this.router.get('/:id', async (req: Request, res: Response) => {
                  await this.controller.getOneClient(req, res);
            })
      }

      /**
      * @swagger
      * /api/v1/clients:
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
       * /api/v1/clients:
       *    put:
       *        summary: Atualiza um registro com as novas informações enviadas
       *        tags: [CLIENTS]
       *        parameters:
       *          - in: path
       *            name: id
       *            required: true
       *            schema: 
       *              type: string
       *            description: ID do registro a ser atualizado
       *        requestBody:
       *          required: true
       *          content: 
       *              application/json:
       *                schema:
       *                  type: object
       *                  required:
       *                    - nome
       *                    - sobrenome
       *                    - idade
       *                    - email
       *                    - senha
       *                    - role
       *                  properties:
       *                    nome: 
       *                      type: string
       *                    sobrenome:
       *                      type: string
       *                    idade:
       *                      type: integer
       *                    email:
       *                      type: string
       *                    senha:
       *                      type: string
       *                    role:
       *                      type: string
       *        responses:
       *          200:
       *              description: Usuário atualizado com sucesso
       *          404:
       *              description: Usuário não encontrado
       *          500:
       *              description: Erro ao processar solicitação
       */
      private updateById(): void {
            this.router.put('/:id', async (req: Request, res: Response) => {
                  await this.controller.updateClientById(req, res);
            })
      }

      /**
       * @swagger
       * /api/v1/clients/{id}:
       *    delete:
       *          summary: Remove um registro de CLIENT pelo ID
       *          tags: [CLIENTS]
       *          parameters:
       *              - in: path
       *                name: id
       *                required: true
       *                schema:
       *                      type: string
       *                description: ID do CLIENT a ser removido
       *          responses:
       *                204:
       *                      description: Registo removido com sucesso
       *                400:
       *                      description: Erro ao remover registro
       *                500:
       *                      description: Não foi possivel processar a solicitação
       */
      private deleteById(): void {
            this.getRouter().delete('/:id', async (req: Request, res: Response) => {
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