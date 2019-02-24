import { Module } from '@nestjs/common';
import { NotificatorController } from './notificator.controller';
import { NotificatorService } from './notificator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificaSchema } from 'src/common/schemas/notifica.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificaSchema },
    ]),
  ],
  controllers: [NotificatorController],
  providers: [NotificatorService],
})
export class NotificatorModule {}
