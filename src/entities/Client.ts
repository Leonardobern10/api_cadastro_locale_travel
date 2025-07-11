export class Client {
      private client_id!: string;
      private nome: string;
      private sobrenome: string;
      private idade: number;
      private email: string;
      private senha: string;
      private role: string;
      private created_at: Date;

      constructor(nome: string, sobrenome: string, idade: number, email: string,
            senha: string, role: string, created_at: Date) {
            this.nome = nome;
            this.sobrenome = sobrenome;
            this.idade = idade;
            this.email = email;
            this.senha = senha;
            this.role = role;
            this.created_at = created_at;
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
      public getRole(): string {
            return this.role;
      }
      public getCreatedAt(): Date {
            return this.created_at;
      }

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
      public setRole(novaRole: string) {
            this.role = novaRole
      }
      public setCreatedAt(novaData: Date) {
            this.created_at = novaData;
      }
}