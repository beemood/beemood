/* eslint-disable spellcheck/spell-checker */

export type Domain<
  Name extends string = string,
  Extention extends string = string
> = `${Lowercase<Name>}.${Lowercase<Extention>}`;

export type Email<Username extends string = string> =
  `${Lowercase<Username>}@${Domain}`;

export type GithubRepository<
  Username extends string = string,
  Repository extends string = string
> = `https://github.com/${Username}/${Repository}`;

export type GithubRaw<
  Username extends string = string,
  Repository extends string = string,
  Branch extends string = string
> = `https://raw.githubusercontent.com/${Username}/${Repository}/refs/heads/${Branch}`;
