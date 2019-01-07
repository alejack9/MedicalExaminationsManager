import IRuolo from "./IRuolo";
import User from "./User";

export default class Patient implements IRuolo {
  public get reputazione() {
    return this._reputazione;
  }

  public set reputazione(value: number) {
    this._reputazione = value;
  }
  private _reputazione: number;

  constructor() {
    this._reputazione = 0;
  }
  public getRole() {
    return "patient";
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
