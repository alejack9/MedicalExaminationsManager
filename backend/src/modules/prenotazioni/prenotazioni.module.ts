import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';
import { StrutturaSchema } from '../../common/schemas/struttura.schema';
import { DottoriService } from './dottori.service';
import { OfficeDoctorSchema } from 'src/common/schemas/officeDoctor.schema';
import { PrenotazioneSchema } from 'src/common/schemas/prenotazione.schema';
import { VisitaSchema } from 'src/common/schemas/visita.schema';
import { RicetteService } from 'src/modules/prenotazioni/ricette.service';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Structure', schema: StrutturaSchema },
      { name: 'Office-Doctor', schema: OfficeDoctorSchema },
      { name: 'Reservation', schema: PrenotazioneSchema },
      { name: 'Examination', schema: VisitaSchema },
      { name: 'Prescription', schema: RicettaSchema },
    ]),
  ],
  controllers: [PrenotazioniController],
  providers: [PrenotazioniService, DottoriService, RicetteService],
})
export class PrenotazioniModule {}
