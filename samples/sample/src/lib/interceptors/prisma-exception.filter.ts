import { PrismaExceptionFilter as _PrismaExceptionFilter } from '@beemood/nestjs-prisma';
import { Prisma } from '@beemood/sample-db';
import { Catch } from '@nestjs/common';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends _PrismaExceptionFilter {}
