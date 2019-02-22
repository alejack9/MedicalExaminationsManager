import { Controller, Post, Param } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { ObjectId } from 'bson';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(private readonly prenotazioneService: PrenotazioniService) {}

  @Post(':id')
  cancelReservation(@Param('id') id) {
    const prenotazioneId: ObjectId = new ObjectId(id);
    this.prenotazioneService.cancelBooking(prenotazioneId);
  }
}
