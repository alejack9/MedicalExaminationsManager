import { Test, TestingModule } from '@nestjs/testing';
import { VisitaController } from './visita.controller';

describe('Visita Controller', () => {
  let controller: VisitaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitaController],
    }).compile();

    controller = module.get<VisitaController>(VisitaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
