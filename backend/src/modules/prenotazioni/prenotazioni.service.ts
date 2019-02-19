import { Injectable } from '@nestjs/common';
import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Visita } from 'src/common/interfaces/visita.interface';
import { Prenotazione } from 'src/common/interfaces/prenotazione.interface';
import { Ricetta } from 'src/common/interfaces/ricetta.interface';

@Injectable()
export class PrenotazioniService {
  constructor(
    @InjectModel('Examination')
    private readonly examinationModel: Model<Visita>,
    @InjectModel('Reservation')
    private readonly reservationModel: Model<Prenotazione>,
    @InjectModel('Prescription')
    private readonly prescriptionModel: Model<Ricetta>,
  ) {}
  async creaPrenotazione(
    ricettaId: Types.ObjectId,
    pStruttura: Types.ObjectId,
    pData: Date,
    medicoId: Types.ObjectId,
  ) {
    return new this.reservationModel({
      visita: (await this.creaVisita(ricettaId, medicoId, pData))._id,
      data: new Date(),
      annullata: false,
      struttura: pStruttura,
    }).save();
  }

  private async creaVisita(
    ricettaId: Types.ObjectId,
    medicoId: Types.ObjectId,
    pData: Date,
  ) {
    return await new this.examinationModel({
      pagata: false,
      ricetta: ricettaId,
      medico: medicoId,
      dataInizio: pData,
    }).save();
  }

  async getPrenotazioniPaziente(
    patientID: string,
    dataIniziop: Date,
    dataFinep: Date,
  ): Promise<[any]> {
    const p = this.reservationModel
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
          $lookup: {
            from: 'prescriptions',
            localField: 'visita.ricetta',
            foreignField: '_id',
            as: 'ricetta',
          },
        },
        {
          $unwind: {
            path: '$visita',
          },
        },
        {
          $unwind: {
            path: '$ricetta',
          },
        },
        {
          $match: {
            'ricetta.paziente': new Types.ObjectId(patientID),
          },
        },
        {
          $match: {
            'visita.dataInizio': {
              $gte: dataIniziop,
              $lt: dataFinep,
            },
          },
        },
      ])
      .exec();
    return await p;
  }
}
