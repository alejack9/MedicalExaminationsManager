import { Document } from 'mongoose';
import { TipoVisita } from './tipoVisita.interface';

export interface Struttura extends Document {
  nome: string;
  indirizzo: string;
  tipologia: string;
  orari: [Date];
  tipiVisita: [{ tipoVisita: TipoVisita; prezzo: number }];
}
