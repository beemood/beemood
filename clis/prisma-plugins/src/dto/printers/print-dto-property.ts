export function printDtoProperty(
  name: string,
  type: string,
  isRequried?: boolean,
) {
  return `${name}${isRequried ? '' : '?'}${type};`;
}
