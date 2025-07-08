/**
 * Normalize the given string (transform it into kebab-case)
 * @param name string
 */
export function normalize(name: string): string {
  const delimeters = ['.', '-', '_', '|', '&', ' '];

  if (delimeters.find((e) => name.includes(e))) {
    for (const d of delimeters) {
      name = name.replaceAll(d, '-');
    }
  } else if (/^[A-Za-z]{1,}$/.test(name)) {
    name = name
      .split('')
      .map((e, i) => {
        if (i > 0 && /[A-Z]/.test(e)) {
          return '-' + e;
        }

        return e;
      })
      .join('');
  }

  return name.toLowerCase();
}
