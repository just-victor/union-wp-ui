import { HttpResponse } from "@angular/common/http";

export class HttpResponseWrapper<T> extends HttpResponse<T> {
  public readonly body: { body: T | any } | any;
}
