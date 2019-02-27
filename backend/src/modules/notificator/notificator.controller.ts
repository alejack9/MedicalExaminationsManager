import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Types } from 'mongoose';

@Controller('prenotazioni')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/:idPaziente')
  async getNotifications(@Param('idPaziente') idPaziente: string) {
    this.notificationService.getNotifications(Types.ObjectId(idPaziente));
  }
}
