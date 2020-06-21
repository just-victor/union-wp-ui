import {Injectable, OnInit} from "@angular/core";
import {UserDataDaoService} from "./dao/user-data.dao.service";
import {UserData} from "../entities/user-data.entity";
import {map} from "rxjs/operators";
import {HttpResponseWrapper} from "../../common/http-response-wrapper";
import {JsonConverter} from "../../common/json-converter.service";
import {LoginData} from "../components/login-modal/login-modal.component";
import {AuthDaoService} from "./dao/auth.dao.service";
import {HttpHeader} from "../../common/enums/http.enum";
import {BehaviorSubject} from "rxjs";
import {SnackBarComponent} from "../components/snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthService implements OnInit {
  public userData = new BehaviorSubject<UserData>(null);
  constructor(
    private userDataDaoService: UserDataDaoService,
    private authDaoService: AuthDaoService,
    private _snackBar: MatSnackBar,
    ) {}

  public ngOnInit(): void {
    this.loadUserData();
  }

  public isAdmin(): boolean {
    return this.userData.getValue()?.isAdmin;
  }

  openSnackBar(message: string, matType: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message
      },
      panelClass: ['mat-toolbar', matType],
      verticalPosition: "top"
    });
  }

  public login(data: LoginData): void {
    if (!data.telephone) {
      return;
    }

    data.telephone = '+380' + data.telephone;
    this.authDaoService.login(data).subscribe((token: string) => {
      localStorage.setItem(HttpHeader.X_SECURITY_TOKEN, token);
      this.loadUserData();
    }, error => {
      this.openSnackBar(error.error.message, 'mat-warn');
    });
  }

  public register(data: LoginData): void {
    if (!data.telephone) {
      return;
    }

    data.telephone = '+380' + data.telephone;
    this.authDaoService.register(data).subscribe((s: string) => {
      this.openSnackBar("Вы успешно зарегистрированы", 'mat-accent');
    }, error => {
      this.openSnackBar(error.error.message, 'mat-warn');
    })
  }

  public get securityToken(): string {
    return localStorage.getItem(HttpHeader.X_SECURITY_TOKEN);
  }

  public isAuthorized(): boolean {
    return !!this.userData.getValue();
  }

  private loadUserData(): void {
    if (!this.securityToken) {
      return;
    }
    this.userDataDaoService.getUserData()
      .pipe(map((response: HttpResponseWrapper<UserData>) => {
        if (response.body && response.body.body) {
          return JsonConverter.getInstance().deserializeObject(response.body.body, UserData);
        }
        return null;
      }))
      .subscribe((user: UserData) => {
        this.userData.next(user);
      }, (error) => {
        this.logout();
      });
  }

  public logout(): void {
    localStorage.removeItem(HttpHeader.X_SECURITY_TOKEN);
    this.userData.next(null);
  }
}
