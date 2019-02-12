import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dottore } from 'src/common/interfaces/dottore.interface';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';

@Injectable()
export class DottoriService {
  constructor(
    @InjectModel('Structure') private readonly strutture: Model<Dottore>,
  ) {}
  async getDottori(
    idStruttura: string,
    tipoVisita: TipoVisita,
  ): Promise<Dottore[]> {
    throw new Error('TODO');
  }
  async getPrenotazioni(idDottore: string, data: Date) {
    /**
     * 2 modi:
     *  1) query sulle prenotazioni prendendo le visite che sono in quella struttura, in quella data, per quel dottore
     *  2) salvo le prenotazioni anche sul dottore e le prendo da li`
     */
    throw new Error('TODO');
  }
}
