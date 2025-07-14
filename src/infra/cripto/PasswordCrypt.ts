import bcrypt from "bcrypt";

export default class PasswordCrypt {
      private readonly salt = 10;

      public async toCrypt(password: string): Promise<string> {
            return await bcrypt.hash(password, this.salt);
      }

      public async toCompare(passwordReceived: string, passwordStored: string): Promise<boolean> {
            return await bcrypt.compare(passwordReceived, passwordStored);
      }
}