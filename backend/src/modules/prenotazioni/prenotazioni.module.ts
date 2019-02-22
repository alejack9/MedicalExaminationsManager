import { Module } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioneSchema } from 'src/common/schemas/prenotazione.schema';
import { PatientModule } from '../patient/patient.module';
import { VisitaService } from 'src/modules/visita/visita.service';
import { PatientService } from '../patient/patient.service';
import { RicettaService } from '../ricetta/ricetta.service';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reservation', schema: PrenotazioneSchema },
      { name: 'Prescription', schema: RicettaSchema },
    ]),
    PatientModule,
  ],
  controllers: [PrenotazioniController],
  providers: [
    PrenotazioniService,
    VisitaService,
    PatientService,
    RicettaService,
  ],
})
export class PrenotazioniModule {}
