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

@Injectable()
export class AuthService implements OnInit {
  public userData = new BehaviorSubject<UserData>(null);
  constructor(
    private userDataDaoService: UserDataDaoService,
    private authDaoService: AuthDaoService,
    ) {}

  public ngOnInit(): void {
    this.loadUserData();
  }

  public isAdmin(): boolean {
    return this.userData.getValue()?.isAdmin;
  }

  public login(data: LoginData): void {
    this.authDaoService.login(data).subscribe((token: string) => {
      localStorage.setItem(HttpHeader.X_SECURITY_TOKEN, token);
      this.loadUserData();
    });
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
