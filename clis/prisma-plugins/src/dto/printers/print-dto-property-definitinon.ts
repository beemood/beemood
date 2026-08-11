export function printDtoPropertyDefinition(
  name: string,
  type: string,
  isRequried?: boolean,
) {
  return `${name}${isRequried ? '' : '?'}: ${type};`;
}
