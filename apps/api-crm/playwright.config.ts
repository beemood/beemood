import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig } from '@playwright/test';
import { fileURLToPath } from 'url';

// For CI, you may want to set BASE_URL to the deployed application.

const port = 3001;
const baseURL = `http://localhost:${port}`;

const __filename = fileURLToPath(import.meta.url);

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './e2e' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx nx serve @bmod/api-crm',
    cwd: workspaceRoot,
    port: 3000,
  },
  testDir: './e2e',
  tsconfig: './tsconfig.e2e.json',
});
