export function extractResourceName(controllerName: string): string {
  return controllerName.replace(
    /Controller|Resource|Resolver|Query|Create|Update|Delete|Manage|Mutation|Admin/g,
    ''
  );
}
