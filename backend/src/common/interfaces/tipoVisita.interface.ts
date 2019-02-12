import { Document } from 'mongoose';

export interface TipoVisita extends Document {
  nome: string;
  /**
   * in minuti
   */
  durataVisita: number;
}
