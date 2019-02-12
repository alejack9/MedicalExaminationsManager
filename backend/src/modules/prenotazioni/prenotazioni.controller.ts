import { Controller, Get, Body, Render, Param } from '@nestjs/common';
import { DottoriService } from './dottori.service';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';
import * as moment from 'moment';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(private readonly dottoriService: DottoriService) {}

  @Get('prenota/:id')
  async prenota(@Body() tipo: TipoVisita, @Param('id') hospitalId: string) {
    return await this.dottoriService.getDottori(hospitalId, tipo);
    // TODO da finire
    const durata = tipo.durataVisita;
    for (const doc of docs) {
      for (const orario of doc.orari) {
        const minutesOfWork = moment(orario.fine).diff(
          moment(orario.inizio),
          'minutes',
        );
        const visiteEffettuabili = Math.floor(minutesOfWork / durata);
      }
    }
  }
}
