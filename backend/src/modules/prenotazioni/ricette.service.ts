import { Injectable } from '@nestjs/common';
import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ricetta } from 'src/common/interfaces/ricetta.interface';

@Injectable()
export class RicetteService {
  constructor(
    @InjectModel('Prescription')
    private readonly prescriptionModel: Model<Ricetta>,
  ) {}

  async disabilitaRicetta(ricettaId: Types.ObjectId) {
    await this.prescriptionModel
      .findOneAndUpdate(
        { _id: ricettaId },
        {
          utilizzabile: false,
        },
      )
      .exec();
  }
}
