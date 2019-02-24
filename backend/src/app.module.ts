import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrenotazioniModule } from './modules/prenotazioni/prenotazioni.module';
import { StruttureModule } from './modules/strutture/strutture.module';
import { RicettaModule } from './modules/ricetta/ricetta.module';
import { RicettaService } from './modules/ricetta/ricetta.service';
import { VisitaModule } from './modules/visita/visita.module';
import { VisitaService } from './modules/visita/visita.service';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:IdS2019@ds135335.mlab.com:35335/medical-examination-manager',
      {
        useNewUrlParser: true,
      },
    ),
    PrenotazioniModule,
    StruttureModule,
    RicettaModule,
    VisitaModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService, RicettaService, VisitaService],
})
export class AppModule {}
