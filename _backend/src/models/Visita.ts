import Patient from "./Patient";
import Referto from "./Referto";
import Ricetta from "./Ricetta";
import User from "./User";

export default class Visita {
  private _annullata: boolean = false;
  constructor(
    private _tipoVisita: string,
    private _effettuata: boolean,
    private _priorita: number,
    private _pagata: boolean,
    private _struttura: string,
    private _paziente: User,
    private _ricetta: Ricetta,
    private _referto?: Referto | undefined
  ) {
    if (_priorita < 0) {
      throw new Error("La priorita` deve essere maggiore o uguale a 0");
    }
  }

  public get annullata() {
    return this._annullata;
  }
  public annulla() {
    this._annullata = true;
  }
  public get tipoVisita() {
    return this._tipoVisita;
  }
  public get effettuata() {
    return this._effettuata;
  }
  public get priorita() {
    return this._priorita;
  }
  public get pagata() {
    return this._pagata;
  }
  public get ricetta() {
    return this._ricetta;
  }
  public set ricetta(value: Ricetta) {
    this._ricetta = value;
  }
  public get paziente() {
    return this._paziente;
  }
  public get referto() {
    return this._referto;
  }
  public get struttura() {
    return this._struttura;
  }

  public destroy(mantieniRicetta: boolean): Ricetta | null {
    if (mantieniRicetta === false) {
      this.eliminaRicetta();
      return null;
    } else {
      return this.ricetta;
    }
  }
  public eliminaRicetta(): void {
    delete this.ricetta;
    // throw new Error("not implemented method");
  }
  public getReputazionePaziente(): number {
    const pat: Patient = this.paziente.getRuolo(Patient) as Patient;
    return pat.reputazione;
  }

  public equals(obj: object): boolean {
    if (obj === null) {
      return false;
    }
    if (obj === this) {
      return true;
    }
    if (!(obj instanceof Visita)) {
      return false;
    }
    const visita = obj as Visita;
    if (
      this._tipoVisita === visita.tipoVisita &&
      this._struttura === visita.struttura &&
      this._effettuata === visita.effettuata &&
      this._pagata === visita.pagata &&
      this._ricetta.equals(visita.ricetta) &&
      this._paziente.equals(visita.paziente) &&
      ((this._referto === undefined && visita.referto === undefined) ||
        (this._referto as Referto).equals(visita.referto as Referto))
    ) {
      return true;
    }
    return false;
  }
}
