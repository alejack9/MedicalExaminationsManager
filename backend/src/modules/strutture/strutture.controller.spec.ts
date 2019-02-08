import { Test, TestingModule } from '@nestjs/testing';
import { StruttureController } from './strutture.controller';

describe('Strutture Controller', () => {
  let controller: StruttureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StruttureController],
    }).compile();

    controller = module.get<StruttureController>(StruttureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
