import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prescription } from '../classes/prescription';
import { LISTPRESCRIPTIONS } from '../prescriptionsDB';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor() { }

  getPrescriptions(): Observable<Prescription[]> {
  return of(LISTPRESCRIPTIONS);
  }
// code length must be 14
  checkPrescription(cod: string): boolean {
    // tslint:disable-next-line:curly
    if (cod.length !== 14 )  return false;
    return true;
  }

  addPrescription(cod: string): void {
    LISTPRESCRIPTIONS.push(new Prescription(cod, '', 999999));
  }
}
