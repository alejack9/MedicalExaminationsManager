import { Controller, Get, Param, Render } from '@nestjs/common';
import { RicettaService } from './ricetta.service';
import { Types } from 'mongoose';

@Controller('ricetta')
export class RicettaController {
  constructor(private readonly ricettaService: RicettaService) {}

  @Get('listaRicette/:idPaziente')
  @Render('ricette')
  async getLista(@Param('idPaziente') idPaziente: string) {
    const r = await this.ricettaService.getLista(
      new Types.ObjectId(idPaziente),
    );
    return {
      ricette: r,
    };
  }
}
