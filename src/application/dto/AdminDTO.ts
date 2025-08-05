import { Roles } from 'infra/database/models/Roles';
import ClientDTO from './ClientDTO';

/**
 * Classe representativa para os dados recebidos da
 * requisição de um Admin.
 */
export default class AdminDTO extends ClientDTO {
     constructor(
          nome: string,
          sobrenome: string,
          idade: number,
          email: string,
          senha: string
     ) {
          super(nome, sobrenome, idade, email, senha, Roles.ADMIN);
     }
}
