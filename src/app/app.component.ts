import { Component } from '@angular/core';
import { Patient } from './classes/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pazienteCorrente = new Patient('Manuel', 'Cretone', 2);
}
