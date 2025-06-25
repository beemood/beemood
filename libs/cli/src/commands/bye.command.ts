import { Command } from 'commander';

export type ByeOptions = {
  name: string;
};

export class ByeCommand {
  constructor(protected readonly program: Command) {}

  parse() {
    this.program
      .name('Bye')
      .description('Bye')
      .requiredOption('-n,--name <string> some description')
      .action(this.run);
  }

  run(options: ByeOptions) {
    console.log(`Hello, ${options.name}`);
  }
}
