import { Duration } from '@beemood/datetime';
import { Registry } from './registry.js';

describe('Registry', () => {
  describe('RegualrRegistry', () => {
    let registry: Registry<string>;

    beforeAll(() => {
      registry = new Registry();
    });

    it('should create registry', () => {
      expect(registry).toBeDefined();
    });

    it('should add and remove record', () => {
      expect(registry.add('value')).toBe(true);

      expect(() => registry.addOrThrow('value')).toThrowError(
        /value is already registered/
      );
      expect(registry.has('value')).toBe(true);
      expect(registry.remove('value')).toBe(true);
    });
  });

  describe('LifetimeRegistry', () => {
    let registry: Registry<string>;

    beforeAll(() => {
      registry = new Registry(Duration.second(3));
    });

    it('should check expirations', async ({ signal }) => {
      expect(registry).toBeDefined();

      registry.add('1');
      registry.add('2');
      registry.add('3', Duration.minute(1));

      await new Promise((res, rej) => {
        const timer = setTimeout(() => {
          expect(registry.size()).toBe(1);

          res(true);
        }, Duration.second(4));

        signal.onabort = () => {
          clearTimeout(timer); // ⬅️ THIS STOPS THE PENDING TIMER
          rej(new Error('Test aborted or timed out. Timer cleared.'));
        };
      });
    });
  });
});
