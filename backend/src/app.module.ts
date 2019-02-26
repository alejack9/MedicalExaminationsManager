import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioniModule } from './modules/prenotazioni/prenotazioni.module';
import { StruttureModule } from './modules/strutture/strutture.module';
import { RicettaModule } from './modules/ricetta/ricetta.module';
import { VisitaModule } from './modules/visita/visita.module';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB, {
      useNewUrlParser: true,
    }),
    PrenotazioniModule,
    StruttureModule,
    RicettaModule,
    VisitaModule,
    PatientModule,
  ],
})
export class AppModule {}
