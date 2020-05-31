import {EnumConverter} from "./enum.converter";

import {JsonConverter} from "json2typescript";
import {CableType} from "../enums/cable-type.enum";


@JsonConverter
export class CableTypeEnumConverter extends EnumConverter<CableType> {
  protected enumInstance = CableType;
}
