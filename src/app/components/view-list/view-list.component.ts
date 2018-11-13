import { Component, OnInit } from '@angular/core';
import { PatientControllerService } from 'src/app/services/patient-controller.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
})
export class ViewListComponent implements OnInit {

  x: number;
  p: PatientControllerService;
  patients = [];
  error: boolean;

  constructor(private patientController: PatientControllerService) { }

  ngOnInit() {
  }
  
  onSelect(date: any): void
  {
    this.error = false;
    this.patientController.search(date).subscribe(patients => this.patients = patients);

    if(this.patients.length == 0)
      this.error = true;
  }
}