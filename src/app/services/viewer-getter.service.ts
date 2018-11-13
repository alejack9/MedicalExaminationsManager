import { Injectable } from '@angular/core';
import { Visit } from '../classes/visit';
import { Patient } from '../classes/patient';

@Injectable({
  providedIn: 'root'
})
export class ViewerGetterService {


  constructor() { }

  getVisits() {
    // QUERY ENORME SU DB
    return [
      new Visit(new Patient('', '', 1), 'neurologia', 'qui', new Date(), 1),
      new Visit(new Patient('', '', 1), 'occhi', 'li', new Date(), 1),
      new Visit(new Patient('', '', 1), 'spazio', 'qua', new Date(), 1)

    ];
  }

}
