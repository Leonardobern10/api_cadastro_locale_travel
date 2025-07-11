import ClientModel from "infra/database/models/ClientModel";
import { Request, Response } from "express";
import ClientService from "services/ClientService";

export default class ClientController {
      private readonly clientService: ClientService;

      constructor(clientService: ClientService) {
            this.clientService = clientService;
      }

      public getClientService(): ClientService {
            return this.clientService;
      }

      public async saveClient(req: Request, res: Response): Promise<void> {
            const body = req.body;
            try {
                  const client = await this.clientService.saveClientService(new ClientModel());
                  res.status(201).json(client);
            } catch (erro) {
                  console.log(erro);
                  res.status(400).json({ message: "Erro ao cadastrar" })
            }
      }
}