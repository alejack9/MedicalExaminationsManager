import { Controller, Get, Render, Query } from '@nestjs/common';
import { StruttureService } from './strutture.service';
import { Types } from 'mongoose';

@Controller('strutture')
export class StruttureController {
  constructor(private readonly struttureService: StruttureService) {}
  @Get()
  @Render('strutture')
  async getStrutture(
    @Query('tipoVisita') tipoVisita: string,
    @Query('paziente') paziente: any,
    @Query('ricetta') ricetta: any,
  ) {
    const strutture = await this.struttureService.findStrutture(
      Types.ObjectId(tipoVisita),
    );
    return {
      strutture,
      dettagli: {
        tipoVisita,
        paziente,
        ricetta,
      },
    };
  }
}
