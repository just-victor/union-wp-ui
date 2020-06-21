export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  HEAD = "HEAD",
  DELETE = "DELETE",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  PATCH = "PATCH"
}

export enum ResponseType {
  ARRAY_BUFFER = "arraybuffer",
  BLOB = "blob",
  JSON = "json",
  TEXT = "text"
}

export enum MimeType {
  PDF = "application/pdf"
}

export enum HttpHeader {
  X_CLIENT_VERSION = "X-Client-Version",
  X_SECURITY_TOKEN = "X-Security-Token",
  AUTHORIZATION = "Authorization",
  X_CLIENT_TOKEN = "X-Client-Token"
}

export enum HttpStatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export enum HttpResponseErrorStatus {
  NOT_FOUND = "NOT_FOUND"
}
