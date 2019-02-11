import { Controller } from '@nestjs/common';
import { Prenotazione } from 'src/common/interfaces/prenotazione.interface';
@Controller('prenotazioni')
export class PrenotazioniController {
  // tslint:disable-next-line:no-empty
  cancelBooking(prenotazione: Prenotazione) {
    prenotazione.annullata = true;
  }
}
