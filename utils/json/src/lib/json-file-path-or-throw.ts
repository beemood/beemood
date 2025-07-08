export function jsonFilePathOrThrow(filepath: string) {
  if (filepath.endsWith('.json') && filepath.length > 5) {
    return filepath;
  }
  throw new Error(`${filepath} is not valid json file path`);
}
