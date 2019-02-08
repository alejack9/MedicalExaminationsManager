import { Test, TestingModule } from '@nestjs/testing';
import { PrenotazioniController } from './prenotazioni.controller';

describe('Prenotazioni Controller', () => {
  let controller: PrenotazioniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrenotazioniController],
    }).compile();

    controller = module.get<PrenotazioniController>(PrenotazioniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
