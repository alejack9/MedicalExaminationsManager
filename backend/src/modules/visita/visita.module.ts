import { Module } from '@nestjs/common';
import { VisitaService } from './visita.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioneSchema } from 'src/common/schemas/prenotazione.schema';
import { RicettaModule } from '../ricetta/ricetta.module';
import { VisitaSchema } from 'src/common/schemas/visita.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reservation', schema: PrenotazioneSchema },
      { name: 'Examination', schema: VisitaSchema },
    ]),
    RicettaModule,
  ],
  providers: [VisitaService],
  controllers: [],
})
export class VisitaModule {}
