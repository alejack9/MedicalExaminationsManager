import { Controller, Get, Body, Render, Param } from '@nestjs/common';
import { StruttureService } from './strutture.service';
import { DottoriService } from './dottori.service';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';
import * as moment from 'moment';

@Controller('prenotazioni')
export class PrenotazioniController {
  constructor(
    private readonly struttureService: StruttureService,
    private readonly dottoriService: DottoriService,
  ) {}
  @Get('strutture')
  @Render('strutture')
  async getStrutture(@Body() tipoVisita: string) {
    return { strutture: await this.struttureService.findStrutture(tipoVisita) };
    // return {
    //   strutture: [
    //     { id: 1, nome: 'a', prezzo: 1.4 },
    //     { id: 2, nome: 'b', prezzo: 2.1 },
    //     { id: 3, nome: 'c', prezzo: 3.5 },
    //   ],
    // };
  }

  @Get('prenota/:id')
  async prenota(@Body() tipo: TipoVisita, @Param('id') id: string) {
    const docs = await this.dottoriService.getDottori(id, tipo);
    const durata = tipo.durataVisita;
    for (const doc of docs) {
      for (const orario of doc.orari) {
        const minutesOfWork = moment(orario.fine).diff(
          moment(orario.inizio),
          'minutes',
        );
        const visiteEffettuabili = Math.floor(minutesOfWork / durata);
      }
    }
  }
}
