import { Component, OnInit } from '@angular/core';
import { PATIENTS } from 'src/app/components/patient-list';
import { Patient } from 'src/app/classes/Patient';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
})
export class ViewListComponent implements OnInit {

  i: number;

  constructor() { }

  ngOnInit() {
  }

  patients = [];
  error: string;
  
  search(date: any) 
  {
    this.patients = [];

    for(this.i = 0; this.i < PATIENTS.length; this.i++)
    {
      if(PATIENTS[this.i].date == date)
        this.patients.push(PATIENTS[this.i]);
      else if(this.patients.length == 0 && this.i == PATIENTS.length)
        this.patients.push("Nobody patient for the chosen day");
    }
  }
}