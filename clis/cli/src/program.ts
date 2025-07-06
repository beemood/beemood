import { program } from 'commander';
import { helloCommand } from './commands/hello/hello.command';

program.name('Beemood CLI').description('Dev tool');

helloCommand(program);

program.parse();
