import { Test, TestingModule } from '@nestjs/testing';
import { NotificatorService } from './notificator.service';

describe('NotificatorService', () => {
  let service: NotificatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificatorService],
    }).compile();

    service = module.get<NotificatorService>(NotificatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
