import { Injectable } from '@nestjs/common';
import { Prenotazione } from 'src/common/classes/prenotazione';

@Injectable()
export class PrenotazioniGetterService {
  getListaPrenotazioni(
    prenotazione: Prenotazione,
    dataInizio: Date,
  ): Prenotazione[] {
    // query db
    return;
  }
}
