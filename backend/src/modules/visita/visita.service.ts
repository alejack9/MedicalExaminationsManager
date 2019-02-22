import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPrenotazione } from 'src/common/interfaces/prenotazione.interface';
import { ObjectId } from 'bson';
import { RicettaService } from 'src/modules/ricetta/ricetta.service';

@Injectable()
export class VisitaService {
  constructor(
    @InjectModel('Reservation')
    private readonly prenotazioniModel: Model<IPrenotazione>,
    private readonly ricettaService: RicettaService,
  ) {}

  async annulla(prenotazioneId: ObjectId, salvaRicetta: boolean) {
    await this.prenotazioniModel
      .findOneAndUpdate({ _id: prenotazioneId }, { annullata: true })
      .exec();

    const pren = await this.prenotazioniModel
      .aggregate([
        {
          $match: {
            _id: prenotazioneId,
          },
        },
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
      ])
      .exec();

    this.ricettaService.eliminaRicetta(pren.visita.ricetta);
  }
}