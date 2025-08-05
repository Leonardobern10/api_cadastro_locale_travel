import ClientDTO from 'application/dto/ClientDTO';
import ClientMapper from 'application/mappers/ClientMapper';
import PasswordCrypt from 'infra/cripto/PasswordCrypt';
import ClientModel from 'infra/database/models/ClientModel';
import ClientRepository from 'infra/database/repositories/ClientRepository';
import { DeleteResult } from 'typeorm';

export default class ClientService {
     private readonly clientRepository: ClientRepository;
     private passwordCrypter: PasswordCrypt;

     constructor(clientRepository: ClientRepository) {
          this.clientRepository = clientRepository;
          this.passwordCrypter = new PasswordCrypt();
     }

     public getClienteRepository(): ClientRepository {
          return this.clientRepository;
     }

     public getPasswordCrypt(): PasswordCrypt {
          return this.passwordCrypter;
     }

     public setPasswordCrypt(passwordCrypter: PasswordCrypt): void {
          this.passwordCrypter = passwordCrypter;
     }

     public async saveClientService(
          clientDTO: ClientDTO
     ): Promise<ClientModel> {
          clientDTO.senha = await this.getPasswordCrypt().toCrypt(
               clientDTO.senha
          );
          const model = ClientMapper.toModel(clientDTO);
          return this.getClienteRepository().saveClient(model);
     }

     public async getAllAdminsService(): Promise<ClientModel[]> {
          return await this.getClienteRepository().allAdmins();
     }

     public async getAllUsersService(): Promise<ClientModel[]> {
          return await this.getClienteRepository().allUsers();
     }

     public async getOneAdminService(
          clientId: string
     ): Promise<ClientModel | null> {
          return await this.getClienteRepository().getOneAdminById(clientId);
     }

     public async getOneUserService(id: string): Promise<ClientModel | null> {
          return await this.getClienteRepository().getOneUserById(id);
     }

     public async getClientByEmail(email: string): Promise<ClientModel | null> {
          return await this.getClienteRepository().getClientByEmail(email);
     }

     public async updateClientService(
          clientId: string,
          newClientDTO: ClientDTO
     ): Promise<ClientModel | null> {
          const model = ClientMapper.toModel(newClientDTO);
          return this.getClienteRepository().updateClient(clientId, model);
     }

     public async deleteClientService(clientId: string): Promise<boolean> {
          const delClient: DeleteResult =
               await this.getClienteRepository().deleteClientById(clientId);
          if (!delClient) {
               return false;
          }
          return true;
     }
}
