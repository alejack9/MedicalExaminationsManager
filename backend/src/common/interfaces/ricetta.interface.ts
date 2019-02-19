import { Document } from 'mongoose';
import { TipoVisita } from './tipoVisita.interface';
import { IPatient } from './patient.interface';

export interface IRicetta extends Document {
  readonly codiceRicetta: string;
  readonly tipoVisita: TipoVisita;
  readonly paziente: IPatient;
  readonly priorita: number;
  readonly esenzione: boolean;
  readonly utilizzabile: boolean;
}
