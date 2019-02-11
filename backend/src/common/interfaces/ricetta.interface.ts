import { Document } from 'mongoose';
import { TipoVisita } from './tipoVisita.interface';
import { Patient } from './patient.interface';

export interface Ricetta extends Document {
  codiceRicetta: string;
  tipoVisita: TipoVisita;
  paziente: Patient;
  priorita: number;
  esenzione: boolean;
  utilizzabile: boolean;
}
