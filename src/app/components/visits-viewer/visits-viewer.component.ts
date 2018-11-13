import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/classes/visit';
import { ViewerGetterService } from 'src/app/services/viewer-getter.service';
import { Patient } from 'src/app/classes/patient';

@Component({
  selector: 'app-visits-viewer',
  templateUrl: './visits-viewer.component.html',
  styleUrls: ['./visits-viewer.component.css']
})
export class VisitsViewerComponent {

  // onSelect(patient: Patient): void {
  //   this.selectedPatient = patient;
  // }
  visits: Visit[];
  effettuate: boolean;

  constructor(private viewerGetter: ViewerGetterService) {
    this.visits = viewerGetter.getVisits(this.selectedPatient);
    // this.patients = viewerGetter.getPatients();
    // console.log(this.visits[0]);
    }

  @Input() selectedPatient: Patient;

filter(): Visit[] {
  if ( this.effettuate === undefined ) {
    return null;
  }
  return  this.visits.filter(x => this.viewerGetter.getEffettuata(x) === this.effettuate);
}

}
