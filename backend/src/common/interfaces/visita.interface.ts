import { Document } from 'mongoose';
import { Referto } from './referto.interface';
import { IRicetta } from './ricetta.interface';
import { OfficeDoctor } from './officeDoctor.interface';

export interface Visita extends Document {
  pagata: boolean;
  referto: Referto;
  ricetta: IRicetta;
  medico: OfficeDoctor;
  dataInizio: Date;
  dataFine: Date;
}
