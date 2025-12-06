/**
 * Pluralize string value by adding s,ies, es suffix.
 * @param name
 * @returns
 */
export function pluralize(name: string): string {
  if (/[^aeiou]y$/i.test(name)) {
    name = name.slice(0, -1) + 'ies';
  } else if (/(s|x|z|ch|sh)$/i.test(name)) {
    name = name + 'es';
  } else if (/(hero|potato|tomato|echo)$/i.test(name)) {
    name = name + 'es';
    // Replace the 'f' or 'fe' with 'v' and add 'es'.
  } else if (/(fe?)$/i.test(name)) {
    name = name.replace(/fe?$/i, 'ves');
  } else {
    name = name + 's';
  }

  return name;
}
