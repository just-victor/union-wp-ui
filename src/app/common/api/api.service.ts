import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";


import {RequestOption} from "./request-option.interface";
import {RequestMethod} from "../enums/http.enum";

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public get<R>(url: string, options?: RequestOption): Observable<HttpResponse<R>> {
    return this.httpClient.request(RequestMethod.GET, url, { ...options, observe: "response" });
  }

  public post<R>(url: string, body?: any, options?: RequestOption): Observable<HttpResponse<R>> {
    return this.httpClient.request(RequestMethod.POST, url, { ...options, body, observe: "response" });
  }

  public put<R>(url: string, body: any, options?: RequestOption): Observable<HttpResponse<R>> {
    return this.httpClient.request(RequestMethod.PUT, url, { ...options, body, observe: "response" });
  }

  public delete<R>(url: string, body?: any, options?: RequestOption): Observable<HttpResponse<R>> {
    return this.httpClient.request(RequestMethod.DELETE, url, { ...options, body, observe: "response" });
  }
}
