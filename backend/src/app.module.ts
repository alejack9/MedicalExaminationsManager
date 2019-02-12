import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrenotazioniModule } from './modules/prenotazioni/prenotazioni.module';
import { StruttureModule } from './modules/strutture/strutture.module';
import { RicettaModule } from './modules/ricetta/ricetta.module';
import { RicettaService } from './modules/ricetta/ricetta.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/medical-examination-manager', {
      useNewUrlParser: true,
    }),
    PrenotazioniModule,
    StruttureModule,
    RicettaModule,
  ],
  controllers: [AppController],
  providers: [AppService, RicettaService],
})
export class AppModule {}