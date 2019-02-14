import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';
import { StrutturaSchema } from '../../common/schemas/struttura.schema';
import { DottoriService } from './dottori.service';
import { OfficeDoctorSchema } from 'src/common/schemas/officeDoctor.schema';
import { PrenotazioneSchema } from 'src/common/schemas/prenotazione.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Structure', schema: StrutturaSchema },
      { name: 'Office-Doctor', schema: OfficeDoctorSchema },
      { name: 'Reservations', schema: PrenotazioneSchema },
    ]),
  ],
  controllers: [PrenotazioniController],
  providers: [PrenotazioniService, DottoriService],
})
export class PrenotazioniModule {}
