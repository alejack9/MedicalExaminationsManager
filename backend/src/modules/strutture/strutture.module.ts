import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StruttureController } from './strutture.controller';
import { StruttureService } from './strutture.service';
import { StrutturaSchema } from 'src/common/schemas/struttura.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Structure', schema: StrutturaSchema }]),
  ],
  controllers: [StruttureController],
  providers: [StruttureService],
  exports: [],
})
export class StruttureModule {}
