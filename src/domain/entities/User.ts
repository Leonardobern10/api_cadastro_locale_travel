import { Roles } from "infra/database/models/Roles";
import { Client } from "./Client";

export default class User extends Client {
      private readonly role: Roles;

      constructor(nome: string, sobrenome: string, idade: number, email: string,
            senha: string, created_at: Date) {
            super(nome, sobrenome, idade, email, senha, created_at);
            this.role = Roles.USER;
      }

      public getRole(): Roles {
            return this.role;
      }
}