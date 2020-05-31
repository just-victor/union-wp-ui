import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";

export class JsonConverter {
  private static instance: JsonConvert;

  public static getInstance(): JsonConvert {
    if (!JsonConverter.instance) {
      JsonConverter.instance = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);
    }

    return JsonConverter.instance;
  }

}
