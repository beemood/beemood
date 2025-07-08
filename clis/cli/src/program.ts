import { program } from 'commander';
import { helloCommand } from './commands/hello/hello.command';
import { bundleJsonCommand } from './commands/bundle-json/bundle-json.command';
import { generateTypesCommand } from './commands/generate-typs/generate-types';

program.name('Beemood CLI').description('Dev tool');

helloCommand(program);

bundleJsonCommand(program);

generateTypesCommand(program);

program.parse();
