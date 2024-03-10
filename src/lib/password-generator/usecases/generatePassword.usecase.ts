import {
  PasswordGeneratorRepository,
  type GenerateParams
} from "../domain/repositories/passwordGenerator.repository";
export class GeneratePasswordUseCase {
  constructor(
    private readonly passwordGeneratorRepository: PasswordGeneratorRepository
  ) {}

  private validateForm(params: GenerateParams) {
    const { length, letters, numbers, symbols } = params;

    if (length < 6 || length > 30)
      throw new Error(`Length is out of range: min: 6 max: 30`);

    if (!letters)
      throw new Error(`You must have minimum letters in your password`);

    if (!letters && !numbers && !symbols)
      throw new Error(`Your password must have something to generate it with`);
  }

  execute(params: GenerateParams) {
    this.validateForm(params);

    return this.passwordGeneratorRepository.generate(params);
  }
}
