import {JsonCustomConvert} from "json2typescript";

export abstract class EnumConverter<T> implements JsonCustomConvert<T> {
  protected abstract enumInstance: any;

  public serialize(value: any): string | number {
    return value.toString();
  }

  public deserialize(value: string): T {
    return this.enumInstance[value];
  }
}
