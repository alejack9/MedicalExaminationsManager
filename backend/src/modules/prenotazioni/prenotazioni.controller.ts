import { Controller, Get, Body, Render, Param } from '@nestjs/common';
import { DottoriService } from './dottori.service';
import * as moment from 'moment';
import { Types } from 'mongoose';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(private readonly dottoriService: DottoriService) {}

  @Get('prenota/:id')
  @Render('date')
  async prenota(
    @Body() dettagliVisita: { tipo: string; minuti: number },
    @Param('id') hospitalId: string,
  ) {
    const toReturn = new Array<Date>();
    const durata = dettagliVisita.minuti;
    let data = moment(Date.now()).add(1, 'day');
    while (toReturn.length < 7) {
      const docs = await this.dottoriService.getDottori(
        hospitalId,
        dettagliVisita.tipo,
        data,
      );
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
          // 8 = minuti che intercorrono tra 2 visite consecutive per far contenta buru (doveva essere 10)
          const visiteEffettuabili = Math.floor(minutesOfWork / (8 + durata));
          const prenotazioni = await this.dottoriService.getPrenotazioni(
            doc._id,
            orario.inizio,
            orario.fine,
          );
          if (prenotazioni.length < visiteEffettuabili) {
            toReturn.push(
              data
                .startOf('day')
                .add(orario.inizio.getHours(), 'hours')
                .add(orario.inizio.getMinutes(), 'minutes')
                .add(prenotazioni.length * dettagliVisita.minuti, 'minutes')
                .toDate(),
            );
          }
        }
      }
      data = moment(data).add(1, 'days');
    }
    return {
      date: toReturn,
    };
  }
}
