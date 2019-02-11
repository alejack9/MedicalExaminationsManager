import { Document } from 'mongoose';
import { Referto } from './referto';
import { Ricetta } from './ricetta';
import { OfficeDoctor } from './officeDoctor';

export class Visita extends Document {
  pagata: boolean;
  referto: Referto;
  ricetta: Ricetta;
  medico: OfficeDoctor;
  dataInizio: Date;
  dataFine: Date;
}
