import { Document } from 'mongoose';
import { TipoVisita } from './tipoVisita.interface';
import { IPatient } from './patient.interface';
import { ObjectId } from 'bson';

export interface IRicetta extends Document {
  _id: ObjectId;
  codiceRicetta: string;
  tipoVisita: string;
  paziente: IPatient;
  priorita: number;
  esenzione: boolean;
  utilizzabile: boolean;
}
