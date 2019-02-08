import Tools from "../asset/tools";
import IRuolo from "./Ruolo";

export default class User {
  private _roles = new Set<IRuolo>();

  constructor(
    private _name: string,
    private _surname: string,
    private _address: string,
    private _birthDate: Date
  ) {}

  public addRole(role: IRuolo): boolean {
    if (this._roles.has(role)) {
      return false;
    }
    this._roles.add(role);
    return true;
  }

  public getRuolo(role: any): IRuolo {
    const roles = Array.from(this._roles);
    const toReturn = roles.find((r) => r instanceof role);
    if (!toReturn) {
      this._roles.forEach((r) => Tools.Instance.getLogger("app:visite")("ciao"));
      throw new Error(`User is not ${role}`);
    }
    return toReturn;
    // let ruolo: IRuolo | null = null;
    // this._roles.forEach((x) => {
    //   if (x instanceof role) {
    //     ruolo = x;
    //   }
    // });
    // return ruolo;
  }

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
      this.birthDate.toISOString() === user.birthDate.toISOString() &&
      Array.from(this._roles).every((r) => user.getRuolo(typeof r) !== null)
    ) {
      return true;
    }
    return false;
  }
}
