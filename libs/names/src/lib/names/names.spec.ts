import { names } from './names.js';

describe('names - create all name versions', () => {
  it('should create names with NO options', async () => {
    const N = names('ab c');
    expect(N.camelCase).toEqual('abC');
    expect(N.constCase).toEqual('AB_C');
    expect(N.dotCase).toEqual('ab.c');
    expect(N.kebabCase).toEqual('ab-c');
    expect(N.pascalCase).toEqual('AbC');
    expect(N.titleCase).toEqual('Ab C');
    expect(N.sentenceCase).toEqual('Ab c');

    expect(N.moduleName).toEqual('AbCModule');
    expect(N.serviceName).toEqual('AbCService');
    expect(N.controllerName).toEqual('AbCController');
    expect(N.optionsName).toEqual('AbCOptions');
    expect(N.modelName).toEqual('AbCModel');
    expect(N.createDtoName).toEqual('CreateAbCDto');
    expect(N.updateDtoName).toEqual('UpdateAbCDto');
    expect(N.queryDtoName).toEqual('QueryAbCDto');
  });

  it('should create names with prefix', async () => {
    const N = names('ab c', { prefix: 'SO' });
    expect(N.camelCase).toEqual('SOabC');
    expect(N.constCase).toEqual('SOAB_C');
    expect(N.dotCase).toEqual('SOab.c');
    expect(N.kebabCase).toEqual('SOab-c');
    expect(N.pascalCase).toEqual('SOAbC');
    expect(N.titleCase).toEqual('SOAb C');
    expect(N.sentenceCase).toEqual('SOAb c');
    expect(N.moduleName).toEqual('SOAbCModule');
    expect(N.serviceName).toEqual('SOAbCService');
    expect(N.controllerName).toEqual('SOAbCController');
    expect(N.optionsName).toEqual('SOAbCOptions');
    expect(N.modelName).toEqual('SOAbCModel');
    expect(N.createDtoName).toEqual('SOCreateAbCDto');
    expect(N.updateDtoName).toEqual('SOUpdateAbCDto');
    expect(N.queryDtoName).toEqual('SOQueryAbCDto');
  });

  it('should create names with suffix', async () => {
    const N = names('ab c', { suffix: 'SO' });
    expect(N.camelCase).toEqual('abCSO');
    expect(N.constCase).toEqual('AB_CSO');
    expect(N.dotCase).toEqual('ab.cSO');
    expect(N.kebabCase).toEqual('ab-cSO');
    expect(N.pascalCase).toEqual('AbCSO');
    expect(N.titleCase).toEqual('Ab CSO');
    expect(N.sentenceCase).toEqual('Ab cSO');
    expect(N.moduleName).toEqual('AbCModuleSO');
    expect(N.serviceName).toEqual('AbCServiceSO');
    expect(N.controllerName).toEqual('AbCControllerSO');
    expect(N.optionsName).toEqual('AbCOptionsSO');
    expect(N.modelName).toEqual('AbCModelSO');
    expect(N.createDtoName).toEqual('CreateAbCDtoSO');
    expect(N.updateDtoName).toEqual('UpdateAbCDtoSO');
    expect(N.queryDtoName).toEqual('QueryAbCDtoSO');
  });

  it('should create names with wrapper', async () => {
    const N = names('ab c', { wrapper: '|' });
    expect(N.camelCase).toEqual('|abC|');
    expect(N.constCase).toEqual('|AB_C|');
    expect(N.dotCase).toEqual('|ab.c|');
    expect(N.kebabCase).toEqual('|ab-c|');
    expect(N.pascalCase).toEqual('|AbC|');
    expect(N.titleCase).toEqual('|Ab C|');
    expect(N.sentenceCase).toEqual('|Ab c|');
    expect(N.moduleName).toEqual('|AbCModule|');
    expect(N.serviceName).toEqual('|AbCService|');
    expect(N.controllerName).toEqual('|AbCController|');
    expect(N.optionsName).toEqual('|AbCOptions|');
    expect(N.modelName).toEqual('|AbCModel|');
    expect(N.createDtoName).toEqual('|CreateAbCDto|');
    expect(N.updateDtoName).toEqual('|UpdateAbCDto|');
    expect(N.queryDtoName).toEqual('|QueryAbCDto|');
  });
});
