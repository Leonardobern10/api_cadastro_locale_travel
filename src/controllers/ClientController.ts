import { Request, Response } from "express";
import ClientService from "services/ClientService";
import ClientDTO from "application/ClientDTO";

export default class ClientController {
      private clientService: ClientService;

      constructor(clientService: ClientService) {
            this.clientService = clientService;
      }

      public getClientService(): ClientService {
            return this.clientService;
      }

      public async saveClient(req: Request, res: Response): Promise<void> {
            console.log(req.body)
            try {
                  const { nome, sobrenome, idade, email, senha, role } = req.body;
                  const dto = new ClientDTO(nome, sobrenome, idade, email, senha, role)
                  const client = await this.getClientService().saveClientService(dto);
                  res.status(201).json(client);
            } catch (erro) {
                  res.status(400).json({ message: "Erro ao cadastrar" })
                  throw erro;
            }
      }

      public async allClients(req: Request, res: Response): Promise<void> {
            try {
                  const allClients = await this.clientService.getAllClientsService();
                  res.status(200).json(allClients);
            } catch (error) {
                  console.error(error);
                  res.status(500).json({ "error": "Erro ao ĺistar usuários!" })
            }

      }
}