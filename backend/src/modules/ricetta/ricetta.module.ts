import { Module } from '@nestjs/common';
import { RicettaController } from './ricetta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Prescription', schema: RicettaSchema },
    ]),
  ],
  controllers: [RicettaController],
})
export class RicettaModule {}
