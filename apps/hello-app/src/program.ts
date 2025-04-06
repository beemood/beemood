import { program } from 'commander';
import type { BootstrapOptions } from './bootstrap-options.js';
import { bootstrap } from './bootstrap.js';

program.name('hello-app cli').description('hello-app cli').version('0.0.1');

program
  .command('run')
  .name('run')
  .description('Run hello-app')
  .option('--port <number>', 'port', '3000')
  .option('--prefix <string>', 'prefix', 'api')
  .option('--profile <string>', 'profile', 'None')

  .action(async (options: BootstrapOptions) => {
    await bootstrap(options);
  });

program.parse();
