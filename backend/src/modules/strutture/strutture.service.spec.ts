import { Test, TestingModule } from '@nestjs/testing';
import { StruttureService } from './strutture.service';

describe('StruttureService', () => {
  let service: StruttureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StruttureService],
    }).compile();

    service = module.get<StruttureService>(StruttureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
