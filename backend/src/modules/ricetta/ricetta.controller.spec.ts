import { Test, TestingModule } from '@nestjs/testing';
import { RicettaController } from './ricetta.controller';

describe('Ricetta Controller', () => {
  let controller: RicettaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RicettaController],
    }).compile();

    controller = module.get<RicettaController>(RicettaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
