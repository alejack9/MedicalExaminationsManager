import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { OfficeDoctor } from 'src/common/interfaces/office-doctor.interface';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';
import { Struttura } from 'src/common/interfaces/struttura.interface';

@Injectable()
export class DottoriService {
  constructor(
    @InjectModel('Structure') private readonly strutture: Model<Struttura>,
    @InjectModel('Office-Doctor')
    private readonly officeDoctor: Model<OfficeDoctor>,
  ) {}
  async getDottori(
    idStruttura: string,
    tipoVisita: TipoVisita,
  ): Promise<OfficeDoctor[]> {
    console.log(Types.ObjectId(idStruttura));

    return await this.officeDoctor
      .aggregate([
        {
          $match: {
            'orari.struttura': Types.ObjectId(idStruttura),
            'orari.tipo.nome': tipoVisita.nome,
          },
        },
      ])
      .exec();
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
