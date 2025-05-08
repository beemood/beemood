import { FindOneById } from './find-one-by-id.js';

describe('FindOneById', () => {
  it('should work', () => {
    class Sample {}

    class Controller {
      @FindOneById({ responseType: () => Sample })
      method() {
        return {};
      }
    }
  });
});
