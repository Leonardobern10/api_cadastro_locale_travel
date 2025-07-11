import ClientModel from "infra/database/models/ClientModel";
import ClientRepository from "infra/database/repositories/ClientRepository";

export default class ClientService {
      private readonly clientRepository: ClientRepository;

      constructor(clientRepository: ClientRepository) {
            this.clientRepository = clientRepository;
      }

      public getClienteRepository(): ClientRepository {
            return this.clientRepository;
      }

      public saveClientService(client: ClientModel) {
            return this.getClienteRepository().saveClient(client);
      }
}