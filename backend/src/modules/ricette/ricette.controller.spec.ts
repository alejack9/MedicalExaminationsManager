import { Test, TestingModule } from '@nestjs/testing';
import { RicetteController } from './ricette.controller';

describe('Ricette Controller', () => {
  let controller: RicetteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RicetteController],
    }).compile();

    controller = module.get<RicetteController>(RicetteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
