import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginData, LoginModalComponent} from "../login-modal/login-modal.component";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    ) { }

  public ngOnInit(): void {
    this.authService.ngOnInit();
  }

  public login(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data: LoginData) => {
      data.password = btoa(data.password);
      this.authService.login(data);
    })
  }

  public logout(): void {
    this.authService.logout();
  }

  public registration(): void {
    console.log("ЛОЛ БЛЯЕР");
  }
}
