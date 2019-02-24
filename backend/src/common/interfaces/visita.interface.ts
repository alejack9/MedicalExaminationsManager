import { Document } from 'mongoose';
import { Referto } from './referto.interface';
import { IRicetta } from './ricetta.interface';
import { OfficeDoctor } from './officeDoctor.interface';
import { ObjectId } from 'bson';

export interface IVisita extends Document {
  _id: ObjectId;
  pagata: boolean;
  referto: Referto;
  ricetta: IRicetta;
  medico: OfficeDoctor;
  dataInizio: Date;
  dataFine: Date;
}
