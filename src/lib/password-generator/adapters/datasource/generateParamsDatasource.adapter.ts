import type { GenerateParams } from "../../domain/repositories";

interface IParams {
  length: number;
  letters: boolean;
  numbers: boolean;
  symbols: boolean;
}

export const GenerateParamsDatasourceAdapter = (
  params: IParams
): GenerateParams => {
  return {
    length: params.length,
    letters: params.letters,
    numbers: params.numbers,
    symbols: params.symbols
  };
};
