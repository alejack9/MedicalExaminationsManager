import { PatientController } from './../patient/patient.controller';
import { Controller, Post } from '@nestjs/common';
import { Prenotazione } from '../../common/classes/prenotazione';
import { PrenotazioniGetterService } from './prenotazioni-getter.service';

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
    // TODO
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
    return pren[0];
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
