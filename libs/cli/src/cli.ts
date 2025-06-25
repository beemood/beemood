import { program } from 'commander';
import { ByeCommand } from './commands/bye.command.js';
import { HelloCommand } from './commands/hello.command.js';

program.name('Beemood CLI').description('Dev tools').version('0.0.1');

new HelloCommand(program).parse();

new ByeCommand(program).parse();

program.parse();
