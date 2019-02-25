import { Ricetta } from '../../common/interfaces/ricetta.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'bson';

@Injectable()
export class RicettaService {
  constructor(
    @InjectModel('Prescription')
    private readonly ricettaModel: Model<Ricetta>,
  ) {}

  async eliminaRicetta(ricettaId: ObjectId) {
    await this.ricettaModel.findOneAndDelete({ _id: ricettaId }).exec();
  }

  async trovaRicetta(ricettaId: ObjectId) {
    return await this.ricettaModel.findById({ _id: ricettaId }).exec();
  }

  async disabilitaRicetta(ricettaId: Types.ObjectId) {
    await this.ricettaModel
      .findOneAndUpdate(
        { _id: ricettaId },
        {
          utilizzabile: false,
        },
      )
      .exec();
  }
  async getLista(idPaziente: Types.ObjectId): Promise<Ricetta[]> {
    const v = await this.ricettaModel
      .find({ paziente: idPaziente, utilizzabile: true })
      .populate('tipoVisita')
      .exec();
    return await v;
  }
}
