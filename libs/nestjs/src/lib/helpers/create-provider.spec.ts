import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createProvider } from './create-provider.js';

describe('createValueProvider', () => {
  const value = 'sample';
  const {
    inject: InjectSample,
    token: getSampleToken,
    provideValue: provideSampleValue,
    provideFactory: provideSampleFactory,
  } = createProvider('sample-value');

  describe('should provide value', () => {
    let sampleModule: TestingModule;
    let sampleServcie: SampleService;
    @Injectable()
    class SampleService {
      constructor(@InjectSample() public readonly value: string) {}
    }
    beforeAll(async () => {
      sampleModule = await Test.createTestingModule({
        providers: [provideSampleValue(value), SampleService],
      }).compile();

      sampleServcie = sampleModule.get(SampleService);
    });

    it('should provide the sample value', () => {
      expect(sampleModule.get(getSampleToken())).toEqual(value);
    });

    it('should inject the sample value ', () => {
      expect(sampleServcie.value).toEqual(value);
    });
  });

  describe('should provide value factory', () => {
    let sampleModule: TestingModule;
    let sampleServcie: SampleService;
    @Injectable()
    class SampleService {
      constructor(@InjectSample() public readonly value: string) {}
    }
    beforeAll(async () => {
      sampleModule = await Test.createTestingModule({
        providers: [provideSampleFactory(() => value, []), SampleService],
      }).compile();

      sampleServcie = sampleModule.get(SampleService);
    });

    it('should provide the sample value', () => {
      expect(sampleModule.get(getSampleToken())).toEqual(value);
    });

    it('should inject the sample value ', () => {
      expect(sampleServcie.value).toEqual(value);
    });
  });
});
