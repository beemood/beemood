import { program } from 'commander';
import { ByeCommand } from './commands/bye.command.js';
import { HelloCommand } from './commands/hello.command.js';

program.name('Beemood CLI').description('Dev tools').version('0.0.1');

new HelloCommand().bind(program);

new ByeCommand().bind(program);

program.parse();
