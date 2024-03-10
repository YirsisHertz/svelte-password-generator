import type { PasswordEntity } from "../entities/password.entity";

export interface GenerateParams {
  length: number;
  letters: boolean;
  numbers: boolean;
  symbols: boolean;
}

export abstract class PasswordGeneratorRepository {
  abstract generate(params: GenerateParams): PasswordEntity;
}
