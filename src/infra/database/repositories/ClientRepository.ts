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

      public async getOneClient(client_id: string): Promise<ClientModel | null> {
            return await this.repository.findOne({
                  where: {
                        client_id: client_id
                  }
            })
      }
}