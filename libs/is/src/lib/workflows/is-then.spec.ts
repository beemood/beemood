import { isThen } from './is-then.js';

describe('isThen: if the value is defiend then run the handler or run else handler', () => {
  it('should run the handler when the value is defined', () => {
    const handler = vi.fn();
    const elseHandler = vi.fn();

    const param = 0;
    isThen(param, handler, elseHandler);

    expect(handler).toHaveBeenCalledWith(0);
    expect(handler).toHaveBeenCalledOnce();
    expect(elseHandler).not.toHaveBeenCalled();
  });

  it('shoul run the else handler if the value is undefined', () => {
    const handler = vi.fn();
    const elseHandler = vi.fn();
    {
      const param = undefined;
      isThen(param, handler, elseHandler);
    }

    {
      const param = null;
      isThen(param, handler, elseHandler);
    }

    expect(elseHandler).toHaveBeenCalledTimes(2);
    expect(handler).not.toHaveBeenCalled();
  });
});
