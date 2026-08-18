import { type DatamodelEnum } from '../../common/types.js';

export function printEnumFilterDto(enumModel: DatamodelEnum) {
  const modelName = enumModel.name;

  return `
@Dto()
export class Enum${modelName}FilterDto implements C.Enum${modelName}Filter {
  @Prop({ isIn: Object(P.${modelName}) }) equals?: P.${modelName};
  @Prop({ isIn: Object.keys(P.${modelName}) }) in?: P.${modelName}[];
  @Prop({ isIn: Object.keys(P.${modelName}) }) notIn?: P.${modelName}[];
  @Prop({ isIn: Object(P.${modelName}) }) not?: P.${modelName};
}

    `;
}
