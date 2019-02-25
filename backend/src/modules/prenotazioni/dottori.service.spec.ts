import { Test, TestingModule } from '@nestjs/testing';
import { DottoriService } from './dottori.service';

describe('DottoriService', () => {
  let service: DottoriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DottoriService],
    }).compile();

    service = module.get<DottoriService>(DottoriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
