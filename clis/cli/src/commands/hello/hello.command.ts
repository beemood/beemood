import { Command } from 'commander';

export type HelloCommandOptions = {
  username: string;
};

export function helloCommandAction(options: HelloCommandOptions) {
  console.log(`Hello, ${options.username}`);
}

export function helloCommand(program: Command) {
  program
    .command('hello')
    .description('Say hello')
    .requiredOption('-n,--username <string> Useranme')
    .action(helloCommandAction);
}
