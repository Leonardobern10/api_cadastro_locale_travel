import ClientModel from 'infra/database/models/ClientModel';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Roles } from '../models/Roles';

export default class ClientRepository {
     private repository: Repository<ClientModel>;

     constructor(dataSource: DataSource) {
          this.repository = dataSource.getRepository(ClientModel);
     }

     /**
      * Salva um cliente no banco de dados.
      * @param client Instância de ClientModel
      */
     public async saveClient(client: ClientModel): Promise<ClientModel> {
          return await this.repository.save(client);
     }

     /**
      * Retorna todos os clientes com papel de ADMIN.
      */
     public async allAdmins(): Promise<ClientModel[]> {
          return await this.repository.find({
               where: {
                    role: Roles.ADMIN
               }
          });
     }

     /**
      * Retorna todos os clientes com papel de USER.
      */
     public async allUsers(): Promise<ClientModel[]> {
          return await this.repository.find({
               where: {
                    role: Roles.USER
               }
          });
     }

     /**
      * Busca um cliente pelo e-mail.
      * @param email E-mail do cliente
      */
     public async getClientByEmail(email: string): Promise<ClientModel | null> {
          return await this.repository.findOne({
               where: {
                    email: email
               }
          });
     }

     /**
      * Busca um admin pelo ID.
      * @param id ID do admin
      */
     public async getOneAdminById(id: string): Promise<ClientModel | null> {
          return await this.repository.findOne({
               where: {
                    client_id: id,
                    role: Roles.ADMIN
               }
          });
     }

     /**
      * Busca um usuário pelo ID.
      * @param id ID do usuário
      */
     public async getOneUserById(id: string): Promise<ClientModel | null> {
          return await this.repository.findOne({
               where: {
                    client_id: id,
                    role: Roles.USER
               }
          });
     }

     /**
      * Remove um cliente pelo ID.
      * @param client_id ID do cliente
      */
     public async deleteClientById(client_id: string): Promise<DeleteResult> {
          return await this.repository.delete(client_id);
     }

     /**
      * Atualiza os dados de um cliente pelo ID.
      * @param client_id ID do cliente
      * @param newClient Novos dados do cliente
      */
     public async updateClient(
          client_id: string,
          newClient: ClientModel
     ): Promise<ClientModel | null> {
          let client = await this.repository.findOneBy({
               client_id: client_id
          });
          if (!client) {
               return null;
          }
          client = { ...newClient };
          return await this.repository.save(client);
     }
}
