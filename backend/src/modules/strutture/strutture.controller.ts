import { Controller, Get, Param, Render, Body } from '@nestjs/common';
import { StruttureService } from './strutture.service';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';

@Controller('strutture')
export class StruttureController {
  constructor(private readonly struttureService: StruttureService) {}
  @Get()
  @Render('strutture')
  async getStrutture(@Body() tipoVisita: TipoVisita) {
    return {
      strutture: await this.struttureService.findStrutture(tipoVisita.nome),
    };
    // return {
    //   strutture: [
    //     { id: 1, nome: 'a', prezzo: 1.4 },
    //     { id: 2, nome: 'b', prezzo: 2.1 },
    //     { id: 3, nome: 'c', prezzo: 3.5 },
    //   ],
    // };
  }
}
