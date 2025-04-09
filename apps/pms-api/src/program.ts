import { execSync } from 'child_process';
import { program } from 'commander';
import type { BootstrapOptions } from './bootstrap.js';
import { bootstrap } from './bootstrap.js';

program.name('pms-api cli').description('pms-api cli').version('0.0.1');

program
  .command('run')
  .name('run')
  .description('Run pms-api')
  .option('--port <number>', 'port', '3000')
  .option('--prefix <string>', 'prefix', 'api')
  .option('--profile <string>', 'profile', 'None')

  .action(async (options: BootstrapOptions) => {
    await bootstrap(options);
  });

program
  .command('migrate')
  .name('migrate')
  .description('Create database and generate the client')
  .option('-n, --name', 'migration name', 'init')
  .requiredOption('-d, --databaseUrl', 'Database url', process.env.DATABASE_URL)
  .action(({ name, DATABASE_URL }) => {
    execSync(
      `DATABASE_URL=${DATABASE_URL} npx prisma migrate dev --name ${name}`
    );
  });

program.parse();
