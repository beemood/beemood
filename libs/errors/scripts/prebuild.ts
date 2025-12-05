import { writeFile } from 'fs/promises';
import { readYamlFile } from 'nx/src/utils/fileutils.js';

export class BaseError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BaseError);
  }
}

function toErrorClasss(name: string, description: string) {
  const className = `${name}Error`;
  return `
    /**
     * ${description}
     */
    export class ${className}  extends Error { 
        constructor(message: string) {
            super('${className}: '+ message);
            Object.setPrototypeOf(this, ${className});
        }
    }
    `;
}

async function run() {
  const content = await readYamlFile('meta.yaml');

  const entries = Object.entries<string>(content);

  const code = entries
    .map(([name, description]) => {
      return toErrorClasss(name, description);
    })
    .join('\n');

  const formatedCode = (await import('prettier' as any)).format(code);
  await writeFile('src/lib/errors.ts', formatedCode, { encoding: 'utf-8' });
}

run();
