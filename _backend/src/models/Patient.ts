import IRuolo from "./Ruolo";

export default class Patient implements IRuolo {
  private _reputazione: number;

  constructor() {
    this._reputazione = 0;
  }

  public get reputazione() {
    return this._reputazione;
  }

  public set reputazione(value: number) {
    this._reputazione = value;
  }

  public equals(obj: object): boolean {
    if (obj === null) {
      return false;
    }
    if (obj === this) {
      return true;
    }
    if (!(obj instanceof Patient)) {
      return false;
    }
    const patient = obj as Patient;
    if (this.reputazione === patient.reputazione) {
      return true;
    }
    return false;
  }
}
