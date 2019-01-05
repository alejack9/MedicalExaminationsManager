import IRuolo from "./Ruolo";
import User from "./User";

export default class Patient implements IRuolo {
  private _reputazione: number;

  constructor(private _user: User) {
    this._reputazione = 0;
  }

  public get reputazione() {
    return this._reputazione;
  }

  public set reputazione(value: number) {
    this._reputazione = value;
  }

  public getUser = () => this._user;

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
    if (
      this.reputazione === patient.reputazione &&
      this.getUser().equals(patient.getUser())
    ) {
      return true;
    }
    return false;
  }
}
