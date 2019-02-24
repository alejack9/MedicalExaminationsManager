import { Controller, Post, Param } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { ObjectId } from 'bson';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(private readonly prenotazioneService: PrenotazioniService) {}

  @Post(':id')
  cancelReservation(@Param('id') id) {
    this.prenotazioneService.cancelBooking(new ObjectId(id));
  }
}
