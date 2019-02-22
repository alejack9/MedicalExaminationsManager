import { Document, Model } from 'mongoose';
import { Referto } from './referto';
import { Ricetta } from './ricetta';
import { OfficeDoctor } from './officeDoctor';
import { InjectModel } from '@nestjs/mongoose';
import { IVisita } from '../interfaces/visita.interface';
import { ObjectId } from 'bson';

export class Visita {
  pagata: boolean;
  referto: Referto;
  ricetta: Ricetta;
  medico: OfficeDoctor;
  dataInizio: Date;
  dataFine: Date;

  constructor(
    @InjectModel('Examination') private readonly visitaModel: Model<IVisita>,
  ) {}

  public cancellaRicetta(ricettaId: ObjectId, salvaRicetta: boolean) {
    if (salvaRicetta === false) {
      this.ricetta.eliminaRicetta(ricettaId);
    }
  }

  // public getRicetta() {
  //   return this.ricetta;
  // }

  // public getDataInizio() {
  //   return this.dataInizio;
  // }
}
