import { CreateOne } from './create-one.js';

describe('CreateOne', () => {
  it('should work', () => {
    class Sample {}

    class Controller {
      @CreateOne({ responseType: () => Sample })
      method() {
        return {};
      }
    }
  });
});
