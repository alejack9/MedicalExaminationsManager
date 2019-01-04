import { IRuolo } from "./Ruolo";

export class User {
  constructor(
    private _name: string,
    private _surname: string,
    private _address: string,
    private _birthDate: Date
  ) {}

  public get name() {
    return this._name;
  }
  public get surname() {
    return this._surname;
  }
  public get address() {
    return this._address;
  }
  public get birthDate() {
    return this._birthDate;
  }
  public equals(obj: object): boolean {
    if (obj === null) {
      return false;
    }
    if (obj === this) {
      return true;
    }
    if (!(obj instanceof User)) {
      return false;
    }
    const user = obj as User;
    if (
      this.name === user.name &&
      this.surname === user.surname &&
      this.address === user.address &&
      this.birthDate.toISOString() === user.birthDate.toISOString()
    ) {
      return true;
    }
    return false;
  }
}
