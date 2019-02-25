import { Controller, Get, Render, Query } from '@nestjs/common';
import { StruttureService } from './strutture.service';

@Controller('strutture')
export class StruttureController {
  constructor(private readonly struttureService: StruttureService) {}
  @Get()
  @Render('strutture')
  async getStrutture(
    @Query('tipoVisita') pTipoVisita: string,
    @Query('durataVisita') durataVisita: any,
  ) {
    durataVisita = Number.parseInt(durataVisita, 10);
    return {
      strutture: await this.struttureService.findStrutture(pTipoVisita),
      dettagli: {
        tipoVisita: pTipoVisita,
        durataVisita,
      },
    };
  }
}
