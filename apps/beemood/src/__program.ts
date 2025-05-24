import { Command } from 'commander';
import { integrateHelloProgram } from './commands/hello/hello.js';

const program = new Command();

program.name('beemood').description('Beemood cli too').version('0.0.1');

integrateHelloProgram(program);

program.parse();
