import { Document } from 'mongoose';
import { TipoVisita } from './tipo-visita.interface';

export interface Struttura extends Document {
  nome: string;
  indirizzo: string;
  tipologia: string;
  orari: [Date];
  tipiVisita: [{ tipoVisita: TipoVisita; prezzo: number }];
}
