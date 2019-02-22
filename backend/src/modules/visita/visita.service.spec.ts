import { Test, TestingModule } from '@nestjs/testing';
import { VisitaService } from './visita.service';

describe('VisitaService', () => {
  let service: VisitaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitaService],
    }).compile();

    service = module.get<VisitaService>(VisitaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
