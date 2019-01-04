import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { Prescription } from 'src/app/classes/prescription';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  idscelto: string;
  timeToAdd = 0;
  timeToBook = 0;
  prescriptions: Prescription[];

  constructor(
    private prescriptionService: PrescriptionService,
    private data: DataService
    ) { }

  ngOnInit() {
    this.getPrescriptions();
  }

  getPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe(prescriptions => this.prescriptions = prescriptions);
  }

  itsTimeToAdd(): void {
    this.timeToAdd = 1 ;
  }

  enableBooking(id: string): void {
    this.timeToBook = 1;
    this.idscelto = id;
    this.data.saveID(this.idscelto);
  }
}
