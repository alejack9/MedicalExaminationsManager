import { IRicetta } from '../../common/interfaces/ricetta.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  async trovaRicetta(codiceRicetta: string): Promise<IRicetta[]> {
    const ricetta = await this.ricettaModel
      .find({ codice: codiceRicetta })
      .exec();
    return ricetta;
  }
}
