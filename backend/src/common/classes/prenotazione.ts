import { IVisita } from '../interfaces/visita.interface';
import { IStruttura } from '../interfaces/struttura.interface';

export class Prenotazione {
  visita: IVisita;
  data: Date;
  annullata: boolean;
  struttura: IStruttura;

  constructor() {}

  public getVisita() {
    return this.visita;
  }

  public getData() {
    return this.data;
  }

  public getAnnulata() {
    return this.annullata;
  }

  public getStruttura() {
    return this.struttura;
  }
}
