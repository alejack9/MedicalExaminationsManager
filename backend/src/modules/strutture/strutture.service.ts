import { Injectable } from '@nestjs/common';
import { Struttura } from 'src/common/interfaces/struttura.interface';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';
import * as moment from 'moment';

@Injectable()
export class StruttureService {
  async findStrutture(visita: TipoVisita): Promise<Struttura[]> {
    return Promise.resolve([
      new A('a', 'via Dan', 'ospedale', [moment(moment.now()).toDate()]),
    ]);
  }
}

// tslint:disable-next-line: max-classes-per-file
class A implements Struttura {
  constructor(
    public nome: string,
    public indirizzo: string,
    public tipologia: string,
//     public orari: [Date],
//   ) {}
}
