import { PatientController } from './../patient/patient.controller';
import { Controller, Post } from '@nestjs/common';
import { Prenotazione } from '../../common/classes/prenotazione';
import { PrenotazioniGetterService } from './prenotazioni-getter.service';
import { NotificatorService } from '../notificator/notificator.service';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';

@Controller('prenotazioni')
export class PrenotazioniController {
  // tslint:disable-next-line:no-empty
  @Post()
  cancelBooking(prenotazione: Prenotazione, salvaRicetta: boolean) {
    prenotazione.annulla(salvaRicetta);
    const patientC: PatientController = null;
    patientC.abbassaReputazione(
      prenotazione
        .getVisita()
        .getRicetta()
        .getPaziente(),
      prenotazione.getData(),
    );

    this.associaPrenotazione(prenotazione);
  }

  associaPrenotazione(prenotazione: Prenotazione) {
    const prenotazioniG: PrenotazioniGetterService = new PrenotazioniGetterService();
    const listaPrenotazioni = prenotazioniG.getListaPrenotazioni(
      prenotazione,
      prenotazione.getVisita().getDataInizio(),
    );
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
  filtraMaxPriorita(prenotazioni: Prenotazione[]): Prenotazione[] {
    this.riordinaPriorita(prenotazioni);
    const pren: Prenotazione[] = new Array();
    prenotazioni.forEach((element, index) => {
      const value = element
        .getVisita()
        .getRicetta()
        .getPriorita();
      const j = index + 1;
      pren.push(prenotazioni[0]);
      while (
        j >= 0 &&
        element[j]
          .getVisita()
          .getRicetta()
          .getPriorita() === value
      ) {
        pren.push(element);
      }

      index = prenotazioni.length;
    });
    return pren;
  }

  filtraMaxReputazione(prenotazioni: Prenotazione[]): Prenotazione[] {
    this.riordinaReputazione(prenotazioni);
    const pren: Prenotazione[] = new Array();
    prenotazioni.forEach((element, index) => {
      const value = element
        .getVisita()
        .getRicetta()
        .getPaziente()
        .getReputazione();
      const j = index + 1;
      pren.push(prenotazioni[0]);
      while (
        j >= 0 &&
        element[j]
          .getVisita()
          .getRicetta()
          .getPaziente()
          .getReputazione() === value
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

  riordinaPriorita(prenotazioni: Prenotazione[]) {
    prenotazioni.forEach((element, index) => {
      const value = element
        .getVisita()
        .getRicetta()
        .getPriorita();
      let j = index - 1;
      while (
        j >= 0 &&
        element[j].getVisita().getRicetta().getPriorita > value
      ) {
        element[j + 1] = element[j];
        j -= 1;
        element[j + 1] = value;
      }
    });
  }

  riordinaReputazione(prenotazioni: Prenotazione[]) {
    prenotazioni.forEach((element, index) => {
      const value = element
        .getVisita()
        .getRicetta()
        .getPaziente()
        .getReputazione();
      let j = index - 1;
      while (
        j >= 0 &&
        element[j]
          .getVisita()
          .getRicetta()
          .getPaziente()
          .getReputazione() > value
      ) {
        element[j + 1] = element[j];
        j -= 1;
        element[j + 1] = value;
      }
    });
  }
}
