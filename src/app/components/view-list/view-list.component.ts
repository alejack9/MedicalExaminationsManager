/**
 * @author Michele Celozzi
 * @email michele.celozzi@studenti.unicam.it
 * @create date 2018-11-14 10:40:29
 * @modify date 2018-11-14 10:40:29
 * @desc [description]
*/
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

  onSelect(date: Date): void {
    this.error = false;
    this.patientController.search(date).subscribe(patients => this.patients = patients);

    // tslint:disable-next-line:curly
    if (this.patients.length === 0)
      this.error = true;
  }
}
