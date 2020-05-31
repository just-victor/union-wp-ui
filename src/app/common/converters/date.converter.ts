import { JsonConverter, JsonCustomConvert } from "json2typescript";


@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> {
  public serialize(date: Date | string): any {

    let dateNumber = Date.parse(date.toString());
    return dateNumber;
  }

  public deserialize(date: any): Date {

    return new Date(date);
  }
}
