import { Roles } from 'infra/database/models/Roles';

export default abstract class ClientDTO {
     public readonly nome: string;
     public readonly sobrenome: string;
     public readonly idade: number;
     public readonly email: string;
     public senha: string;
     public readonly role: Roles;

     constructor(
          nome: string,
          sobrenome: string,
          idade: number,
          email: string,
          senha: string,
          role: Roles
     ) {
          this.nome = nome;
          this.sobrenome = sobrenome;
          this.idade = idade;
          this.email = email;
          this.senha = senha;
          this.role = role;
     }
}
