import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';
import { StrutturaSchema } from '../../common/schemas/struttura.schema';
import { OfficeDoctorSchema } from 'src/common/schemas/office-doctor.schema';
import { PrenotazioneSchema } from 'src/common/schemas/prenotazione.schema';
import { VisitaSchema } from 'src/common/schemas/visita.schema';
import { RicettaModule } from '../ricetta/ricetta.module';
import { DottoriService } from './dottori.service';
import { PatientModule } from '../patient/patient.module';
import { PatientService } from '../patient/patient.service';
import { RicettaService } from '../ricetta/ricetta.service';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';
import { NotificationService } from '../notificator/notification.service';
import { NotificatorModule } from '../notificator/notificator.module';
import { VisitaService } from '../visita/visita.service';
import { TipoVisitaService } from './tipoVisita.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Structure', schema: StrutturaSchema },
      { name: 'Office-Doctor', schema: OfficeDoctorSchema },
      { name: 'Reservation', schema: PrenotazioneSchema },
      { name: 'Examination', schema: VisitaSchema },
      { name: 'Prescription', schema: RicettaSchema },
    ]),
    RicettaModule,
    PatientModule,
    NotificatorModule,
  ],
  controllers: [PrenotazioniController],
  providers: [
    DottoriService,
    NotificationService,
    PatientService,
    PrenotazioniService,
    RicettaService,
    VisitaService,
    TipoVisitaService,
  ],
})
export class PrenotazioniModule {}
