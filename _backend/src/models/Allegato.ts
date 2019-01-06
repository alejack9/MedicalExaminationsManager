export class Allegato {
  constructor(private _name: string, private _path: string) {}

  public get name() {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get path() {
    return this._path;
  }

  public set path(p: string) {
    this._path = p;
  }
}
