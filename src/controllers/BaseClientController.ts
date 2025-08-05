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

export default class BaseClientController implements ClientControllerInterface {
     private readonly service: ClientService;
     private readonly role: Roles;

     constructor(service: ClientService, role: Roles) {
          this.service = service;
          this.role = role;
     }

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
               console.log(client);
               const hateoas = this.getHateoas(client);
               return res.status(201).json(hateoas);
          } catch (err) {
               console.error(err);
               if (err instanceof ZodError) {
                    return res.status(400).json({
                         message: 'Erro de validação dos dados'
                    });
               }

               return res.status(500).json({
                    message: 'Erro interno ao criar cliente',
                    error: (err as Error).message
               });
          }
     }

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

               console.log(`TOKEN: ${token}`);
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

     public async logout(req: Request, res: Response): Promise<Response> {
          console.log('Logout acionado!');
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

     public async getAll(req: Request, res: Response): Promise<void> {
          const clients =
               this.role === Roles.ADMIN
                    ? await this.service.getAllAdminsService()
                    : await this.service.getAllUsersService();
          const response = clients.map((c) => this.getHateoas(c));
          res.status(200).json(response);
     }

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

     public async delById(req: Request, res: Response): Promise<void> {
          const id = req.params.id;
          const deleted = await this.service.deleteClientService(id);

          if (!deleted) {
               res.status(400).json({ message: 'Erro ao deletar cliente' });
          }

          res.status(204).send();
     }

     private getHateoas(client: any) {
          return this.role === Roles.ADMIN
               ? createHateoas(client, '/api/v1/admin')
               : createHateoas(client, '/api/v1/users');
     }
}
