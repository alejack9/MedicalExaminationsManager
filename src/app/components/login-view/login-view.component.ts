import { LoginControllerService } from './../../services/login-controller.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {

  private loginController: LoginControllerService;

  constructor(loginController: LoginControllerService) { this.loginController = loginController; }

  checkCredentials(id: number, pwd: string) {
    this.loginController.checkCredentials(id, pwd);
  }

}
