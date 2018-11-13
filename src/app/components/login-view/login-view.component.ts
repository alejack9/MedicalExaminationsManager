import { Role } from './../../classes/role';
import { LoginControllerService } from './../../services/login-controller.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
})
export class LoginViewComponent {

  isBannerHidden = true;
  role: Role;
  private loginController: LoginControllerService;

  constructor(loginController: LoginControllerService) { this.loginController = loginController; }

  checkCredentials(id: string, pwd: string) {
    this.role = this.loginController.getUser(id, pwd);
    this.isBannerHidden = this.role === null;
  }

  isLogged () { return !(this.role === undefined || this.role === null); }
}
