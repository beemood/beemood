import type { Command } from 'commander';
import { hello } from './hello.js';

/**
 * Configure the hello command
 * @param command commander instance
 */
export function helloCommand(command: Command) {
  command
    .command('hello')
    .description('Say hello')
    .option('-n, --name <string>', 'What is your name?')
    .action(hello);
}
