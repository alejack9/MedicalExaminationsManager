import { Component, OnInit, Input } from '@angular/core';
import { Visit } from 'src/app/classes/visit';
import { ViewerGetterService } from 'src/app/services/viewer-getter.service';

@Component({
  selector: 'app-visits-viewer',
  templateUrl: './visits-viewer.component.html',
  styleUrls: ['./visits-viewer.component.css']
})
export class VisitsViewerComponent {

  visits: Visit[];

  constructor(viewerGetter: ViewerGetterService) {
    this.visits = viewerGetter.getVisits();
    console.log(this.visits[0]);
    }

}
