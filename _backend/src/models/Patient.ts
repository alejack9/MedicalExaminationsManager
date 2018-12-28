export class Patient {
  constructor(private _reputazione: number) {}

  get reputazione() {
    return this._reputazione;
  }
  public equals(obj: object): boolean {
    // TODO
    return true;
  }
}
