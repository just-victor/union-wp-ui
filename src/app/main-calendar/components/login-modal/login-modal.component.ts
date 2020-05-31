import {Component, OnInit} from '@angular/core';

export interface LoginData {
  telephone: string;
  password: string;
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  public loginData: LoginData;

  constructor() { }

  public ngOnInit(): void {
    this.loginData = {password: "", telephone: ""};
  }

}
