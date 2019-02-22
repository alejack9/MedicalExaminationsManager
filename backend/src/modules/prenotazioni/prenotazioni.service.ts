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
  ) {}

  // tslint:disable-next-line:no-empty
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
      ])
      .exec();

    console.log(pren.visita.dataInizio);

    this.patientService.abbassaReputazione(
      pren.visita.ricetta.paziente,
      pren.visita.dataInizio,
    );

    // this.associaPrenotazione(pren);
  }

  // associaPrenotazione(prenotazione: any) {
  //   const listaPrenotazioni = this.getListaPrenotazioni(prenotazione);
  //   // let prenotazioni = this.filtraMaxPriorita(listaPrenotazioni);

  //   // if (prenotazioni.length > 1) {
  //   //   prenotazioni = this.filtraMaxReputazione(prenotazioni);
  //   //   if (prenotazioni.length > 1) {
  //   //     this.filtraDataPiuLontana(prenotazioni);
  //   //   }
  //   // }

  //   const notificator = new NotificatorService();
  //   notificator.creaNotifica(prenotazione, TipoNotifica.anticipo);
  // }

  // // la funzione restituisce un array di prenotazioni con la stessa priorità
  // filtraMaxPriorita(prenotazioni: Prenotazione[]): Prenotazione[] {
  //   this.riordinaPriorita(prenotazioni);
  //   const pren: Prenotazione[] = new Array();
  //   prenotazioni.forEach((element, index) => {
  //     const value = element
  //       .getVisita()
  //       .getRicetta()
  //       .getPriorita();
  //     const j = index + 1;
  //     pren.push(prenotazioni[0]);
  //     while (
  //       j >= 0 &&
  //       element[j]
  //         .getVisita()
  //         .getRicetta()
  //         .getPriorita() === value
  //     ) {
  //       pren.push(element);
  //     }

  //     index = prenotazioni.length;
  //   });
  //   return pren;
  // }

  // filtraMaxReputazione(prenotazioni: Prenotazione[]): Prenotazione[] {
  //   this.riordinaReputazione(prenotazioni);
  //   const pren: Prenotazione[] = new Array();
  //   prenotazioni.forEach((element, index) => {
  //     const value = element
  //       .getVisita()
  //       .getRicetta()
  //       .getPaziente()
  //       .getReputazione();
  //     const j = index + 1;
  //     pren.push(prenotazioni[0]);
  //     while (
  //       j >= 0 &&
  //       element[j]
  //         .getVisita()
  //         .getRicetta()
  //         .getPaziente()
  //         .getReputazione() === value
  //     ) {
  //       pren.push(element);
  //     }

  //     index = prenotazioni.length;
  //   });
  //   return pren;
  // }

  // // metodo per filtrare la data più lontana
  // // filtraDataPiuLontana(prenotazioni: Prenotazione[]): Prenotazione {
  // //   let pren: Prenotazione = new Prenotazione();
  // //   prenotazioni.forEach((element, index) => {
  // //     const value = element.getData().getDate();
  // //     const j = index + 1;
  // //     const currentDate = new Date();

  // //     if (index === prenotazioni.length - 1) {
  // //       return pren;
  // //     } else {
  // //       const diffData1 = value - currentDate.getDate();
  // //       const diffData2 =
  // //         element[j].getData().getDate() - currentDate.getDate();
  // //       if (diffData1 > diffData2) {
  // //         pren = element;
  // //       } else {
  // //         pren = element[j];
  // //       }
  // //     }
  // //   });
  // //   return pren;
  // // }

  // riordinaPriorita(prenotazioni: Prenotazione[]) {
  //   prenotazioni.forEach((element, index) => {
  //     const value = element
  //       .getVisita()
  //       .getRicetta()
  //       .getPriorita();
  //     let j = index - 1;
  //     while (
  //       j >= 0 &&
  //       element[j].getVisita().getRicetta().getPriorita > value
  //     ) {
  //       element[j + 1] = element[j];
  //       j -= 1;
  //       element[j + 1] = value;
  //     }
  //   });
  // }

  // riordinaReputazione(prenotazioni: Prenotazione[]) {
  //   prenotazioni.forEach((element, index) => {
  //     const value = element
  //       .getVisita()
  //       .getRicetta()
  //       .getPaziente()
  //       .getReputazione();
  //     let j = index - 1;
  //     while (
  //       j >= 0 &&
  //       element[j]
  //         .getVisita()
  //         .getRicetta()
  //         .getPaziente()
  //         .getReputazione() > value
  //     ) {
  //       element[j + 1] = element[j];
  //       j -= 1;
  //       element[j + 1] = value;
  //     }
  //   });
  // }

  // async getListaPrenotazioni(prenotazione: any) {
  //   const tipoVisita = prenotazione.visita.ricetta.tipoVisita;
  //   const struttura = prenotazione.struttura;
  //   const data = prenotazione.visita.dataInizio;

  //   console.log(tipoVisita);
  //   console.log(struttura);
  //   console.log(data);
  // }
}
