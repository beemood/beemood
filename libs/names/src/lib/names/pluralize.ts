/* eslint-disable spellcheck/spell-checker */
/**
 * Pluralize the given string following (english) grammer
 * @param name name to pluralize
 * @returns
 */
export function pluralize(name: string): string {
  const lowercase = name.toLowerCase();

  const irregularPlurals: Record<string, string> = {
    child: 'children',
    person: 'people',
    man: 'men',
    woman: 'women',
    mouse: 'mice',
    tooth: 'teeth',
    foot: 'feet',
    goose: 'geese',
    ox: 'oxen',
    cactus: 'cacti',
    focus: 'foci',
    radius: 'radii',
    syllabus: 'syllabi',
  };

  const uncountableWords = [
    'fish',
    'sheep',
    'deer',
    'moose',
    'series',
    'species',
    'data',
    'equipment',
    'information',
    'rice',
    'money',
  ];

  // Check for uncountable words
  if (uncountableWords.includes(lowercase)) {
    return name;
  }

  // Check for irregular plurals
  if (irregularPlurals[lowercase]) {
    return irregularPlurals[lowercase];
  }

  // Regular pluralization rules
  if (lowercase.endsWith('y') && !/[aeiou]y$/i.test(lowercase)) {
    // If the word ends with "y" and is preceded by a consonant
    return name.slice(0, -1) + 'ies';
  } else if (
    lowercase.endsWith('s') ||
    lowercase.endsWith('x') ||
    lowercase.endsWith('z') ||
    lowercase.endsWith('sh') ||
    lowercase.endsWith('ch')
  ) {
    // If the word ends with "s", "x", "z", "sh", or "ch"
    return name + 'es';
  } else if (lowercase.endsWith('f')) {
    // If the word ends with "f"
    return name.slice(0, -1) + 'ves';
  } else if (lowercase.endsWith('fe')) {
    // If the word ends with "fe"
    return name.slice(0, -2) + 'ves';
  } else {
    // Default rule: just add "s"
    return name + 's';
  }
}
