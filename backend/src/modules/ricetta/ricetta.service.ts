import { IRicetta } from '../../common/interfaces/ricetta.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPrenotazione } from 'src/common/interfaces/prenotazione.interface';
import { ObjectId, ObjectID } from 'bson';

@Injectable()
export class RicettaService {
  constructor(
    @InjectModel('Ricetta') private readonly ricettaModel: Model<IRicetta>,
  ) {}
  /*async trovaRicetta
codice :string   */
  async eliminaRicetta(codiceRic: string) {
    await this.ricettaModel.deleteOne({ codice: codiceRic }).exec();
  }

  async trovaRicetta(): Promise<IRicetta[]> {
    return await this.ricettaModel
      .aggregate([
        {
          $lookup: {
            from: 'examinations',
            localField: 'visita',
            foreignField: '_id',
            as: 'visita',
          },
        },
        {
          $unwind: {
            path: '$visita',
          },
        },
        {
          $lookup: {
            from: 'prescriptions',
            localField: 'visita.ricetta',
            foreignField: '_id',
            as: 'ricetta',
          },
        },
      ])
      .exec();
  }
}
