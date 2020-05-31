import {Injectable} from "@angular/core";
import {ApiService} from "../../../common/api/api.service";
import {Observable} from "rxjs";
import {UserData} from "../../entities/user-data.entity";
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class UserDataDaoService {
  private static readonly URL = `api/users/`;

  constructor(private apiService: ApiService) {}

  public getUserData(): Observable<HttpResponse<UserData>> {
    return this.apiService.get(`${UserDataDaoService.URL}getUserData`);
  }
}
