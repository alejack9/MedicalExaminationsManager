import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';
import { StrutturaSchema } from '../../common/schemas/struttura.schema';
import { StruttureService } from './strutture.service';
import { DottoriService } from './dottori.service';
import { DottoreSchema } from 'src/common/schemas/dottore.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Structure', schema: StrutturaSchema },
      { name: 'Doctor', schema: DottoreSchema },
    ]),
  ],
  controllers: [PrenotazioniController],
  providers: [PrenotazioniService, StruttureService, DottoriService],
})
export class PrenotazioniModule {}
