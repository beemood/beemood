import { Command } from 'commander';

export type HelloOptions = {
  name: string;
};

/**
 * Hello command handler
 * @param args string[]
 * @param options {@link HelloOptions}
 */
export function helloHandler(args: string[], options: HelloOptions) {
  const greeting = `Hello, ${options.name}`;
  console.log(greeting);
}

/**
 * Integrate the hello command with the main program
 * @param program Command instance from `commander` library
 */
export function integrateHelloProgram(program: Command) {
  program
    .name('hello')
    .description('Say hello')
    .requiredOption('-n, --name <string>', 'You name')
    .action(helloHandler);
}
