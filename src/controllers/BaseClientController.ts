import { Request, Response } from 'express';
import ClientService from 'services/ClientService';
import ClientControllerInterface from 'domain/interfaces/ClientControllerInterface';
import { createHateoas } from 'utils/hateoas';
import { Roles } from 'infra/database/models/Roles';
import ClientDTO from 'application/dto/ClientDTO';
import { clientSchema } from 'application/validators/clientSchema';
import { ZodError } from 'zod';
import AdminDTO from 'application/dto/AdminDTO';
import UserDTO from 'application/dto/UserDTO';
import ClientModel from 'infra/database/models/ClientModel';
import LoginDTO from 'application/dto/LoginDTO';
import PasswordCrypt from 'infra/cripto/PasswordCrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import handleZodError from 'application/handlers/handleZodError';
import { ZodErrorResponseType } from 'domain/type/ZodErrorResponseType';

export default class BaseClientController implements ClientControllerInterface {
     private readonly service: ClientService;
     private readonly role: Roles;

     constructor(service: ClientService, role: Roles) {
          this.service = service;
          this.role = role;
     }

     /**
      * Cria um novo cliente (admin ou usuário) a partir dos dados da requisição.
      * Realiza validação dos dados, instancia o DTO correto e salva no banco.
      * @param req Requisição HTTP
      * @param res Resposta HTTP
      * @returns Response com status 201 e dados do cliente criado ou erro de validação
      */
     public async save(req: Request, res: Response): Promise<Response> {
          try {
               const data = clientSchema.parse(req.body);
               const dto =
                    this.role === Roles.ADMIN
                         ? new AdminDTO(
                                data.nome,
                                data.sobrenome,
                                data.idade,
                                data.email,
                                data.senha
                           )
                         : new UserDTO(
                                data.nome,
                                data.sobrenome,
                                data.idade,
                                data.email,
                                data.senha
                           );
               const client = await this.service.saveClientService(dto);
               const hateoas = this.getHateoas(client);
               return res.status(201).json(hateoas);
          } catch (err) {
               if (err instanceof ZodError) {
                    let allErrors: Array<ZodErrorResponseType> =
                         handleZodError(err);
                    return res.status(400).json({
                         message: 'Erro ao registrar usuário.',
                         errors: allErrors
                    });
               }
               return res.status(500).json({
                    message: 'Erro interno ao criar cliente',
                    error: (err as Error).message
               });
          }
     }

     /**
      * Realiza o login do cliente, valida credenciais e retorna token JWT em cookie.
      * @param req Requisição HTTP
      * @param res Resposta HTTP
      * @returns Response com status 200 e dados do cliente ou erro de autenticação
      */
     public async login(req: Request, res: Response): Promise<Response> {
          try {
               const data = req.body;
               const dto: LoginDTO = new LoginDTO(
                    data.email.trim(),
                    data.senha.trim()
               );
               const client: ClientModel | null =
                    await this.service.getClientByEmail(dto.email);

               if (!client) {
                    return res.status(404).json({
                         message: 'Usuário não encontrado.'
                    });
               }

               const crypt: PasswordCrypt = new PasswordCrypt();
               let compare: boolean = await crypt.toCompare(
                    dto.senha,
                    client.senha
               );

               if (!compare) {
                    return res.status(401).json({
                         message: 'Credenciais inválidas...'
                    });
               }

               const payload = {
                    userId: client.client_id,
                    email: client.email
               };

               const token = jwt.sign(payload, process.env.JWT_SECRET!, {
                    expiresIn: '15m'
               });

               return res
                    .status(200)
                    .cookie('token', token, {
                         httpOnly: true, // Inacessível por JS
                         //secure: true, // Apenas HTTPS (em produção)
                         sameSite: 'strict', // Protege contra CSRF
                         maxAge: 15 * 60 * 1000 // 15 minutos
                    })
                    .json({
                         message: 'Login efetuado com sucesso!',
                         client: {
                              id: client.client_id,
                              nome: client.nome,
                              email: client.email
                         }
                    });
          } catch (error) {
               console.error(error);
               return res.status(500).json({
                    message: 'Erro no processamento. Tente novamente mais tarde!'
               });
          }
     }

     /**
      * Realiza o logout do cliente, limpando o cookie de autenticação.
      * @param req Requisição HTTP
      * @param res Resposta HTTP
      * @returns Response com status 200 e mensagem de sucesso
      */
     public async logout(req: Request, res: Response): Promise<Response> {
          try {
               res.clearCookie('token', {
                    httpOnly: true,
                    //secure: true,
                    sameSite: 'strict'
               });
               return res
                    .status(200)
                    .json({ message: 'Logout efetuado com sucesso.' });
          } catch (error) {
               console.error(error);
               return res.status(500).json({
                    message: 'Erro no processamento. Tente novamente mais tarde!'
               });
          }
     }

     /**
      * Retorna todos os clientes do tipo (admin ou usuário) conforme o controller.
      * @param req Requisição HTTP
      * @param res Resposta HTTP
      */
     public async getAll(req: Request, res: Response): Promise<void> {
          const clients =
               this.role === Roles.ADMIN
                    ? await this.service.getAllAdminsService()
                    : await this.service.getAllUsersService();
          const response = clients.map((c) => this.getHateoas(c));
          res.status(200).json(response);
     }

     /**
      * Busca um cliente pelo ID, conforme o tipo (admin ou usuário).
      * @param req Requisição HTTP
      * @param res Resposta HTTP
      */
     public async getOne(req: Request, res: Response): Promise<void> {
          const id = req.params.id;
          const client =
               this.role === Roles.ADMIN
                    ? await this.service.getOneAdminService(id)
                    : await this.service.getOneUserService(id);
          if (!client) {
               res.status(404).json({ message: 'Cliente não encontrado' });
          }

          res.status(200).json(this.getHateoas(client));
     }

     /**
      * Atualiza os dados de um cliente pelo ID.
      * @param req Requisição HTTP
      * @param res Resposta HTTP
      */
     public async updateById(req: Request, res: Response): Promise<void> {
          try {
               const id = req.params.id;
               const dto: ClientDTO = { ...req.body, role: this.role };
               const updated = await this.service.updateClientService(id, dto);

               if (!updated) {
                    res.status(404).json({ message: 'Cliente não encontrado' });
               }

               res.status(200).json(this.getHateoas(updated));
          } catch (err) {
               res.status(500).json({
                    message: 'Erro ao atualizar',
                    error: err
               });
          }
     }

     /**
      * Remove um cliente pelo ID.
      * @param req Requisição HTTP
      * @param res Resposta HTTP
      */
     public async delById(req: Request, res: Response): Promise<void> {
          const id = req.params.id;
          const deleted = await this.service.deleteClientService(id);

          if (!deleted) {
               res.status(400).json({ message: 'Erro ao deletar cliente' });
          }

          res.status(204).send();
     }

     /**
      * Gera os links HATEOAS para o cliente conforme o tipo (admin ou usuário).
      * @param client Dados do cliente
      * @returns Objeto com links HATEOAS
      */
     private getHateoas(client: any) {
          return this.role === Roles.ADMIN
               ? createHateoas(client, '/api/v1/admin')
               : createHateoas(client, '/api/v1/users');
     }
}
