import type { PasswordEntity } from "../../domain/entities/password.entity";
import {
  PasswordGeneratorRepository,
  type GenerateParams
} from "../../domain/repositories";

export class PasswordGeneratorModel extends PasswordGeneratorRepository {
  private characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private numbers = "0123456789";
  private symbols = "!@#$%^&*()";
  private defaultLength = 12;

  private validateParams(params: GenerateParams) {
    let chars = this.characters;

    if (!params.letters) chars = "";
    if (params.numbers) chars += this.numbers;
    if (params.symbols) chars += this.symbols;
    if (params.length < 6 || params.length > 30)
      params.length = this.defaultLength;

    return chars;
  }

  private createPassword(chars: string, length: number) {
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
  }

  generate(params: GenerateParams): PasswordEntity {
    const chars = this.validateParams(params);
    const { length } = params;

    const password = this.createPassword(chars, length);

    return password;
  }
}
