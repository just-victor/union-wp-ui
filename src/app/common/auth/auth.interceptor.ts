import { Observable } from "rxjs";
import { Injectable, Provider } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {ResponseType} from "../enums/http.enum";
import {AuthService} from "../../main-calendar/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (req.url.includes(authConfig.issuer)) {
    //   return next.handle(req);
    // }

    if (!req.responseType) {
      req = req.clone({ responseType: ResponseType.JSON });
    }

    if (!req.headers.has("Content-Type") && !(req.body instanceof FormData)) {
      req = req.clone({ headers: req.headers.set("Content-Type", "application/json") });
    }

    if (this.authService.securityToken) {
      req = req.clone({
        headers: req.headers.set("X-Security-Token", this.authService.securityToken)
      });
    }

    req = req.clone( {
      headers: req.headers
        .set("Cache-Control", "no-cache")
        .set("Pragma", "no-cache")
        .set("Expires", "0")
    });

    return next.handle(req);
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
