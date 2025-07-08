import { Command } from 'commander';
import { bundle } from '@beemood/json';
export type BundleJsonCommandOptions = {
  /**
   * Main schema file path
   */
  main: string;

  /**
   * Bundle schema file path
   */
  out: string;
};

export async function bundleJsonCommandAction(
  options: BundleJsonCommandOptions
) {
  await bundle(options.main, options.out);
}

export function bundleJsonCommand(program: Command) {
  program
    .command('bundle-json')
    .description('Bundle json schemas into a single schema file')
    .requiredOption('-m,--main <string> Main schema file path')
    .requiredOption('-o,--out <string> Bundled schema file path')
    .action(async (options) => {
      await bundleJsonCommandAction(options);
    });
}
