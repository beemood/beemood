import { Command } from 'commander';

export type ByeOptions = {
  name: string;
};

export class ByeCommand {
  bind(program: Command) {
    program
      .command('bye')
      .description('Bye')
      .requiredOption('-n,--name <string> some description')
      .action(this.run);
  }

  run(options: ByeOptions) {
    console.log(`Hello, ${options.name}`);
  }
}
