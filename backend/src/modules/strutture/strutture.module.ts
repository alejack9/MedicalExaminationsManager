import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StruttureController } from './strutture.controller';
import { StrutturaSchema } from 'src/common/schemas/struttura.schema';
import { StruttureService } from './strutture.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Structure', schema: StrutturaSchema }]),
  ],
  controllers: [StruttureController],
  providers: [StruttureService],
  exports: [],
})
export class StruttureModule {}
