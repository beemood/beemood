import { FindAll } from './find-all.js';

describe('FindAll', () => {
  it('should work', () => {
    class Sample {}

    class Controller {
      @FindAll({ responseType: () => Sample })
      method() {
        return {};
      }
    }
  });
});
