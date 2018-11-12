import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/classes/Patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  @Input() patient: Patient;
  
  constructor() { }

  ngOnInit() {
  }

}
