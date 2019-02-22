import { Controller, Post, Param } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(private readonly prenotazioneS: PrenotazioniService) {}

  // @Post(' :id')
  // cancelReservation(@Param('id') id) {
  //   this.prenotazioneS.cancelBooking(id, false);
  // }
}
