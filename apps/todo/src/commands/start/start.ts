import { execSync } from 'child_process';
import { Command } from 'commander';

export type StartOptions = {
  port: number;
};

export function startAction(options: StartOptions) {
  execSync(`PORT=${options.port} node ../dist/main.js`);
}

export function startCommand(program: Command) {
  program
    .command('start')
    .requiredOption('-p, --port <number> Port')
    .action(startAction);
}
