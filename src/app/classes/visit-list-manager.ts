
import { Patient } from './patient';
import { Examination } from './examination';
export class VisitListManager {

// field
 // patient: Patient;
 // visite = new Collections.Set<Visit>();
visite: Examination[];        // declaration

// constructor
constructor(visite ) {
  this.visite = visite;
}

// function

// public addVisit(visita: Visit) {
// this.visite.add(visita);
// }

public searchVisit(patient, visite) {
  for (let i = 0; i < visite.length; i++) {
    if ( patient.id === visite[i].patient.id) {
      console.log( patient.Print() + ' visita' + visite[i].toString()) ;
    }
  }
}
}