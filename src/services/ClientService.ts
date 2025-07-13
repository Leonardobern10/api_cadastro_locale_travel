import ClientDTO from "application/ClientDTO";
import ClientMapper from "application/mappers/ClientMapper";
import PasswordCrypt from "infra/cripto/PasswordCrypt";
import ClientModel from "infra/database/models/ClientModel";
import { Roles } from "infra/database/models/Roles";
import ClientRepository from "infra/database/repositories/ClientRepository";

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

      public async saveClientService(clientDTO: ClientDTO): Promise<ClientModel> {
            clientDTO.senha = await this.getPasswordCrypt().toCrypt(clientDTO.senha);
            const model = ClientMapper.toModel(clientDTO);
            return this.getClienteRepository().saveClient(model);
      }

      public async getAllClientsService(): Promise<ClientModel[]> {
            return await this.getClienteRepository().allClients();
      }
}