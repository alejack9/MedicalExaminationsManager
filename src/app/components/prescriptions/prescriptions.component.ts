import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { Prescription } from 'src/app/classes/prescription';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {
  OKcode:boolean;
  errormessage = "Codice non valido";
  idscelto: string;
  timeToAdd = 0;
  timeToBook = 0;
  prescriptions: Prescription[];

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit() {
    this.getPrescriptions();
  }

  getPrescriptions(): void{
    this.prescriptionService.getPrescriptions().subscribe(prescriptions => this.prescriptions = prescriptions);
  }

  itsTimeToAdd() : void {
    this.timeToAdd = 1 ;
  }

  enableBooking(id: string):void {
    this.timeToBook = 1;
    this.idscelto = id;
  }
  checkCode(codice:string):boolean{
    if (this.prescriptionService.checkPrescription(codice)) {
      this.prescriptionService.addPrescription(codice);
        this.OKcode = true;
      this.getPrescriptions();
      return true;
    }
    this.OKcode = false;
    return false;
  }
}