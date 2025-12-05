import { createProvider } from '@beemood/nestjs';

export const {
  provideFactory: provideClientFactory,
  provideValue: provideClientValue,
  inject: InjectClient,
  token: getClientToken,
} = createProvider('PrismaClient');
