import { switchCase } from './switch-case.js';

describe('SwitchCase: switch case statement', () => {
  it('should check and guard used cases', () => {
    type Value = 1 | 2 | 3 | 4 | 5;
    const value: Value = 5 as Value;

    const some = vi.fn();

    switchCase(value)
      .def(5, some)
      .def(1, some)
      .def(2, some)
      .def(3, some)
      .def(4, some);

    expect(some).toHaveBeenCalledOnce();
  });
});
