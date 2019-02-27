import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Types } from 'mongoose';
import * as moment from 'moment';

@Controller('notifiche')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/:idPaziente')
  @Render('notifiche')
  async getNotifications(@Param('idPaziente') idPaziente: string) {
    return {
      notificheEDate: (await this.notificationService.getNotifications(
        Types.ObjectId(idPaziente),
      )).map(e => [e, moment(e.data).format('DD/MM/YYYY HH:mm')]),
    };
  }
}
