/**
 * Append brand name to the email address like `beemood+bug-report@org.com`
 *
 * @param email
 * @param brandName
 * @returns branded email address
 */
export function toBrandEmail(email: string, brandName: string) {
  return email.split('@').join(`+${brandName}@`);
}
