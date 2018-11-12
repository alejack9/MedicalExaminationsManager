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
}
