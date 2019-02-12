import { PatientController } from './../patient/patient.controller';
import { Controller } from '@nestjs/common';
import { Prenotazione } from '../../common/classes/prenotazione';

@Controller('prenotazioni')
export class PrenotazioniController {
  // tslint:disable-next-line:no-empty
  cancelBooking(prenotazione: Prenotazione, salvaRicetta: boolean) {
    prenotazione.annulla(salvaRicetta);
    const patientC: PatientController = null;
    patientC.abbassaReputazione(
      prenotazione.visita.ricetta.paziente,
      prenotazione.data,
    );
  }
}
