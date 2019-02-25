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
      .aggregate([
        {
          $match: {
            'tipiVisita.tipoVisita.nome': pTipoVisita,
          },
        },
        {
          $unwind: {
            path: '$tipiVisita',
          },
        },
        {
          $match: {
            'tipiVisita.tipoVisita.nome': pTipoVisita,
          },
        },
      ])
      .exec();
  }
}
