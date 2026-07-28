export function printCommonDto() {
  return `
@Dto()
export class NumberFilterDto implements C.IntFilter {
  @Prop() equals?: number;
  @Prop({ type: () => Number }) in?: number[];
  @Prop({ type: () => Number }) notIn?: number[];
  @Prop() lt?: number;
  @Prop() lte?: number;
  @Prop() gt?: number;
  @Prop() gte?: number;
  @Prop() not?: number;
}

@Dto()
export class StringFilterDto implements C.StringFilter {
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


@Dto()
export class DateFilterDto implements C.DateTimeFilter {
  @Prop() equals?: Date;
  @Prop({ type: () => Date }) in?: Date[];
  @Prop({ type: () => Date }) notIn?: Date[];
  @Prop() lt?: Date;
  @Prop() lte?: Date;
  @Prop() gt?: Date;
  @Prop() gte?: Date;
  @Prop() not?: Date;
}

@Dto()
export class BooleanFilterDto implements C.BoolNullableFilter {
  @Prop() equals?: boolean;
  @Prop() not?: boolean;
}


    `.trim();
}
