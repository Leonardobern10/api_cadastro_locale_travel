import { Roles } from "infra/database/models/Roles";

export abstract class Client {
      private readonly client_id!: string;
      private nome: string;
      private sobrenome: string;
      private idade: number;
      private email: string;
      private senha: string;
      private created_at: Date;

      constructor(nome: string, sobrenome: string, idade: number, email: string,
            senha: string, created_at: Date) {
            this.nome = nome;
            this.sobrenome = sobrenome;
            this.idade = idade;
            this.email = email;
            this.senha = senha;
            this.created_at = created_at;
      }

      public getId(): string {
            return this.client_id!;
      }
      public getNome(): string {
            return this.nome;
      }
      public getSobrenome(): string {
            return this.sobrenome;
      }
      public getIdade(): number {
            return this.idade;
      }
      public getEmail(): string {
            return this.email;
      }
      public getSenha(): string {
            return this.senha;
      }
      public getCreatedAt(): Date {
            return this.created_at;
      }
      public abstract getRole(): Roles;

      public setNome(novoNome: string) {
            this.nome = novoNome;
      }
      public setSobrenome(novoSobrenome: string) {
            this.sobrenome = novoSobrenome;
      }
      public setIdade(novaIdade: number) {
            this.idade = novaIdade;
      }
      public setEmail(novoEmail: string) {
            this.email = novoEmail;
      }
      public setSenha(novaSenha: string) {
            this.senha = novaSenha;
      }
      public setCreatedAt(novaData: Date) {
            this.created_at = novaData;
      }
}