import { Test, TestingModule } from '@nestjs/testing';
import { RicetteService } from './ricette.service';

describe('RicetteService', () => {
  let service: RicetteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RicetteService],
    }).compile();

    service = module.get<RicetteService>(RicetteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
