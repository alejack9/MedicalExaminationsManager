import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrenotazioniModule } from './modules/prenotazioni/prenotazioni.module';

@Module({
  imports: [MongooseModule.forRoot(''), PrenotazioniModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
