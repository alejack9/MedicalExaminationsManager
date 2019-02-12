import { Module } from '@nestjs/common';
import { RicettaController } from './ricetta.controller';

@Module({
  controllers: [RicettaController]
})
export class RicettaModule {}
