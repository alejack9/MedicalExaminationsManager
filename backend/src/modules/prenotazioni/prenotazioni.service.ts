import { Injectable } from '@nestjs/common';
import { Prenotazione } from '../../common/classes/prenotazione';
import { PrenotazioniGetterService } from './prenotazioni-getter.service';
import { NotificatorService } from '../notificator/notificator.service';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';
import { PatientService } from '../patient/patient.service';
import { IPrenotazione } from 'src/common/interfaces/prenotazione.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RicettaService } from '../ricetta/ricetta.service';

@Injectable()
export class PrenotazioniService {
  constructor(
    @InjectModel('Reservation')
    private readonly prenotazioneModel: Model<IPrenotazione>,
    private ricettaS: RicettaService,
  ) {}

  cancelBooking(prenotazioneId: Types.ObjectId, salvaRicetta: boolean) {
    this.prenotazioneModel
      .findOneAndUpdate({ _id: prenotazioneId }, { annullata: true })
      .exec();
    if (salvaRicetta) {
      this.ricettaS.trovaRicetta();
    }
    const patientS: PatientService = null;
    patientS.abbassaReputazione(
      prenotazione.visita.ricetta.paziente,
      prenotazione.getData(),
    );

    this.associaPrenotazione(prenotazione);
  }

  // async annulla(prenotazione: IPrenotazione, salvaRicetta: boolean) {
  //   this.prenotazioneModel.findOne().exec();

  //   this.annullata = true;
  //   this.visita.cancellaRicetta(salvaRicetta);
  //   return this.annullata;
  // }

  associaPrenotazione(prenotazione: IPrenotazione) {
    const prenotazioniG: PrenotazioniGetterService = null;
    const listaPrenotazioni = prenotazioniG.getListaPrenotazioni(prenotazione);
    let prenotazioni = this.filtraMaxPriorita(listaPrenotazioni);

    if (prenotazioni.length > 1) {
      prenotazioni = this.filtraMaxReputazione(prenotazioni);
      if (prenotazioni.length > 1) {
        this.filtraDataPiuLontana(prenotazioni);
      }
    }

    const notificator = new NotificatorService();
    notificator.creaNotifica(prenotazione, TipoNotifica.anticipo);
  }

  // la funzione restituisce un array di prenotazioni con la stessa priorità
  filtraMaxPriorita(prenotazioni: IPrenotazione[]): IPrenotazione[] {
    this.riordinaPriorita(prenotazioni);
    const pren: IPrenotazione[] = new Array();
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

  filtraMaxReputazione(prenotazioni: IPrenotazione[]): IPrenotazione[] {
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
    });
    return pren;
  }

  // metodo per filtrare la data più lontana
  filtraDataPiuLontana(prenotazioni: Prenotazione[]): Prenotazione {
    let pren: Prenotazione = new Prenotazione();
    prenotazioni.forEach((element, index) => {
      const value = element.getData().getDate();
      const j = index + 1;
      const currentDate = new Date();

      if (index === prenotazioni.length - 1) {
        return pren;
      } else {
        const diffData1 = value - currentDate.getDate();
        const diffData2 =
          element[j].getData().getDate() - currentDate.getDate();
        if (diffData1 > diffData2) {
          pren = element;
        } else {
          pren = element[j];
        }
      }
    });
    return pren;
  }

  riordinaPriorita(prenotazioni: IPrenotazione[]) {
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
}
