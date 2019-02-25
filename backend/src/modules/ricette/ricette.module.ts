import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RicettaSchema } from 'src/common/schemas/ricetta.schema';
import { RicetteService } from './ricette.service';
import { RicetteController } from './ricette.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Prescription', schema: RicettaSchema },
    ]),
  ],
  controllers: [RicetteController],
  providers: [RicetteService],
  exports: [RicetteService],
})
export class RicetteModule {}
