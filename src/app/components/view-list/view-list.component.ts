import { Component, OnInit } from '@angular/core';
import { PATIENTS } from 'src/app/components/patient-list';
import { Patient } from 'src/app/classes/Patient';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  i: number;
  j: 0;
  selectedPatient: Patient;

  patients = PATIENTS;

  constructor() { }

  ngOnInit() {
  }

  onSelect(d: Date)
  {
    for(this.i = 0; this.i < PATIENTS.length; this.i++)
    {
      if(PATIENTS[this.i].date == d.getDate())
      {
         this.selectedPatient = PATIENTS[this.i];
      }
    }
  }
}