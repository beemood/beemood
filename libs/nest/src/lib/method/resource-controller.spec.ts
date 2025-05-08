import { ResourceController } from './resource-controller.js';

describe('ResourceController', () => {
  it('should work', () => {
    class Sample {}

    @ResourceController('samples')
    class Controller {
      method() {
        return {};
      }
    }
  });
});
