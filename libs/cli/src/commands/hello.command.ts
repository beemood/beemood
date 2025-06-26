import type { Command } from 'commander';

/**
 * Command parameters
 *
 * @group Command
 */
export type HelloOptions = {
  /**
   * Username to be used to greet user
   */
  name: string;
};
/**
 * Say hello to the user by his username
 *
 * @group Command
 *
 * @example
 *
 * ````shell
 *  beemood hello -n Robert
 *  beemood hello --name Robert
 * ````
 */
export class HelloCommand {
  /**
   * Bind the command to the main program.
   * @param program the program instance from `commander` library
   */
  bind(program: Command) {
    program
      .command('hello')
      .description('Say hello to user')
      .requiredOption('-n,--name <string> some description')
      .action(this.run);
  }
  /**
   * Run the command
   * @param options {@link HelloOptions}
   */
  run(options: HelloOptions) {
    console.log(`Hello, ${options.name}`);
  }
}
