import { IRicetta } from '../../common/interfaces/ricetta.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';

@Injectable()
export class RicettaService {
  constructor(
    @InjectModel('Prescription')
    private readonly ricettaModel: Model<IRicetta>,
  ) {}

  async eliminaRicetta(ricettaId: ObjectId) {
    await this.ricettaModel.findOneAndDelete({ _id: ricettaId });
  }
}
