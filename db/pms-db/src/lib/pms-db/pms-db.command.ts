import type { Command } from 'commander';
import { pms-db } from './pms-db.js';

/**
 * Configure the pms-db command
 * @param command commander instance
 */
export function pms-dbCommand(command: Command) {
  command
    .command('pms-db')
    .description('Say pms-db')
    .option('-n, --name <string>', 'What is your name?')
    .action(pms-db);
}
