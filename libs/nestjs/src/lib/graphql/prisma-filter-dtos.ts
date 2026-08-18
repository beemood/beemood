import { Prop } from '@beemood/prop/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class StringFilterDto {
  @Prop() equals?: string;
  @Prop() lt?: string;
  @Prop() lte?: string;
  @Prop() gt?: string;
  @Prop() gte?: string;
  @Prop() contains?: string;
  @Prop() startsWith?: string;
  @Prop() endsWith?: string;
  @Prop({ enum: ['default', 'insensitive'] }) mode?: string;

  @Prop({ type: () => String, isArray: true }) in?: string[];
  @Prop({ type: () => String, isArray: true }) notIn?: string[];
  @Prop() not?: StringFilterDto;
}

@InputType()
export class IntFilterDto {
  @Prop() equals?: number;
  @Prop() lt?: number;
  @Prop() lte?: number;
  @Prop() gt?: number;
  @Prop() gte?: number;
  @Prop({ type: () => Number, isArray: true }) in?: number[];
  @Prop({ type: () => Number, isArray: true }) notIn?: number[];
  @Prop({ type: () => IntFilterDto }) not?: IntFilterDto;
}

@InputType()
export class DateFilterDto {
  @Prop() equals?: string;
  @Prop() lt?: string;
  @Prop() lte?: string;
  @Prop() gt?: string;
  @Prop() gte?: string;
  @Prop({ type: () => String, isArray: true }) in?: string[];
  @Prop({ type: () => String, isArray: true }) notIn?: string[];
  @Prop({ type: () => DateFilterDto }) not?: DateFilterDto;
}

@InputType()
export class BooleanFilterDto {
  @Prop() equals?: boolean;
  @Prop({ type: () => BooleanFilterDto }) not?: BooleanFilterDto;
}
