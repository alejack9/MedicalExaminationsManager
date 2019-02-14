import { Controller, Get, Body, Render, Param } from '@nestjs/common';
import { DottoriService } from './dottori.service';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';
import * as moment from 'moment';
import { Types } from 'mongoose';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(private readonly dottoriService: DottoriService) {}

  @Get('prenota/:id')
  async prenota(@Body() tipo: TipoVisita, @Param('id') hospitalId: string) {
    const date = new Array<Date>();
    const durata = tipo.minutiVisita;
    let data = moment(Date.now()).add(1, 'day');
    while (date.length < 7) {
      const docs = await this.dottoriService.getDottori(hospitalId, tipo, data);
      for (const doc of docs) {
        for (const orario of doc.orari.filter(
          o =>
            o.struttura.equals(Types.ObjectId(hospitalId)) &&
            o.indiceGiornoSettimana === data.weekday(),
        )) {
          const minutesOfWork = moment(orario.fine).diff(
            moment(orario.inizio),
            'minutes',
          );
          // 8 = minuti che intercorrono tra 2 visite consecutive secondo buru
          const visiteEffettuabili = Math.floor(minutesOfWork / (8 + durata));
          const prenotazioni = await this.dottoriService.getPrenotazioni(
            doc._id,
            orario.inizio,
            orario.fine,
          );
          if (prenotazioni.length < visiteEffettuabili) {
            date.push(
              data
                .add(prenotazioni.length * tipo.minutiVisita, 'minutes')
                .toDate(),
            );
          }
        }
      }
      data = moment(data).add(1, 'days');
    }
    return date;
  }
}
