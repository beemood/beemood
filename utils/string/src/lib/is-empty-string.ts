export function isEmptyString(value: string): value is '' {
  if (value === '') {
    return true;
  }

  return false;
}
