import ClientModel from 'infra/database/models/ClientModel';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Roles } from '../models/Roles';

export default class ClientRepository {
     private repository: Repository<ClientModel>;

     constructor(dataSource: DataSource) {
          this.repository = dataSource.getRepository(ClientModel);
     }

     public async saveClient(client: ClientModel): Promise<ClientModel> {
          return await this.repository.save(client);
     }

     public async allAdmins(): Promise<ClientModel[]> {
          return await this.repository.find({
               where: {
                    role: Roles.ADMIN
               }
          });
     }

     public async allUsers(): Promise<ClientModel[]> {
          return await this.repository.find({
               where: {
                    role: Roles.USER
               }
          });
     }

     public async getClientByEmail(email: string): Promise<ClientModel | null> {
          return await this.repository.findOne({
               where: {
                    email: email
               }
          });
     }

     public async getOneAdminById(id: string): Promise<ClientModel | null> {
          return await this.repository.findOne({
               where: {
                    client_id: id,
                    role: Roles.ADMIN
               }
          });
     }

     public async getOneUserById(id: string): Promise<ClientModel | null> {
          return await this.repository.findOne({
               where: {
                    client_id: id,
                    role: Roles.USER
               }
          });
     }

     public async deleteClientById(client_id: string): Promise<DeleteResult> {
          return await this.repository.delete(client_id);
     }

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
