import ClientController from 'domain/interfaces/ClientControllerInterface';
import { Request, Response, Router } from 'express';
import ClientRouter from './ClientRouter';

export default class AdminRouter extends ClientRouter {
     constructor(controller: ClientController) {
          super(Router(), controller);
          this.registerRoutes();
     }

     protected registerRoutes(): void {
          this.create();
          this.all();
          this.getOne();
          this.deleteById();
          this.updateById();
     }

     /**
      * @swagger
      * /api/v1/admin:
      *   post:
      *     summary: Cria um novo admin
      *     tags: [ADMIN]
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
      *         description: Admin criado
      */
     protected create(): void {
          this.getRouter().post('/', async (req: Request, res: Response) => {
               console.log(req.body);
               await this.getController().save(req, res);
          });
     }

     /**
      * @swagger
      * /api/v1/admin/{id}:
      *   get:
      *     summary: Busca um admin pelo ID
      *     tags: [ADMIN]
      *     parameters:
      *       - in: path
      *         name: id
      *         required: true
      *         schema:
      *           type: string
      *         description: ID do admin a ser buscado
      *     responses:
      *       200:
      *         description: Admin encontrado com sucesso
      *       404:
      *         description: Admin não encontrado
      */
     protected getOne(): void {
          this.getRouter().get('/:id', async (req: Request, res: Response) => {
               await this.getController().getOne(req, res);
          });
     }

     /**
      * @swagger
      * /api/v1/admin:
      *    get:
      *      summary: Obtém todos os registros de ADMIN
      *      tags: [ADMIN]
      *      responses:
      *          200:
      *                description: Acessa todos os registros
      */
     protected all(): void {
          this.getRouter().get('/', async (req: Request, res: Response) => {
               await this.getController().getAll(req, res);
          });
     }

     /**
      * @swagger
      * /api/v1/admin:
      *    put:
      *        summary: Atualiza um registro com as novas informações enviadas
      *        tags: [ADMIN]
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
      *              description: Admin atualizado com sucesso
      *          404:
      *              description: Admin não encontrado
      *          500:
      *              description: Erro ao processar solicitação
      */
     protected updateById(): void {
          this.getRouter().put('/:id', async (req: Request, res: Response) => {
               await this.getController().updateById(req, res);
          });
     }

     /**
      * @swagger
      * /api/v1/admin/{id}:
      *    delete:
      *          summary: Remove um registro de ADMIN pelo ID
      *          tags: [ADMIN]
      *          parameters:
      *              - in: path
      *                name: id
      *                required: true
      *                schema:
      *                      type: string
      *                description: ID do ADMIN a ser removido
      *          responses:
      *                204:
      *                      description: Registo removido com sucesso
      *                400:
      *                      description: Erro ao remover registro
      *                500:
      *                      description: Não foi possivel processar a solicitação
      */
     protected deleteById(): void {
          this.getRouter().delete(
               '/:id',
               async (req: Request, res: Response) => {
                    this.getController().delById(req, res);
               }
          );
     }
}
