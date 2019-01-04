export class Patient {
  constructor(private _reputazione: number) {}

  public get reputazione() {
    return this._reputazione;
  }
  public set reputazione(rep: number) {
    this._reputazione = rep;
  }

  public equals(obj: object): boolean {
    // TODO
    return true;
  }
}
