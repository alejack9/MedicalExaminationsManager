import { Injectable } from '@nestjs/common';
import { Struttura } from 'src/common/interfaces/struttura.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';

@Injectable()
export class StruttureService {
  constructor(
    @InjectModel('Structure') private readonly strutture: Model<Struttura>,
  ) {}
  async findStrutture(tipoVisitaId: ObjectId): Promise<Struttura[]> {
    return await this.strutture
      .aggregate([
        {
          $match: {
            'tipiVisita.tipoVisita': tipoVisitaId,
          },
        },
        {
          $unwind: {
            path: '$tipiVisita',
          },
        },
        {
          $match: {
            'tipiVisita.tipoVisita': tipoVisitaId,
          },
        },
      ])
      .exec();
  }
}
