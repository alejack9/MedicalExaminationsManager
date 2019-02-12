import { Test, TestingModule } from '@nestjs/testing';
import { RicettaService } from './ricetta.service';

describe('RicettaService', () => {
  let service: RicettaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RicettaService],
    }).compile();

    service = module.get<RicettaService>(RicettaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
