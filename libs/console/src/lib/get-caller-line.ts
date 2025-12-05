/**
 * Retrieves the shortened, clickable caller location string.
 * Format: "  at filename:line:column"
 */
export function getCallerLine(): string {
  const error = new Error();
  const stackLines = error.stack ? error.stack.split('\n') : [];

  // Index 3 is typically the line that called your log function
  const callerLine = stackLines[3];

  if (callerLine) {
    // Regex to capture the full path, line, and column.
    // It looks for patterns common in Node stack traces.
    const match =
      callerLine.match(/\(([^:]+):(\d+):(\d+)\)/) ||
      callerLine.match(/at\s+([^:]+):(\d+):(\d+)/);

    if (match) {
      // match[1] = full path
      // match[2] = line number
      // match[3] = column number

      const fullPath = match[1];
      const lineNumber = match[2];
      const columnNumber = match[3];

      // 1. Extract the filename and the immediate parent directory
      // E.g., from /home/.../beemood/libs/console/src/lib/logger.spec.ts
      // We want "console/src/lib/logger.spec.ts" or just "logger.spec.ts"

      const parts = fullPath.split(/[/\\]/); // Split by / or \
      const filename = parts.pop(); // Get the file name (logger.spec.ts)
      const parentDir = parts.pop(); // Get the parent directory (lib)

      // 2. Reconstruct a shorter path (e.g., 'lib/logger.spec.ts')
      const shortPath = `${parentDir}/${filename}`;

      // 3. Reconstruct the clickable format: "at (file_path:line:column)"
      // The space and the parentheses/colon pattern are what make it clickable.
      return `  at ${shortPath}:${lineNumber}:${columnNumber}`;
    }
  }
  return '  at [unknown location]';
}
