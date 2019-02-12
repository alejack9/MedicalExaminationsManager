import { Ricetta } from '../../common/interfaces/ricetta.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RicettaService {
  constructor(
    @InjectModel('Ricetta') private readonly ricettaModel: Model<Ricetta>,
  ) {}
  /*async trovaRicetta
codice :string   */
  async eliminaRicetta(codiceRic: string) {
    await this.ricettaModel.deleteOne({ codice: codiceRic }).exec();
  }

  async trovaRicetta(codiceRicetta: string): Promise<Ricetta[]> {
    const ricetta = await this.ricettaModel
      .find({ codice: codiceRicetta })
      .exec();
    // this.eliminaRicetta(codiceRicetta);
    return ricetta;
  }
}
