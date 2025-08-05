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

     /**
      * Retorna o repositório de clientes utilizado pelo serviço.
      */
     public getClienteRepository(): ClientRepository {
          return this.clientRepository;
     }
     /**
      * Retorna a instância de criptografia de senha.
      */
     public getPasswordCrypt(): PasswordCrypt {
          return this.passwordCrypter;
     }
     /**
      * Define uma nova instância de criptografia de senha.
      * @param passwordCrypter Instância de PasswordCrypt
      */
     public setPasswordCrypt(passwordCrypter: PasswordCrypt): void {
          this.passwordCrypter = passwordCrypter;
     }
     /**
      * Salva um novo cliente no banco de dados após criptografar a senha.
      * @param clientDTO Dados do cliente
      * @returns Cliente salvo
      */
     public async saveClientService(
          clientDTO: ClientDTO
     ): Promise<ClientModel> {
          clientDTO.senha = await this.getPasswordCrypt().toCrypt(
               clientDTO.senha
          );
          const model = ClientMapper.toModel(clientDTO);
          return this.getClienteRepository().saveClient(model);
     }
     /**
      * Retorna todos os clientes com papel de ADMIN.
      */
     public async getAllAdminsService(): Promise<ClientModel[]> {
          return await this.getClienteRepository().allAdmins();
     }
     /**
      * Retorna todos os clientes com papel de USER.
      */
     public async getAllUsersService(): Promise<ClientModel[]> {
          return await this.getClienteRepository().allUsers();
     }
     /**
      * Busca um admin pelo ID.
      * @param clientId ID do admin
      */
     public async getOneAdminService(
          clientId: string
     ): Promise<ClientModel | null> {
          return await this.getClienteRepository().getOneAdminById(clientId);
     }
     /**
      * Busca um usuário pelo ID.
      * @param id ID do usuário
      */
     public async getOneUserService(id: string): Promise<ClientModel | null> {
          return await this.getClienteRepository().getOneUserById(id);
     }
     /**
      * Busca um cliente pelo e-mail.
      * @param email E-mail do cliente
      */
     public async getClientByEmail(email: string): Promise<ClientModel | null> {
          return await this.getClienteRepository().getClientByEmail(email);
     }
     /**
      * Atualiza os dados de um cliente pelo ID.
      * @param clientId ID do cliente
      * @param newClientDTO Novos dados do cliente
      */
     public async updateClientService(
          clientId: string,
          newClientDTO: ClientDTO
     ): Promise<ClientModel | null> {
          const model = ClientMapper.toModel(newClientDTO);
          return this.getClienteRepository().updateClient(clientId, model);
     }
     /**
      * Remove um cliente pelo ID.
      * @param clientId ID do cliente
      * @returns true se removido, false caso contrário
      */
     public async deleteClientService(clientId: string): Promise<boolean> {
          const delClient: DeleteResult =
               await this.getClienteRepository().deleteClientById(clientId);
          if (!delClient) {
               return false;
          }
          return true;
     }
}
