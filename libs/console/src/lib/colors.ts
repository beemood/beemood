export const RESET = '\x1b[0m';

export function red(value: any) {
  return `\x1b[31m${value}${RESET}`;
}
export function green(value: any) {
  return `\x1b[32m${value}${RESET}`;
}

export function yellow(value: any) {
  return `\x1b[33m${value}${RESET}`;
}

export function blue(value: any) {
  return `\x1b[34m${value}${RESET}`;
}

export function magenta(value: any) {
  return `\x1b[35m${value}${RESET}`;
}

export function cyan(value: any) {
  return `\x1b[36m${value}${RESET}`;
}

export function white(value: any) {
  return `\x1b[37m${value}${RESET}`;
}


export function bold(value: any) {
    return `\x1b[1m${value}${RESET}`;
}