import { Analyzer } from './../classes/analyzer';
import { FrontOfficer } from './../classes/front-officer';
import { OfficeDoctor } from './../classes/office-doctor';
import { BasicDoctor } from './../classes/basic-doctor';
import { User } from './../classes/user';
import { Injectable } from '@angular/core';
import { Patient } from '../classes/patient';
import { Role } from '../classes/role';


const USERS: Role[] = [
  new Patient       (1010,  'assa',           new User('Alessandro',  'Giacche`', new Date(1997,  12, 27))),
  new BasicDoctor   (1001,  'pippo',          new User('Manuel',      'Cretone',  new Date(1997,  10, 2 ))),
  new OfficeDoctor  (1002,  'camminiminimi',  new User('Alessandra',  'Boccuto',  new Date(1997,  6,  1 ))),
  new FrontOfficer  (1020,  'assa',           new User('Michele',     'Celozzi',  new Date(1997,  4,  13))),
  new Analyzer      (1234,  'admin',          new User('Ale',         'Jack',     new Date(1997,  1,  1 )))
];

@Injectable({
  providedIn: 'root'
})
export class LoginControllerService {

  constructor() { }

  getUser(id: string, password: string): Role {
    const toReturn = USERS[
      USERS.map(
        (u) => u.getId().toString().concat(u.getPassword()))
          .indexOf(id.concat(password))
      ];
    return toReturn === undefined ? null : toReturn;
  }
}
