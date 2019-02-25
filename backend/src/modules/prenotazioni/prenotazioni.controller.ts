import { Controller, Get, Body, Render, Param, Query } from '@nestjs/common';
import { DottoriService } from './dottori.service';
import * as moment from 'moment';
import { Types } from 'mongoose';
import { PrenotazioniService } from './prenotazioni.service';
import { RicetteService } from '../ricette/ricette.service';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(
    private readonly dottoriService: DottoriService,
    private readonly prenotazioniService: PrenotazioniService,
    private readonly ricetteService: RicetteService,
  ) {}

  @Get('prenota/:id')
  @Render('date')
  async prenota(
    @Query('tipoVisita') tipoVisita: string,
    @Query('durataVisita') durataVisita: any,
    @Param('id') hospitalId: string,
  ) {
    durataVisita = Number.parseInt(durataVisita, 10);
    const toReturn = new Array<{ data: Date; dottore: Types.ObjectId }>();
    let data = moment(Date.now()).add(1, 'day');
    while (toReturn.length < 7) {
      const docs = await this.dottoriService.getDottori(
        hospitalId,
        tipoVisita,
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
          const visiteEffettuabili = Math.floor(
            minutesOfWork / (8 + durataVisita),
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
                .add(prenotazioni.length * durataVisita, 'minutes')
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
      ]),
    };
  }

  @Get('creaPrenotazione/:id')
  async sendHelp(
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
    this.ricetteService.disabilitaRicetta(Types.ObjectId(ricettaId));
    return toReturn;
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
