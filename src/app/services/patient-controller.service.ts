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

  search(date: any): Observable<any[]>
  {
    this.arrayPatients = [];

    for(this.i = 0; this.i < PATIENTS.length; this.i++)
    {
      if(PATIENTS[this.i].date == date)
        this.arrayPatients.push(PATIENTS[this.i]);
    }

    return of(this.arrayPatients);
  }
}