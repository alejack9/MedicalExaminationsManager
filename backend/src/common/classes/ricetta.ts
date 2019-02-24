import { TipoVisita } from './tipoVisita';
import { Patient } from './patient';
import { IRicetta } from '../interfaces/ricetta.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVisita } from '../interfaces/visita.interface';
import { ObjectId } from 'bson';

export class Ricetta {
  private codiceRicetta: string;
  private tipoVisita: TipoVisita;
  private paziente: Patient;
  private priorita: number;
  private esenzione: boolean;
  private utilizzabile: boolean;

  constructor() {}

  public getPaziente() {
    return this.paziente;
  }

  public getPriorita() {
    return this.priorita;
  }
  public getTipoVisita() {
    return this.tipoVisita;
  }
}
