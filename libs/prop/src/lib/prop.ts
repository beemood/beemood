import { PropOptions, PropType } from '@beemood/types';

export function Prop(options?: PropOptions): PropertyDecorator {
  return () => {
    if (options?.__type)
      switch (options?.__type) {
        case PropType.String: {
          break;
        }
        case PropType.Number: {
          break;
        }
        case PropType.Boolean: {
          break;
        }
        case PropType.Object: {
          break;
        }
        case PropType.Array: {
          break;
        }
        default: {
          throw new Error('Only none array types allowed');
        }
      }
  };
}
