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

  getListaPrenotazioni(
    prenotazione: Prenotazione,
    dataInizio: Date,
  ): Prenotazione[] {
    this.prenotazioneModel.find({});
    return;
  }
}
