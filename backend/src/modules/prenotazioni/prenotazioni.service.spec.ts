import { Test, TestingModule } from '@nestjs/testing';
import { PrenotazioniService } from './prenotazioni.service';

describe('PrenotazioniService', () => {
  let service: PrenotazioniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrenotazioniService],
    }).compile();

    service = module.get<PrenotazioniService>(PrenotazioniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
