import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prescription } from '../classes/prescription';
import { LISTPRESCRIPTIONS } from '../fake_prescriptions';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor() { }

  getPrescriptions(): Observable<Prescription[]> {
  return of(LISTPRESCRIPTIONS);
  }

  checkPrescription(cod:string):boolean {
    if (cod === "111") return false;
    return true;
  }

  addPrescription(cod:string):void{
    LISTPRESCRIPTIONS.push({ID: cod});
  }
}
