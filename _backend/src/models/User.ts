import IRuolo from "./IRuolo";

export default class User {
  private _roles = new Map<string, IRuolo>();

  constructor(
    private _name: string,
    private _surname: string,
    private _address: string,
    private _birthDate: Date
  ) {}

  public addRole(role: IRuolo): boolean {
    if (this._roles.has(role.getRole())) {
      return false;
    }
    this._roles.set(role.getRole(), role);
    return true;
  }

  public is<T extends IRuolo>(role: T) {
    return this._roles.has(role.getRole());
  }

  public getRuolo<T extends IRuolo>(role: T): T | null {
    if (!this.is(role)) {
      return null;
    }
    return this._roles.get(role.getRole()) as T;
  }

  public rulesCount() {
    return this._roles.size;
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
      this.rulesCount() === user.rulesCount() &&
      Array.from(this._roles)
        .map((x) => x[1])
        .every(
          (r) => user.getRuolo(r) !== null && r.equals(user.getRuolo(r) as IRuolo)
        )
    ) {
      return true;
    }
    return false;
  }
}
