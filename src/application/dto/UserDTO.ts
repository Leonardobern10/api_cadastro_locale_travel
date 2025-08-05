import { Roles } from 'infra/database/models/Roles';
import ClientDTO from './ClientDTO';

export default class UserDTO extends ClientDTO {
     constructor(
          nome: string,
          sobrenome: string,
          idade: number,
          email: string,
          senha: string
     ) {
          super(nome, sobrenome, idade, email, senha, Roles.USER);
     }
}
