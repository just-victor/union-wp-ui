import {Injectable} from "@angular/core";
import {ApiService} from "../../../common/api/api.service";
import {LoginData} from "../../components/login-modal/login-modal.component";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponseWrapper} from "../../../common/http-response-wrapper";

@Injectable()
export class AuthDaoService {
  private static readonly URL = `api/auth/`;

  constructor(private apiService: ApiService) {}

  public login(loginData: LoginData): Observable<String> {
    return this.apiService.post(`${AuthDaoService.URL}login`, loginData)
      .pipe(map((response: HttpResponseWrapper<String>) => {
        return response.body?.body;
      }))
  }
}
