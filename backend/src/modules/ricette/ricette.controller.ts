import { Controller, Get, Param, Render } from '@nestjs/common';
import { RicetteService } from './ricette.service';
import { Types } from 'mongoose';

@Controller('ricette')
export class RicetteController {
  constructor(private readonly ricetteService: RicetteService) {}

  @Get('listaRicette/:idPaziente')
  @Render('ricette')
  async getLista(@Param('idPaziente') idPaziente: string) {
    const r = await this.ricetteService.getLista(
      new Types.ObjectId(idPaziente),
    );
    return {
      ricette: r,
    };
  }
}
