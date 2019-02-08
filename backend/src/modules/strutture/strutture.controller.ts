import { Controller, Get, Param } from '@nestjs/common';
import { StruttureService } from './strutture.service';

@Controller('strutture')
export class StruttureController {
  constructor(private readonly struttureService: StruttureService) {}

  @Get(':tipoVisita')
  async getStrutture(@Param('tipoVisita') tipoVisita) {
    return await this.struttureService.findStrutture(tipoVisita);
  }
}
