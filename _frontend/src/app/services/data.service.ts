import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private IDscelto = new BehaviorSubject("");
  currentID = this.IDscelto.asObservable();

  constructor() { }

  saveID(id1: string ){
    this.IDscelto.next(id1);
  }
}
