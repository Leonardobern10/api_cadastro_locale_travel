import ClientController from 'domain/interfaces/ClientControllerInterface';
import { Request, Response, Router } from 'express';
import ClientRouter from './ClientRouter';
import authMiddleware from 'application/middlewares/authMiddleware';

export default class UserRouter extends ClientRouter {
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
          this.login();
          this.logout();
     }

     /**
      * @swagger
      * /api/v1/users:
      *   post:
      *     summary: Cria um novo cliente
      *     tags: [USERS]
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
      *         description: Usuário criado
      */
     protected create(): void {
          this.getRouter().post('/', async (req: Request, res: Response) => {
               console.log(req.body);
               await this.getController().save(req, res);
          });
     }

     /**
      * @swagger
      * /api/v1/users/{id}:
      *   get:
      *     summary: Busca um cliente pelo ID
      *     tags: [USERS]
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
     protected getOne(): void {
          this.getRouter().get(
               '/:id',
               authMiddleware,
               async (req: Request, res: Response) => {
                    await this.getController().getOne(req, res);
               }
          );
     }

     /**
      * @swagger
      * /api/v1/users:
      *    get:
      *      summary: Obtém todos os registros de CLIENT
      *      tags: [USERS]
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
      * /api/v1/users:
      *    put:
      *        summary: Atualiza um registro com as novas informações enviadas
      *        tags: [USERS]
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
     protected updateById(): void {
          this.getRouter().put('/:id', async (req: Request, res: Response) => {
               await this.getController().updateById(req, res);
          });
     }

     /**
      * @swagger
      * /api/v1/users/login:
      *    post:
      *        summary: Permite o login do usuário
      *        tags: [USERS]
      *        requestBody:
      *          required: true
      *          content:
      *              application/json:
      *                schema:
      *                  type: object
      *                  required:
      *                    - email
      *                    - senha
      *                  properties:
      *                    email:
      *                      type: string
      *                      example: usuaria@email.com
      *                    senha:
      *                      type: string
      *                      example: senhaSegura123
      *        responses:
      *          200:
      *              description: Login efetuado com sucesso
      *              content:
      *                application/json:
      *                  schema:
      *                    type: object
      *                    properties:
      *                      token:
      *                         type: string
      *                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
      *                      user:
      *                         type: object
      *                         properties:
      *                            id:
      *                              type: string
      *                              example: 123
      *                            nome:
      *                              type: string
      *                              example: Leonardo
      *                            email:
      *                              type: string
      *                              example: usuario@email.com
      *          401:
      *              description: Credenciais inválidas
      *          404:
      *              description: Usuário não encontrado
      *          500:
      *              description: Erro no processamento. Tente novamente mais tarde!
      */
     protected login(): void {
          this.getRouter().post(
               '/login',
               async (req: Request, res: Response) => {
                    await this.getController().login(req, res);
               }
          );
     }

     /**
      * @swagger
      * /api/v1/users/logout:
      *   post:
      *     summary: Encerra a sessão do usuário
      *     tags: [USERS]
      *     security:
      *       - bearerAuth: []  # ou outro nome conforme seu esquema
      *     responses:
      *       200:
      *         description: Logout efetuado com sucesso
      *         content:
      *           application/json:
      *             schema:
      *               type: object
      *               properties:
      *                 message:
      *                   type: string
      *                   example: Logout efetuado com sucesso.
      *       404:
      *         description: Usuário não encontrado
      *       500:
      *         description: Erro no processamento. Tente novamente mais tarde!
      */

     protected logout(): void {
          this.getRouter().post(
               '/logout',
               authMiddleware,
               async (req: Request, res: Response) => {
                    await this.getController().logout(req, res);
               }
          );
     }

     /**
      * @swagger
      * /api/v1/users/{id}:
      *    delete:
      *          summary: Remove um registro de CLIENT pelo ID
      *          tags: [USERS]
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
     protected deleteById(): void {
          this.getRouter().delete(
               '/:id',
               async (req: Request, res: Response) => {
                    this.getController().delById(req, res);
               }
          );
     }
}
