import { Injectable } from '@nestjs/common';
import { Struttura } from 'src/common/interfaces/struttura.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StruttureService {
  constructor(
    @InjectModel('Structure') private readonly strutture: Model<Struttura>,
  ) {}
  async findStrutture(pTipoVisita: string): Promise<Struttura[]> {
    return await this.strutture
      .find({ tipiVisita: { tipoVisita: pTipoVisita } })
      .exec();
    // return null;
    // return Promise.resolve([
    //   new A('a', 'via Dan', 'ospedale', [moment(moment.now()).toDate()]),
    // ]);
  }
}

// tslint:disable-next-line: max-classes-per-file
// class A implements Struttura {
//   constructor(
//     public nome: string,
//     public indirizzo: string,
//     public tipologia: string,
//     public orari: [Date],
//   ) {}
// }
