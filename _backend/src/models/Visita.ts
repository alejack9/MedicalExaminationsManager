import OfficeDoctor from "./OfficeDoctor";
import Patient from "./Patient";
import Referto from "./Referto";
import Ricetta from "./Ricetta";

export default class Visita {
  private _annullata: boolean = false;

  constructor(
    private _tipoVisita: string,
    private _effettuata: boolean,
    private _pagata: boolean,
    private _paziente: Patient,
    private _ricetta: Ricetta,
    private _struttura: string,
    private _priorita: number,
    private _medico: OfficeDoctor,
    private _referto?: Referto | undefined
  ) {
    if (_priorita < 0) {
      throw new Error("La priorita` deve essere maggiore o uguale a 0");
    }
  }

  public get tipoVisita() {
    return this._tipoVisita;
  }

  public set tipoVisita(tv: string) {
    this._tipoVisita = tv;
  }

  public get effettuata() {
    return this._effettuata;
  }

  public set effettutata(eff: boolean) {
    this._effettuata = eff;
  }

  public get pagata() {
    return this._pagata;
  }

  public set pagata(pag: boolean) {
    this._pagata = pag;
  }
  public get annullata() {
    return this._annullata;
  }
  public annulla() {
    this._annullata = true;
  }
  public get priorita() {
    return this._priorita;
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
  public get referto(): Referto | undefined {
    return this._referto;
  }
  public set referto(rf: Referto | undefined) {
    if (!rf) {
      return;
    }
    this._referto = rf;
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
    return this._paziente.reputazione;
  }

  public get medico() {
    return this._medico;
  }

  public set medico(medico: OfficeDoctor) {
    this._medico = medico;
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
