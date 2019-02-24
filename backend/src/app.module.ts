import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrenotazioniModule } from './modules/prenotazioni/prenotazioni.module';
import { StruttureModule } from './modules/strutture/strutture.module';
import { RicetteModule } from './modules/ricette/ricette.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB, {
      useNewUrlParser: true,
    }),
    PrenotazioniModule,
    StruttureModule,
    RicetteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
