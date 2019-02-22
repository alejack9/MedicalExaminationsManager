import { Document } from 'mongoose';
import { IStruttura } from './struttura.interface';
import { IVisita } from './visita.interface';

export interface IPrenotazione extends Document {
  visita: IVisita;
  data: Date;
  annullata: boolean;
  struttura: IStruttura;
}
