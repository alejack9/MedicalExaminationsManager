import { Module } from '@nestjs/common';
import { NotificatorService } from './notificator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificaSchema } from 'src/common/schemas/notifica.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificaSchema },
    ]),
  ],
  controllers: [],
  providers: [NotificatorService],
})
export class NotificatorModule {}
