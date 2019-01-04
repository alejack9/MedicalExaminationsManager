import { Injectable } from '@angular/core';
import { Examination } from '../classes/examination';
import { Patient } from '../classes/patient';

@Injectable({
  providedIn: 'root'
})
export class ViewerGetterService {


  constructor() { }

  getVisits(patient: Patient ) {
    // QUERY ENORME SU DB
    return [
      new Examination( 'neurologia', 'Ospedale Teramo', new Date(), 1, true),
      new Examination( 'occhi', 'Ospedale Ascoli Piceno', new Date(), 1, false),
      new Examination( 'spazio', 'Ospedale Ancona', new Date(), 1, true)
    ];
  }

  getEffettuata(visit: Examination) {
    return visit.effettuata === true;
  }

  // getPatients() {
  //   return[
  //     new Patient('Alessandro', 'Giacchè', 1, this.getVisits()[1]),
  //      this.getVisits()[0]),
  //     new Patient('Michele', 'Celozzi', 3, this.getVisits()[2]),
  //     new Patient('Alessandra', 'Boccuto', 4)
  //   ];
  // }
}
