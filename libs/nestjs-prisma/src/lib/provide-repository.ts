import { createNamedProvider } from '@beemood/nestjs';

export const {
  inject: InjectRepository,
  provideFactory: provideRepositoryFactory,
  provideValue: provideRepositoryValue,
  token: getRepositoryToken,
} = createNamedProvider('PrismaClientRepository');
