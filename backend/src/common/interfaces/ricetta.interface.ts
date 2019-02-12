import { Document } from 'mongoose';
import { TipoVisita } from './tipoVisita.interface';
import { Patient } from './patient.interface';

export interface IRicetta extends Document {
  codiceRicetta: string;
  tipoVisita: TipoVisita;
  paziente: Patient;
  priorita: number;
  esenzione: boolean;
  utilizzabile: boolean;
}
