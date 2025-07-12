import ClientDTO from "application/ClientDTO";
import ClientModel from "infra/database/models/ClientModel";
import { DataSource, Repository } from "typeorm";

export default class ClientRepository {
      private repository: Repository<ClientModel>;

      constructor(dataSource: DataSource) {
            this.repository = dataSource.getRepository(ClientModel);
      }

      public async saveClient(client: ClientModel): Promise<ClientModel> {
            return await this.repository.save(client);
      }

      public async allClients(): Promise<ClientModel[]> {
            return await this.repository.find();
      }
}