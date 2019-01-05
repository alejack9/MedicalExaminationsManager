import * as _ from "underscore";
import Allegato from "./Allegato";

export default class Referto {
  constructor(
    private _nome: string,
    private _path: string,
    private _allegati: Allegato[]
  ) {}

  public get nome() {
    return this._nome;
  }
  public set nome(value) {
    this._nome = value;
  }
  public get path() {
    return this._path;
  }
  public set path(value) {
    this._path = value;
  }
  public get allegati() {
    return this._allegati;
  }
  public set allegati(value) {
    this._allegati = value;
  }

  public equals(obj: object): boolean {
    if (obj === null) {
      return false;
    }
    if (obj === this) {
      return true;
    }
    if (!(obj instanceof Referto)) {
      return false;
    }
    const referto = obj as Referto;
    if (this.nome === referto.nome && this.path === referto.path) {
      if (
        this.allegati === referto.allegati ||
        this.checkAllegati(referto.allegati)
      ) {
        return true;
      }
    }
    return false;
  }
  private checkAllegati(allegati: Allegato[]) {
    if (allegati.length !== this.allegati.length) {
      return false;
    }
    for (let i = 0; i < allegati.length; i++) {
      if (allegati[i].equals(this.allegati[i])) {
        return false;
      }
      return true;
    }
  }
}
