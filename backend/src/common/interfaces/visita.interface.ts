import { Document } from 'mongoose';
import { Referto } from './referto.interface';
import { Ricetta } from './ricetta.interface';
import { OfficeDoctor } from './officeDoctor.interface';

export interface Visita extends Document {
  pagata: boolean;
  referto: Referto;
  ricetta: Ricetta;
  medico: OfficeDoctor;
  dataInizio: Date;
  dataFine: Date;
}
