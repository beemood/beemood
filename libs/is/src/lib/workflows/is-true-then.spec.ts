import { isTrueThen } from './is-true-then.js';

describe('isTrueThen: if the value is true then run the handler or run else handler', () => {
  it('should run the handler when the value is true', () => {
    const handler = vi.fn();
    const elseHandler = vi.fn();

    const param = true;
    isTrueThen(param, handler, elseHandler);

    expect(handler).toHaveBeenCalledWith(0);
    expect(handler).toHaveBeenCalledOnce();
    expect(elseHandler).not.toHaveBeenCalled();
  });

  it('shoul run the else handler if the value is undefined', () => {
    const handler = vi.fn();
    const elseHandler = vi.fn();
    {
      const param = undefined;
      isTrueThen(param, handler, elseHandler);
    }

    {
      const param = null;
      isTrueThen(param, handler, elseHandler);
    }

    expect(elseHandler).toHaveBeenCalledTimes(2);
    expect(handler).not.toHaveBeenCalled();
  });
});
