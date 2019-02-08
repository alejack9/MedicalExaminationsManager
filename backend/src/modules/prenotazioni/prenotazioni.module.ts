import { Module } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forFeature('', StrutturaSchema)],
  controllers: [PrenotazioniController],
  providers: [PrenotazioniService],
})
export class PrenotazioniModule {}
