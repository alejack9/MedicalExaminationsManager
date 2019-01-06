import Ricetta from "./Ricetta";
import Visita from "./Visita";

export default class Prenotazione {
  constructor(
    private _visita: Visita,
    private _data: Date,
    private _annullata: boolean
  ) {}

  public set data(value: Date) {
    this._data = value;
  }
  public get data() {
    return this._data;
  }
  public cancellaVisita(mantieniRicetta: boolean): Ricetta | null {
    return null;
  }
  public annulla(): boolean {
    return this._annullata ? !this._annullata : (this._annullata = true);
  }
  public get annullata() {
    return this._annullata;
  }
  public get visita() {
    return this._visita;
  }

  public equals(obj: object) {
    if (obj === null) {
      return false;
    }
    if (obj === this) {
      return true;
    }
    if (!(obj instanceof Prenotazione)) {
      return false;
    }
    const prenotazione = obj as Prenotazione;
    if (
      this.visita.equals(prenotazione.visita) &&
      this.data === prenotazione.data &&
      this.annullata === prenotazione.annullata
    ) {
      return true;
    }
    return false;
  }
}
