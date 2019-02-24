import { Module } from '@nestjs/common';
import { RicettaController } from './ricetta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';
import { RicettaService } from './ricetta.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Prescription', schema: RicettaSchema },
    ]),
  ],
  controllers: [RicettaController],
  providers: [RicettaService],
})
export class RicettaModule {}
