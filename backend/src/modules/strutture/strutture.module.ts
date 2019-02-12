import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StruttureController } from './strutture.controller';
import { StrutturaSchema } from 'src/common/schemas/struttura.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Structure', schema: StrutturaSchema }]),
  ],
  controllers: [StruttureController],
  providers: [],
  exports: [],
})
export class StruttureModule {}
