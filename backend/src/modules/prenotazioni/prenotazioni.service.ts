import { Injectable, Post } from '@nestjs/common';
import { Prenotazione } from '../../common/classes/prenotazione';
import { NotificatorService } from '../notificator/notificator.service';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';
import { PatientService } from '../patient/patient.service';
import { IPrenotazione } from 'src/common/interfaces/prenotazione.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { VisitaService } from 'src/modules/visita/visita.service';

@Injectable()
export class PrenotazioniService {
  constructor(
    @InjectModel('Reservation')
    private readonly prenotazioneModel: Model<IPrenotazione>,
    private readonly visitaService: VisitaService,
    private readonly patientService: PatientService,
    private readonly notificator: NotificatorService,
  ) {}

  async cancelBooking(prenotazioneId: ObjectId) {
    this.visitaService.annulla(prenotazioneId, false);

    const pren = await this.prenotazioneModel
      .aggregate([
        {
          $match: {
            _id: prenotazioneId,
          },
        },
        {
          $lookup: {
            from: 'examinations',
            localField: 'visita',
            foreignField: '_id',
            as: 'visita',
          },
        },
        {
          $unwind: {
            path: '$visita',
          },
        },
        {
          $lookup: {
            from: 'prescriptions',
            localField: 'visita.ricetta',
            foreignField: '_id',
            as: 'visita.ricetta',
          },
        },
        {
          $unwind: {
            path: '$visita.ricetta',
          },
        },
      ])
      .exec();

    console.log(
      '\n\n La ricetta è ' + JSON.stringify(pren[0].visita.ricetta.paziente),
    );

    this.patientService.abbassaReputazione(
      pren[0].visita.ricetta.paziente,
      pren[0].visita.dataInizio,
    );

    this.associaPrenotazione(pren);
  }

  async associaPrenotazione(prenotazione: any) {
    const listaPrenotazioni = await this.getListaPrenotazioni(prenotazione);
    let prenotazioni = await this.filtraMaxPriorita(listaPrenotazioni);

    // const patient = await this.prenotazioneModel
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: 'examinations',
    //         localField: 'visita',
    //         foreignField: '_id',
    //         as: 'visita',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$visita',
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'prescriptions',
    //         localField: 'visita.ricetta',
    //         foreignField: '_id',
    //         as: 'visita.ricetta',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$visita.ricetta',
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'patients',
    //         localField: 'visita.ricetta.paziente',
    //         foreignField: '_id',
    //         as: 'visita.ricetta.paziente',
    //       },
    //     },
    //   ])
    //   .exec();

    if (prenotazioni.length > 1) {
      prenotazioni = await this.filtraMaxReputazione(prenotazioni);
      if (prenotazioni.length > 1) {
        this.filtraDataPiuLontana(prenotazioni);
      }
    }

    this.notificator.creaNotifica(prenotazione, TipoNotifica.anticipo);
  }

  // la funzione restituisce un array di prenotazioni con la stessa priorità
  async filtraMaxPriorita(prenotazioni: Prenotazione[]) {
    const pren: Prenotazione[] = new Array();

    this.riordinaPriorita(prenotazioni);

    prenotazioni.forEach((element, index) => {
      const value = element.visita.ricetta.priorita;
      const j = index + 1;
      pren.push(prenotazioni[0]);
      while (j >= 0 && element[j].visita.ricetta.priorita === value) {
        pren.push(element);
      }

      index = prenotazioni.length;
    });
    return pren;
  }

  async filtraMaxReputazione(prenotazioni: any) {
    this.riordinaReputazione(prenotazioni);

    const pren: any = new Array();
    prenotazioni.forEach((element, index) => {
      const value = element.visita.ricetta.paziente.reputazione;
      const j = index + 1;
      pren.push(prenotazioni[0]);
      while (
        j >= 0 &&
        element[j].visita.ricetta.paziente.reputazione === value
      ) {
        pren.push(element);
      }

      index = prenotazioni.length;
    });
    return pren;
  }

  // metodo per filtrare la data più lontana
  filtraDataPiuLontana(prenotazioni: Prenotazione[]): Prenotazione {
    let pren: Prenotazione = new Prenotazione();
    prenotazioni.forEach((element, index) => {
      const value = element.data.getDate();
      const j = index + 1;
      const currentDate = new Date(Date.now());

      if (index === prenotazioni.length - 1) {
        return pren;
      } else {
        const diffData1 = value - currentDate.getDate();
        const diffData2 = element[j].data.getDate() - currentDate.getDate();
        if (diffData1 > diffData2) {
          pren = element;
        } else {
          pren = element[j];
        }
      }
    });
    return pren;
  }

  async riordinaPriorita(prenotazioni: Prenotazione[]) {
    prenotazioni.forEach((element, index) => {
      const value = element.visita.ricetta.priorita;

      let j = index - 1;

      while (j >= 0 && element[j].visita.ricetta.priorita > value) {
        element[j + 1] = element[j];
        j -= 1;
        element[j + 1] = value;
      }
    });
  }

  riordinaReputazione(prenotazioni: Prenotazione[]) {
    prenotazioni.forEach((element, index) => {
      const value = element.visita.ricetta.paziente.reputazione;
      let j = index - 1;
      while (j >= 0 && element[j].visita.ricetta.paziente.reputazione > value) {
        element[j + 1] = element[j];
        j -= 1;
        element[j + 1] = value;
      }
    });
  }

  async getListaPrenotazioni(prenotazione: any) {
    const prenotazioni: Prenotazione[] = new Array();

    const tipoVisita = prenotazione[0].visita.ricetta.tipoVisita;
    const struttura = prenotazione[0].struttura;
    const data = prenotazione[0].visita.dataInizio;

    const pren = await this.prenotazioneModel
      .aggregate([
        {
          $lookup: {
            from: 'examinations',
            localField: 'visita',
            foreignField: '_id',
            as: 'visita',
          },
        },
        {
          $unwind: {
            path: '$visita',
          },
        },
        {
          $lookup: {
            from: 'prescriptions',
            localField: 'visita.ricetta',
            foreignField: '_id',
            as: 'visita.ricetta',
          },
        },
        {
          $unwind: {
            path: '$visita.ricetta',
          },
        },
      ])
      .exec();

    pren.forEach(element => {
      if (element.visita.ricetta.tipoVisita === tipoVisita) {
        if (element.struttura === struttura) {
          if (element.visita.dataInizio === data) {
            prenotazioni.push(element);
          }
        }
      }
    });

    return prenotazioni;
    // console.log(tipoVisita);
    // console.log(struttura);
    // console.log(data);
  }
}
