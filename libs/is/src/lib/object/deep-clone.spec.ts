// libs/utils/src/clone-utils.spec.ts
import { fail } from 'assert';
import { deepClone } from './deep-clone.js';

describe('deepClone', () => {
  // Test case interface for consistency
  interface CloneTestCase {
    input: any; // Input value to clone
    modify: (clone: any) => void; // Function to modify the clone
    checkOriginal: (original: any) => void; // Function to check original remains unchanged
    checkClone?: (clone: any) => void; // Optional: Check clone-specific changes
    description: string; // Custom description for readability
  }

  // Comprehensive test cases
  const testCases: CloneTestCase[] = [
    {
      input: 42,
      modify: () => {}, // No-op for primitives
      checkOriginal: (original) => expect(original).toBe(42),
      description: 'primitive number',
    },
    {
      input: 'hello',
      modify: () => {},
      checkOriginal: (original) => expect(original).toBe('hello'),
      description: 'primitive string',
    },
    {
      input: null,
      modify: () => {},
      checkOriginal: (original) => expect(original).toBeNull(),
      description: 'null',
    },
    {
      input: undefined,
      modify: () => {},
      checkOriginal: (original) => expect(original).toBeUndefined(),
      description: 'undefined',
    },
    {
      input: { a: 1, b: 2 },
      modify: (clone) => (clone.a = 99),
      checkOriginal: (original) => expect(original.a).toBe(1),
      checkClone: (clone) => expect(clone.a).toBe(99),
      description: 'simple object',
    },
    {
      input: { nested: { value: 'test' } },
      modify: (clone) => (clone.nested.value = 'modified'),
      checkOriginal: (original) => expect(original.nested.value).toBe('test'),
      checkClone: (clone) => expect(clone.nested.value).toBe('modified'),
      description: 'nested object',
    },
    {
      input: [1, { x: 2 }, 3],
      modify: (clone) => (clone[1].x = 99),
      checkOriginal: (original) => expect(original[1].x).toBe(2),
      checkClone: (clone) => expect(clone[1].x).toBe(99),
      description: 'array with nested object',
    },
    {
      input: new Date('2023-05-05'),
      modify: (clone) => clone.setFullYear(2024),
      checkOriginal: (original) => expect(original.getFullYear()).toBe(2023),
      checkClone: (clone) => expect(clone.getFullYear()).toBe(2024),
      description: 'Date object',
    },
    {
      input: new RegExp('test', 'i'),
      modify: (clone) => {}, // RegExp is immutable, no meaningful modification
      checkOriginal: (original) => expect(original.test('TEST')).toBe(true),
      checkClone: (clone) => expect(clone.test('TEST')).toBe(true),
      description: 'RegExp object',
    },
    {
      input: new Map<any, any>([
        ['key', 'value'],
        ['nested', { x: 1 }],
      ]),
      modify: (clone) => (clone.get('nested').x = 99),
      checkOriginal: (original) => expect(original.get('nested').x).toBe(1),
      checkClone: (clone) => expect(clone.get('nested').x).toBe(99),
      description: 'Map with nested object',
    },
    {
      input: new Set([1, { y: 2 }]),
      modify: (clone) => {
        const obj: any = Array.from(clone)[1];
        obj.y = 99;
      },
      checkOriginal: (original) =>
        expect((Array.from(original) as any)[1].y).toBe(2),
      checkClone: (clone) => expect((Array.from(clone) as any)[1].y).toBe(99),
      description: 'Set with nested object',
    },
    {
      input: (() => {
        const obj: any = { a: 1 };
        obj.self = obj;
        return obj;
      })(),
      modify: (clone) => (clone.self.a = 99),
      checkOriginal: (original) => expect(original.a).toBe(1),
      checkClone: (clone) => expect(clone.self.a).toBe(99),
      description: 'object with circular reference',
    },
    {
      input: Object.create(
        { protoProp: 'proto' },
        { ownProp: { value: 'own' } },
      ),
      modify: (clone) => (clone.ownProp = 'modified'),
      checkOriginal: (original) => expect(original.ownProp).toBe('own'),
      checkClone: (clone) => expect(clone.ownProp).toBe('modified'),
      description: 'object with prototype',
    },
  ];

  // Test suite using it.each
  it.each(testCases)(
    'Test case %i: deepClone handles $description without side effects',
    ({ input, modify, checkOriginal, checkClone }) => {
      const clone = deepClone(input);

      // Modify the clone
      modify(clone);

      // Check original remains unchanged
      checkOriginal(input);

      // Check clone reflects modifications (if applicable)
      if (checkClone) {
        checkClone(clone);
      }

      // Additional structural check
      if (typeof input === 'object' && input !== null) {
        expect(clone).not.toBe(input); // Ensure no reference equality
      }
    },
  );

  // Additional specific tests
  it('clones Map keys correctly', () => {
    const original = new Map([[new Date('2023-05-05'), 'date']]);
    const clone = deepClone(original);
    const originalKey: Date = original.keys().next().value!;
    const cloneKey: Date = clone.keys().next().value!;
    if (cloneKey === originalKey) fail('Same reference');

    expect(cloneKey.getTime()).toBe(originalKey.getTime());
  });

  it('preserves prototype chain', () => {
    const proto = { method: () => 'proto' };
    const original = Object.create(proto);
    original.prop = 'own';
    const clone = deepClone(original);
    expect(clone.method()).toBe('proto');
    expect(clone.prop).toBe('own');
  });
});
