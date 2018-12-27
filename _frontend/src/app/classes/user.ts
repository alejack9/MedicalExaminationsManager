export class User {
  constructor(
    private _name: string,
    private _surname: string,
    private _birthDay: Date
  ) { }

  get name ()     { return this._name; }
  get surname ()  { return this._surname; }
  get birthDay () { return this._birthDay; }
}
