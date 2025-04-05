import { isNotThen } from './is-not-then.js';

describe('isNotThen: if the value is defiend then run the handler or run else handler', () => {
  it('should run the handler when the value is undefined', () => {
    const handler = vi.fn();
    const elseHandler = vi.fn();

    const param = 0;
    isNotThen(param, handler, elseHandler);

    expect(elseHandler).toHaveBeenCalledWith(0);
    expect(elseHandler).toHaveBeenCalledOnce();
    expect(handler).not.toHaveBeenCalled();
  });

  it('shoul run the else handler if the value is defined', () => {
    const handler = vi.fn();
    const elseHandler = vi.fn();
    {
      const param = undefined;
      isNotThen(param, handler, elseHandler);
    }

    {
      const param = null;
      isNotThen(param, handler, elseHandler);
    }

    expect(handler).toHaveBeenCalledTimes(2);
    expect(elseHandler).not.toHaveBeenCalled();
  });
});
