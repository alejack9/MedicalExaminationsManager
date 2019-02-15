import { Module } from '@nestjs/common';
import { NotificatorController } from './notificator.controller';
import { NotificatorService } from './notificator.service';

@Module({
  controllers: [NotificatorController],
  providers: [NotificatorService]
})
export class NotificatorModule {}
