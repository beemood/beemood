import { UpdateOneById } from './update-one-by-id.js';

describe('UpdateOneById', () => {
  it('should work', () => {
    class Sample {}

    class Controller {
      @UpdateOneById({ responseType: () => Sample })
      method() {
        return {};
      }
    }
  });
});
