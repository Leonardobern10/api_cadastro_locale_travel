import ClientDTO from 'application/dto/ClientDTO';
import ClientModel from 'infra/database/models/ClientModel';

export default class ClientMapper {
     /**
      * Converte um DTO de cliente para o modelo de banco de dados.
      * @param clientDto DTO do cliente
      * @returns Instância de ClientModel
      */
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
