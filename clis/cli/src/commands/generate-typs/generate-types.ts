import { Command } from 'commander';
import { generateTypes } from '@beemood/json';

export type GenerateTypesCommandOptions = {
  /**
   * Bundled main schema file path
   */
  main: string;

  /**
   * Generated typescript type file path
   */
  out: string;
};

export async function generateTypesCommandAction(
  options: GenerateTypesCommandOptions
) {
  await generateTypes(options.main, options.out);
}

export function generateTypesCommand(program: Command) {
  program
    .command('generate-types')
    .description('Generate typescript types from bundled json schemas')
    .requiredOption('-m,--main <string> Main schema file path')
    .requiredOption('-o,--out <string> Generated typescript type file path')
    .action(async (options) => {
      await generateTypesCommandAction(options);
    });
}
