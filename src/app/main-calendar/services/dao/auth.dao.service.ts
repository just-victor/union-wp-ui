import {Injectable} from "@angular/core";
import {ApiService} from "../../../common/api/api.service";
import {LoginData} from "../../components/login-modal/login-modal.component";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponseWrapper} from "../../../common/http-response-wrapper";
import {HttpHeaders} from "@angular/common/http";
import {HttpHeader} from "../../../common/enums/http.enum";

@Injectable()
export class AuthDaoService {
  private static readonly LOGIN_URL = `api/auth/`;
  private static readonly USER_URL = `api/users`;

  constructor(private apiService: ApiService) {}

  public login(loginData: LoginData): Observable<String> {
    return this.apiService.post(`${AuthDaoService.LOGIN_URL}login`, loginData)
      .pipe(map((response: HttpResponseWrapper<String>) => {
        return response.body?.body;
      }))
  }

  public register(loginData: LoginData): Observable<String> {
    const headers = new HttpHeaders().append(HttpHeader.AUTHORIZATION, loginData.password);
    return this.apiService.post(`${AuthDaoService.USER_URL}`, loginData, {headers})
      .pipe(map((response: HttpResponseWrapper<String>) => {
        console.log(response);
        return response.body?.body;
      }))
  }
}
