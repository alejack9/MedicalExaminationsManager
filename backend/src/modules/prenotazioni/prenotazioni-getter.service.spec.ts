import { Test, TestingModule } from '@nestjs/testing';
import { PrenotazioniGetterService } from './prenotazioni-getter.service';

describe('PrenotazioniGetterService', () => {
  let service: PrenotazioniGetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrenotazioniGetterService],
    }).compile();

    service = module.get<PrenotazioniGetterService>(PrenotazioniGetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
