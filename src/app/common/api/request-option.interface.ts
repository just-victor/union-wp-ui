import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface RequestOption {
  headers?: HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  withCredentials?: boolean;
}
