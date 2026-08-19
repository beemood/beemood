import { PropValidation as Prop } from '@beemood/prop-validation';

export class FieldAnnotationsDto {
  @Prop({ default: false }) required: boolean;
  @Prop({ default: false }) include: boolean;
  @Prop({ default: false }) internal: boolean;
  @Prop({ default: false }) readonly: boolean;
  @Prop({ default: false }) writeonly: boolean;
  @Prop({ default: false }) hash: boolean;
  @Prop({ default: false }) encript: boolean;

  @Prop() format?: string;
  @Prop() minLength?: number;
  @Prop() maxLength?: number;
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() minItems?: number;
  @Prop() maxItems?: number;
  @Prop({ isArray: true }) isIn?: (string | number | boolean)[];
  @Prop({ isArray: true }) isNotIn?: (string | number | boolean)[];
  @Prop({ type: () => RegExp }) pattern?: RegExp;
  @Prop() defaultValue?: any;
}
