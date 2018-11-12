import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginControllerService {

  constructor() { }

  checkCredentials(id: number, password: string) {
    return (id === 1234 && password === 'admin');
  }
}
