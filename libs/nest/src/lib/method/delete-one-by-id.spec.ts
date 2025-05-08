import { DeleteOneById } from './delete-one-by-id.js';

describe('DeleteOneById', () => {
  it('should work', () => {
    class Sample {}

    class Controller {
      @DeleteOneById({ responseType: () => Sample })
      method() {
        return {};
      }
    }
  });
});
