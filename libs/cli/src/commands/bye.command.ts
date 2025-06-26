import type { Command } from 'commander';

/**
 * Command parameters
 *
 * @group Command
 */
export type ByeOptions = {
  /**
   * Username to say bye to
   */
  name: string;
};

/**
 * Say bye to the user
 *
 * @group Command
 *
 * @example
 *
 * ````shell
 *  beemood bye -n <name>
 *  beemood bye --name <name>
 * ````
 */
export class ByeCommand {
  /**
   * Bind the command to the main program.
   * @param program the program instance from `commander` library
   */
  bind(program: Command) {
    program
      .command('bye')
      .description('Bye')
      .requiredOption('-n,--name <string> some description')
      .action(this.run);
  }

  /**
   * Run the command
   * @param options {@link ByeOptions}
   */
  run(options: ByeOptions) {
    console.log(`Hello, ${options.name}`);
  }
}
