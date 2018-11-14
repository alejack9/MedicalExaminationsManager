import { Visit } from 'src/app/classes/visit';
import { User } from './user';
import { Role } from './role';
export class Patient implements Role {

  constructor(private _id: number, private _password: string, private _user: User, private _visits?: Visit[]) { }

  getVisits(): Visit[] { return this._visits; }

  getId(): number { return this._id; }
  getPassword(): string { return this._password; }
  getUser(): User { return this._user; }
  getRole(): Role { return this; }
  toString(): string { return 'Paziente'; }
}
