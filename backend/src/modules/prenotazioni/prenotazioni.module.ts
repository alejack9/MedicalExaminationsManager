import { Module } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StrutturaSchema } from 'src/common/schemas/struttura.schema';
import { PrenotazioniGetterService } from './prenotazioni-getter.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Structure', schema: StrutturaSchema }]),
  ],
  controllers: [PrenotazioniController],
  providers: [PrenotazioniService, PrenotazioniGetterService],
})
export class PrenotazioniModule {}
