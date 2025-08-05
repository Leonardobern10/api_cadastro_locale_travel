import bcrypt from 'bcrypt';

export default class PasswordCrypt {
     private readonly salt = 10;

     /**
      * Criptografa uma senha usando bcrypt.
      * @param password Senha em texto puro
      * @returns Senha criptografada
      */
     public async toCrypt(password: string): Promise<string> {
          return await bcrypt.hash(password, this.salt);
     }

     /**
      * Compara uma senha recebida com o hash armazenado.
      * @param passwordReceived Senha recebida
      * @param passwordStored Hash armazenado
      * @returns true se coincidem, false caso contrário
      */
     public async toCompare(
          passwordReceived: string,
          passwordStored: string
     ): Promise<boolean> {
          if (!passwordReceived || !passwordStored) {
               throw new Error(
                    'Senha e hash devem ser fornecidos para comparação.'
               );
          }
          return await bcrypt.compare(passwordReceived, passwordStored);
     }
}
