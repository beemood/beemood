import { joinLines } from '../../common/join-lines.js';
import { CommonDtoClassNames } from '../../common/types.js';

export const __stringFilterDto = () => {
  return `
    export class ${CommonDtoClassNames.StringFilterDto}  {
      @Prop() equals?: string;
      @Prop({ type: () => String }) in?: string[];
      @Prop({ type: () => String }) notIn?: string[];
      @Prop() lt?: string;
      @Prop() lte?: string;
      @Prop() gt?: string;
      @Prop() gte?: string;
      @Prop() contains?: string;
      @Prop() startsWith?: string;
      @Prop() endsWith?: string;
      @Prop({ isIn: ['default', 'insensitive'] }) mode?: P.Prisma.QueryMode;
      @Prop() not?: string;
    }
  `;
};

export const __numberFilterDto = () => {
  return `
    export class ${CommonDtoClassNames.NumberFilterDto} {
      @Prop() equals?: number;
      @Prop({ type: () => Number }) in?: number[];
      @Prop({ type: () => Number }) notIn?: number[];
      @Prop() lt?: number;
      @Prop() lte?: number;
      @Prop() gt?: number;
      @Prop() gte?: number;
      @Prop() not?: number;
    }
  `;
};
export const __dateFilterDto = () => {
  return ` 
    export class ${CommonDtoClassNames.DateFilterDto}   {
      @Prop() equals?: Date;
      @Prop({ type: () => Date }) in?: Date[];
      @Prop({ type: () => Date }) notIn?: Date[];
      @Prop() lt?: Date;
      @Prop() lte?: Date;
      @Prop() gt?: Date;
      @Prop() gte?: Date;
      @Prop() not?: Date;
    }
`;
};

export const __booleanFilter = () => {
  return `
    export class ${CommonDtoClassNames.BooleanFilterDto}   {
      @Prop() equals?: boolean;
      @Prop() not?: boolean;
    }
`;
};

export function printCommonDto(
  classDecoratorName: 'Dto' | 'ObjectDto' | 'InputDto',
) {
  return joinLines(
    [
      __stringFilterDto(),
      __numberFilterDto(),
      __booleanFilter(),
      __dateFilterDto(),
    ].map((content) => joinLines([`@${classDecoratorName}()`, content])),
  );
}
