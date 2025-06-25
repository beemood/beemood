import { Command } from 'commander';

export type HelloOptions = {
  name: string;
};

export class HelloCommand {
  constructor(protected readonly program: Command) {}

  parse() {
    this.program
      .name('hello')
      .description('Ssay hello')
      .requiredOption('-n,--name <string> what is your name?')
      .action(this.run);
  }
  
  run(options: HelloOptions) {
    console.log(`Hello, ${options.name}`);
  }
}
