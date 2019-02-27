import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { DottoriService } from './dottori.service';
import * as moment from 'moment';
import { Types } from 'mongoose';
import { PrenotazioniService } from './prenotazioni.service';
import { RicettaService } from '../ricetta/ricetta.service';
import { TipoVisitaService } from './tipoVisita.service';
import { PatientService } from '../patient/patient.service';
import { NotificationService } from '../notificator/notification.service';

@Controller('prenotazioni')
export class PrenotazioniController {
  // 8 = minuti che intercorrono tra 2 visite consecutive per far contenta buru (doveva essere 10)
  private readonly MINUTI_TRA_VISITE = 8;
  constructor(
    private readonly dottoriService: DottoriService,
    private readonly prenotazioniService: PrenotazioniService,
    private readonly ricettaService: RicettaService,
    private readonly tipoVisitaService: TipoVisitaService,
    private readonly notificationService: NotificationService,
    private readonly patientService: PatientService,
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
          const visiteEffettuabili = await this.calcolaMaxVisiteEffettuabili(
            orario,
            tipoVisitaObj,
          );
          const prenotazioni = await this.dottoriService.getPrenotazioni(
            doc._id,
            data
              .startOf('day')
              .add(orario.inizio.getHours(), 'hours')
              .add(orario.inizio.getMinutes(), 'minutes')
              .toDate(),
            data
              .startOf('day')
              .add(orario.fine.getHours(), 'hours')
              .add(orario.fine.getMinutes(), 'minutes')
              .toDate(),
          );
          if (prenotazioni.length < visiteEffettuabili) {
            toReturn.push({
              data: data
                .startOf('day')
                .add(orario.inizio.getHours(), 'hours')
                .add(orario.inizio.getMinutes(), 'minutes')
                .add(
                  prenotazioni.length *
                    (this.MINUTI_TRA_VISITE + tipoVisitaObj.minutiVisita),
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

  async calcolaMaxVisiteEffettuabili(orario, tipoVisitaObj) {
    const minutesOfWork = moment(orario.fine).diff(
      moment(orario.inizio),
      'minutes',
    );
    return Math.floor(
      minutesOfWork / (this.MINUTI_TRA_VISITE + tipoVisitaObj.minutiVisita),
    );
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

  @Get('cancella/:idPrenotazione')
  @Render('redirecter')
  async cancelReservation(
    @Param('idPrenotazione') idPrenotazione: string,
    @Query('idPaziente') patientId: string,
  ) {
    const prenotazione = await this.prenotazioniService.getPrenotazione(
      Types.ObjectId(idPrenotazione),
    );
    if (prenotazione.visita.pagata) {
      return {
        error:
          'La visita è già stata pagata e non può, perciò, essere annullata.',
        patientId,
      };
    }
    await this.prenotazioniService.annullaPrenotazione(prenotazione._id);
    await this.patientService.abbassaReputazione(
      prenotazione.visita.ricetta.paziente._id,
      prenotazione.data,
    );

    await this.associaPrenotazioneAnnullata(prenotazione);
    return {
      patientId,
    };
  }

  private async associaPrenotazioneAnnullata(prenotazione) {
    const daAssociare = await this.prenotazioniService.getPrenotazioneDaNotificare(
      prenotazione,
    );
    if (daAssociare) {
      this.notificationService.creaNotifica(
        daAssociare,
        'anticipo',
        prenotazione._id,
      );
    }
  }

  @Get('get/:idPaziente')
  @Render('prenotazioniVisite')
  async getPrenotazioniPaziente(
    @Param('idPaziente') patientId: string,
    @Query('dataInizio')
    dataInizio: string = moment(Date.now())
      .startOf('year')
      .toISOString(),
    @Query('dataFine')
    dataFine: string = moment(Date.now())
      .endOf('year')
      .toISOString(),
  ) {
    const p = await this.prenotazioniService.getPrenotazioniPaziente(
      patientId,
      new Date(dataInizio),
      new Date(dataFine),
    );

    return {
      pED: p.map(v => [
        v.ricetta.tipoVisita.nome,
        v.struttura.nome,
        moment(v.visita.dataInizio).format('DD/MM/YYYY HH:mm'),
        v._id,
        v.referto ? v._id : undefined,
      ]),
      patientId,
    };
  }
}
