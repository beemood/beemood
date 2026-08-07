/**
 * Check the {@link condition} is true, or false and run the {@link thenHandler} or {@link elseHandler} accordingly
 * @param condition
 * @param thenHandler
 * @param elseHandler
 * @returns
 */
export function isTrueThen(
  condition: boolean,
  thenHandler: () => void,
  elseHandler?: () => void,
): void {
  if (condition === true) {
    thenHandler();
  } else {
    if (elseHandler) {
      elseHandler();
    }
  }
}
