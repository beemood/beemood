import type { Command } from 'commander';
import { fs } from './fs.js';

/**
 * Configure the fs command
 * @param command commander instance
 */
export function fsCommand(command: Command) {
  command
    .command('fs')
    .description('Say fs')
    .option('-n, --name <string>', 'What is your name?')
    .action(fs);
}
