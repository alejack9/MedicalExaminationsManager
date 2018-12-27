import { Injectable } from '@angular/core';
import { PATIENTS } from 'src/app/components/patient-list';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PatientControllerService {

  i: number;
  error: boolean;
  arrayPatients = [];

  constructor() { }

  search(date: Date): Observable<any[]> {
    this.arrayPatients = [];
    for (this.i = 0; this.i < PATIENTS.length; this.i++) {
      console.log(PATIENTS[this.i].getVisits()[0].Data.toDateString() , new Date(date).toDateString());
      // tslint:disable-next-line:curly
      if (PATIENTS[this.i].getVisits()[0].Data.toDateString() === new Date(date).toDateString())
        this.arrayPatients.push(PATIENTS[this.i]);
    }

    return of(this.arrayPatients);
  }
}
