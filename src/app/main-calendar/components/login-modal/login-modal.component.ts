import {Component, OnInit} from '@angular/core';

export interface LoginData {
  name?: string;
  telephone: string;
  password?: string;
  isLoginRequest?: boolean;
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  public loginData: LoginData;
  public hide = true;

  constructor() { }

  public ngOnInit(): void {
    this.loginData = {password: "", telephone: "", isLoginRequest: true};
  }

  public isValid(): boolean {
    const phone = this.loginData.telephone;
    const password = this.loginData.password;

    return !phone || 9 > phone.length || !password || password.length < 4;
  }

  public register() {
    this.loginData.isLoginRequest = false;
  }

  public login() {
    this.loginData.isLoginRequest = true;
  }
}
