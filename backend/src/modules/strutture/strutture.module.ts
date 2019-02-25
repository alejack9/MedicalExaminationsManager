import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StruttureController } from './strutture.controller';
import { StrutturaSchema } from 'src/common/schemas/struttura.schema';
import { StruttureService } from './strutture.service';
import { TipoVisitaSchema } from 'src/common/schemas/tipo-visita.schema';
import { TipoVisitaService } from '../prenotazioni/tipoVisita.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Structure', schema: StrutturaSchema },
      { name: 'Reservation-type', schema: TipoVisitaSchema },
    ]),
  ],
  controllers: [StruttureController],
  providers: [StruttureService],
})
export class StruttureModule {}
