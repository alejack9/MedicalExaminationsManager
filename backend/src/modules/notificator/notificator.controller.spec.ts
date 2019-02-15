import { Test, TestingModule } from '@nestjs/testing';
import { NotificatorController } from './notificator.controller';

describe('Notificator Controller', () => {
  let controller: NotificatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificatorController],
    }).compile();

    controller = module.get<NotificatorController>(NotificatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
