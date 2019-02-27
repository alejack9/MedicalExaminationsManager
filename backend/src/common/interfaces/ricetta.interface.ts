import { Document } from 'mongoose';
import { Patient } from './patient.interface';
import { TipoVisita } from './tipo-visita.interface';

export interface Ricetta extends Document {
  codiceRicetta: string;
  tipoVisita: TipoVisita;
  paziente: Patient;
  priorita: number;
  esenzione: boolean;
  utilizzabile: boolean;
}
