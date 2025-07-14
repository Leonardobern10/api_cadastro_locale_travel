import { Request, Response } from "express";
import ClientService from "services/ClientService";
import ClientDTO from "application/ClientDTO";
import { createClientHateoas } from "utils/hateoas";
import { clientSchema } from "application/validators/clientSchema";

/**
 * Classe CONTROLLER responsável por receber o conteudo
 * da requisição e direcionar para o serviço correto.
 */
export default class ClientController {
      private clientService: ClientService;

      constructor(clientService: ClientService) {
            this.clientService = clientService;
      }

      /**
       * Método que permite acionar a ClientService.
       * 
       * @returns ClientService
       */
      public getClientService(): ClientService {
            return this.clientService;
      }

      public async saveClient(req: Request, res: Response): Promise<void> {
            try {
                  const data = clientSchema.parse(req.body);
                  const dto = new ClientDTO(data.nome, data.sobrenome, data.idade, data.email, data.senha, data.role);
                  const client = await this.getClientService().saveClientService(dto);
                  res.status(201).json(client);
            } catch (erro) {
                  res.status(400).json({ message: "Erro ao cadastrar" })
                  throw erro;
            }
      }

      public async getAllClients(req: Request, res: Response): Promise<void> {
            try {
                  const allClients = await this.clientService.getAllClientsService();
                  const response = createClientHateoas(allClients);
                  res.status(200).json(response);
            } catch (error) {
                  console.error(error);
                  res.status(500).json({ "error": "Erro ao ĺistar usuários!" })
            }

      }

      public async getOneClient(req: Request, res: Response): Promise<void> {
            try {
                  const id = req.params.id;
                  const client = await this.getClientService().getOnClientService(String(id));
                  if (!client) {
                        res.status(404).json({ "message": "Usuário não encontrado!" });
                  }

                  const response = createClientHateoas(client);
                  res.status(200).json(response);
            } catch (error) {
                  console.error(`Erro ao obter usuário unico: ${error}`);
                  res.status(500).json({ "Error": "Erro ao obter usuário!" });
            }
      }

      public async delClientById(req: Request, res: Response): Promise<void> {
            try {
                  const id: string = req.params.clientId;
                  const delClient: boolean = await this.getClientService().deleteClientService(id);
                  if (!delClient) {
                        res.status(404).json({ "Erro": "Não foi possivel remover o usuário!" });
                  }
                  res.status(204).send();
            } catch (error) {
                  console.error("Erro ao remover usuário: " + error);
                  res.status(500).json({ "Erro": "Não foi possível processar sua solicitação. Tente novamente!" })
            }
      }


}