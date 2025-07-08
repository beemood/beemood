export function findDelimeters(name: string): string[] {
  return ['.', '-', '_', '|', '&', ' '].filter((e) => name.includes(e));
}

/**
 * Normalize the given string (transform it into kebab-case)
 * @param name string
 */
export function normalize(name: string): string {
  const delimeter = findDelimeters(name);

  if (delimeter != undefined) {
    for (const d of delimeter) {
      name = name.replaceAll(d, '-');
    }
    return name;
  } else {
    return name
      .split('')
      .map((v, i) => {
        if (i > 0) {
          if (/[A-Z]/.test(v)) {
            v = '-' + v;
          }
        }
        return v.toLowerCase();
      })
      .join('');
  }
}
