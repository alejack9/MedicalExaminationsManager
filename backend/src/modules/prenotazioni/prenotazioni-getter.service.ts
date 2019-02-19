import { Injectable } from '@nestjs/common';
import { IPrenotazione } from 'src/common/interfaces/prenotazione.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Prenotazione } from 'src/common/classes/prenotazione';

@Injectable()
export class PrenotazioniGetterService {
  constructor(
    @InjectModel('Prenotazione')
    private readonly prenotazioneModel: Model<IPrenotazione>,
  ) {}

  async getListaPrenotazioni(
    prenotazione: IPrenotazione,
  ): Promise<IPrenotazione[]> {
    const p = this.prenotazioneModel
      .find()
      .populate({
        path: 'Visita',
        populate: { path: ' Ricetta' },
      })
      .exec();
    console.log(p);
    return await p;
  }
}

{
  // visita: prenotazione
  //   .getVisita()
  //   .getRicetta()
  //   .getTipoVisita(),
  // struttura: prenotazione.getStruttura(),
  // data: prenotazione.getData().getDate() + 2,
}
