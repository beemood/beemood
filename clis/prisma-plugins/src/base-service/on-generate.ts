import { type GeneratorOptions } from '@prisma/generator-helper';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;
  const datamodel = options.dmmf.datamodel;

  console.log('Output: ', output);
  console.log(
    'Models: ',
    datamodel.models.map((e) => e.name),
  );
}
