import { Document } from 'mongoose';
import { IStruttura } from './struttura.interface';
import { IVisita } from './visita.interface';
import { ObjectId } from 'bson';

export interface IPrenotazione extends Document {
  _id: ObjectId;
  visita: IVisita;
  data: Date;
  annullata: boolean;
  struttura: IStruttura;
}
