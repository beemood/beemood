import { Command } from 'commander';
import { CliErrors } from 'src/shared/cli-errors';
import { pathToFileURL } from 'url';

/**
 * Rename command options
 */
export type RenameCommandOptions = {
  /**
   * Root directory (default value is the current working directory)
   */
  rootdir?: string;
  /**
   * Regular expression string to match file names to process
   */
  expression?: string;

  /**
   * Rename files by prefixing file name
   */
  prefix?: string;

  /**
   * Rename files by suffixing
   */
  suffix?: string;

  /**
   * Replace from[i] with to[i|0] in the file name
   */
  from?: string[];

  /**
   * Replace from[i] with to[i|0] in the file name
   */
  to?: string[];
};

export function renameAction(options: RenameCommandOptions) {
  const { expression, from, to, prefix, suffix } = options;

  if (
    from == undefined &&
    to == undefined &&
    prefix == undefined &&
    suffix == undefined
  ) {
    throw new Error(
      `${CliErrors.INVALID_PARAM}: at least one of the parameter is required! (from, to, prefix, or suffix)`
    );
  }
}

export function renameCommand(program: Command) {
  program
    .command('rename')
    .description('rename files/directories (recursively)')
    .action(renameAction);
}
