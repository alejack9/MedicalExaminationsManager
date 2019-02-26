import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { DottoriService } from './dottori.service';
import * as moment from 'moment';
import { Types } from 'mongoose';
import { PrenotazioniService } from './prenotazioni.service';
import { RicettaService } from '../ricetta/ricetta.service';
import { ObjectId } from 'bson';
import { TipoVisitaService } from './tipoVisita.service';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(
    private readonly dottoriService: DottoriService,
    private readonly prenotazioniService: PrenotazioniService,
    private readonly ricettaService: RicettaService,
    private readonly tipoVisitaService: TipoVisitaService,
  ) {}

  @Get('prenota/:id')
  @Render('date')
  async prenota(
    @Param('id') hospitalId: string,
    @Query('paziente') paziente: string,
    @Query('ricetta') ricetta: string,
    @Query('tipoVisita') tipoVisita: string,
  ) {
    const tipoVisitaObj = await this.tipoVisitaService.getTipoVisita(
      Types.ObjectId(tipoVisita),
    );
    const toReturn = new Array<{ data: Date; dottore: Types.ObjectId }>();
    let data = moment(Date.now()).add(1, 'day');
    while (toReturn.length < 7) {
      const docs = await this.dottoriService.getDottori(
        hospitalId,
        Types.ObjectId(tipoVisita),
        data,
      );
      for (const doc of docs) {
        for (const orario of doc.orari) {
          const minutesOfWork = moment(orario.fine).diff(
            moment(orario.inizio),
            'minutes',
          );
          // 8 = minuti che intercorrono tra 2 visite consecutive per far contenta buru (doveva essere 10)
          const visiteEffettuabili = Math.floor(
            minutesOfWork / (8 + tipoVisitaObj.minutiVisita),
          );
          const prenotazioni = await this.dottoriService.getPrenotazioni(
            doc._id,
            orario.inizio,
            orario.fine,
          );
          if (prenotazioni.length < visiteEffettuabili) {
            toReturn.push({
              data: data
                .startOf('day')
                .add(orario.inizio.getHours(), 'hours')
                .add(orario.inizio.getMinutes(), 'minutes')
                .add(
                  prenotazioni.length * tipoVisitaObj.minutiVisita,
                  'minutes',
                )
                .toDate(),
              dottore: doc._id,
            });
          }
        }
      }
      data = moment(data).add(1, 'days');
    }
    return {
      ospedale: hospitalId,
      docEDate: toReturn.map(d => [
        d.dottore,
        d.data,
        moment(d.data).format('DD/MM/YYYY HH:mm'),
        ricetta,
        paziente,
      ]),
    };
  }

  @Get('crea/:id')
  async creaPrenotazione(
    @Param('id') hospitalId: string,
    @Query('ricetta') ricettaId: string,
    @Query('data') data: string,
    @Query('medico') medicoId: string,
  ) {
    const toReturn = await this.prenotazioniService.creaPrenotazione(
      Types.ObjectId(ricettaId),
      Types.ObjectId(hospitalId),
      new Date(data),
      Types.ObjectId(medicoId),
    );
    this.ricettaService.disabilitaRicetta(Types.ObjectId(ricettaId));
    return toReturn;
  }

  @Get('cancella/:id')
  cancelReservation(@Param('id') id: string) {
    this.prenotazioniService.cancelBooking(new ObjectId(id));
  }

  @Get('getPrenotazioni/:idPaziente')
  @Render('prenotazioniVisite')
  async getPrenotazioniPaziente(
    @Param('idPaziente') patientId: string,
    @Query('dataInizio') dataInizio: string,
    @Query('dataFine') dataFine: string,
  ) {
    const p = await this.prenotazioniService.getPrenotazioniPaziente(
      patientId,
      new Date(dataInizio),
      new Date(dataFine),
    );

    return {
      pED: p.map(v => [
        v.ricetta.tipoVisita,
        v.struttura.nome,
        moment(v.visita.dataInizio).format('DD/MM/YYYY HH:mm'),
      ]),
    };
  }
}
