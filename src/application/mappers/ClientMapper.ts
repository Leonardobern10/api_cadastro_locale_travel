import ClientDTO from "application/ClientDTO";
import ClientModel from "infra/database/models/ClientModel";

export default class ClientMapper {
      static toModel(clientDto: ClientDTO): ClientModel {
            const model = new ClientModel();
            model.nome = clientDto.nome;
            model.sobrenome = clientDto.sobrenome;
            model.idade = clientDto.idade;
            model.email = clientDto.email;
            model.senha = clientDto.senha;
            model.role = clientDto.role;
            model.created_at = new Date();
            return model;
      }
}