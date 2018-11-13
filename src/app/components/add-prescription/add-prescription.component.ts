import { Component, OnInit, Output } from '@angular/core';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  OKcode:boolean;
  errormessage = "Codice non valido";

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit() {
  }

  checkCode(codice:string):boolean{
    if (this.prescriptionService.checkPrescription(codice)) {
        this.prescriptionService.addPrescription(codice);
        this.OKcode = true;
      return true;
    }
    this.OKcode = false;
    return false;
  }
}
