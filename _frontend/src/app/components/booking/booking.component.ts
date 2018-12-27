import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  IDprescription: string;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.getIDprescription();
  }

  getIDprescription(){
      this.data.currentID.subscribe(id => this.IDprescription = id);
    }

  }
