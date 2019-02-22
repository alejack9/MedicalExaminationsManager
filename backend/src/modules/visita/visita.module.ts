import { Module } from '@nestjs/common';
import { VisitaService } from './visita.service';
import { VisitaController } from './visita.controller';
import { RicettaService } from 'src/modules/ricetta/ricetta.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioneSchema } from 'src/common/schemas/prenotazione.schema';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reservation', schema: PrenotazioneSchema },
      { name: 'Prescription', schema: RicettaSchema },
    ]),
  ],
  providers: [VisitaService, RicettaService],
  controllers: [VisitaController],
})
export class VisitaModule {}
