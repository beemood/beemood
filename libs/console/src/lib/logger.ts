import { cwd } from 'process';
import { bold, cyan, green, red, yellow } from './colors.js';
import { getCallerLine } from './get-caller-line.js';

export class Logger {
  constructor(
    protected readonly context = getCallerLine(),
    protected readonly contextWidth = 30
  ) {}

  protected formatContext(subContext = '') {
    const __sCtx = subContext ? ` (${subContext})` : '';
    const __ctx = this.context || __sCtx || __filename.replace(cwd(), '');
    const __fctx = `[ ${__ctx} ]`;

    return `${__fctx}${__sCtx}`.padEnd(this.contextWidth);
  }

  log(message: string, subContext?: string) {
    const ctx = green(this.formatContext(subContext));
    console.log(ctx, message, getCallerLine());
  }

  info(message: string, subContext?: string) {
    const ctx = cyan(this.formatContext(subContext));
    console.log(ctx, message, getCallerLine());
  }

  warn(message: string, subContext?: string) {
    const ctx = yellow(this.formatContext(subContext));
    console.log(ctx, message, getCallerLine());
  }

  error(message: string, subContext?: string) {
    const ctx = bold(red(this.formatContext(subContext)));
    console.log(ctx, message, getCallerLine());
  }
}
