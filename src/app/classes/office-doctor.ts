import { User } from './user';
import { Role } from './role';

export class OfficeDoctor implements Role {

  constructor(private _id: number, private _password: string, private _user: User) { }

  getId(): number { return this._id; }
  getPassword(): string { return this._password; }
  getUser(): User { return this._user; }
  getRole(): Role { return this; }
  toString(): string { return 'Dottore d\'Ufficio'; }
}
