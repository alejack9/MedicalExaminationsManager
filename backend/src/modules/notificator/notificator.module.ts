import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificaSchema } from 'src/common/schemas/notifica.schema';
import { NotificationsController } from './notificator.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificaSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationService],
})
export class NotificatorModule {}
