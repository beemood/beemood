import { program } from 'commander';
import { ByeCommand } from './commands/bye.command';
import { HelloCommand } from './commands/hello.command';

program.name('Beemood CLI').description('Development helpers').version('0.0.1');

new HelloCommand(program).parse();

new ByeCommand(program).parse();

program.parse();
