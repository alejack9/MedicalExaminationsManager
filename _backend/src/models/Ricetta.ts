export default class Ricetta {
  constructor(private _codiceRicetta: string, private _tipoVisita: string) {}
  public get codiceRicetta() {
    return this._codiceRicetta;
  }
  public get tipoVisita() {
    return this._tipoVisita;
  }

  public equals(obj: object) {
    if (obj === null) {
      return false;
    }
    if (obj === this) {
      return true;
    }
    if (!(obj instanceof Ricetta)) {
      return false;
    }
    const ricetta = obj as Ricetta;
    if (
      this.codiceRicetta === ricetta.codiceRicetta &&
      this.tipoVisita === ricetta.tipoVisita
    ) {
      return true;
    }
    return false;
  }
}
