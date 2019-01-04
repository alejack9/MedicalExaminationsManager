export class Patient {
  constructor(private _reputazione: number) {}

  get reputazione() {
    return this._reputazione;
  }
  set reputazione(rep: number) {
    this.reputazione = rep;
  }

  public equals(obj: object): boolean {
    // TODO
    return true;
  }
}
