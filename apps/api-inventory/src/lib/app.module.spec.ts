import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module.js';
describe('App Module', () => {
  let app: TestingModule;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should initialize', () => {
    expect(app).toBeDefined();
  });
});
