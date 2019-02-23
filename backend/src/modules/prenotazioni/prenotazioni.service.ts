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

  // tslint:disable-next-line:no-empty
  async cancelBooking(prenotazioneId: ObjectId) {
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

    this.patientService.abbassaReputazione(
      pren[0].visita.ricetta.paziente,
      pren[0].visita.dataInizio,
    );

    this.associaPrenotazione(pren[0]);

    // this.visitaService.annulla(prenotazioneId, false);
  }

  async associaPrenotazione(prenotazione: any) {
    const listaPrenotazioni = await this.getListaPrenotazioni(prenotazione);
    let prenotazioni;
    let pren;

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

    if (listaPrenotazioni.length > 1) {
      prenotazioni = this.filtraMaxPriorita(listaPrenotazioni);
      if (prenotazioni.length > 1) {
        prenotazioni = this.filtraMaxReputazione(prenotazioni);
        if (prenotazioni.length > 1) {
          pren = this.filtraDataPiuLontana(prenotazioni);
        } else {
          pren = prenotazioni[0];
        }
      } else {
        pren = prenotazioni[0];
      }
    } else {
      pren = listaPrenotazioni[0];
    }

    console.log('prenotazione ' + pren);
    this.notificator.creaNotifica(
      pren,
      pren.visita.dataInizio,
      TipoNotifica.anticipo,
    );
  }

  // la funzione restituisce un array di prenotazioni con la stessa priorità
  filtraMaxPriorita(prenotazioni: any) {
    const pren = new Array();

    this.riordinaPriorita(prenotazioni);

    prenotazioni.forEach((element, index) => {
      const value = element.visita.ricetta.priorita;

      const j = index + 1;

      pren.push(prenotazioni[0]);
      while (j >= 0 && element[j].visita.ricetta.priorita === value) {
        pren.push(element);
      }

      // index = prenotazioni.length;
      // console.log('index: ' + index);
      return pren;
    });
  }

  filtraMaxReputazione(prenotazioni: any) {
    this.riordinaReputazione(prenotazioni);

    const pren: IPrenotazione[] = new Array();
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
      console.log('index: ' + index);
    });
    return pren;
  }

  // metodo per filtrare la data più lontana
  filtraDataPiuLontana(prenotazioni: IPrenotazione[]): IPrenotazione {
    let pren: IPrenotazione;
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

  riordinaPriorita(prenotazioni: any) {
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

  riordinaReputazione(prenotazioni: IPrenotazione[]) {
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
    const prenotazioni = new Array();

    const tipoVisita = prenotazione.visita.ricetta.tipoVisita;
    const struttura = prenotazione.struttura;
    const data = prenotazione.visita.dataInizio;

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
      if (
        element.visita.ricetta.tipoVisita === tipoVisita &&
        !element._id.equals(prenotazione._id)
      ) {
        if (element.struttura.equals(struttura)) {
          if (
            element.visita.dataInizio.getDate() === data.getDate() &&
            element.visita.dataInizio.getMonth() === data.getMonth()
          ) {
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
