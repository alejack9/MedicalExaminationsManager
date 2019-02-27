import { Module } from '@nestjs/common';
import { RicettaController } from './ricetta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';
import { RicettaService } from './ricetta.service';
import { TipoVisitaSchema } from 'src/common/schemas/tipo-visita.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Prescription', schema: RicettaSchema },
      { name: 'Reservation-type', schema: TipoVisitaSchema },
    ]),
  ],
  controllers: [RicettaController],
  providers: [RicettaService],
  exports: [RicettaService],
})
export class RicettaModule {}
