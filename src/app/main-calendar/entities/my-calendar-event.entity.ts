import {JsonObject, JsonProperty} from "json2typescript";
import {DateConverter} from "../../common/converters/date.converter";
import {CableTypeEnumConverter} from "../../common/converters/cable-type-enum.converter";
import {CableType} from "../../common/enums/cable-type.enum";
import {coerceBooleanProperty} from "@angular/cdk/coercion";


@JsonObject("event")
export class MyCalendarEvent {
  @JsonProperty("id")
  public id?: number = null;
  @JsonProperty("userId")
  public userId: number = null;
  @JsonProperty("userName")
  public userName?: string = null;
  @JsonProperty("dateStart", DateConverter)
  public dateStart: Date = null;
  @JsonProperty("dateEnd", DateConverter)
  public dateEnd?: Date = null;
  @JsonProperty("comment")
  public comment?: string = null;
  @JsonProperty("telephone")
  public telephone?: string = null;
  @JsonProperty("cable", CableTypeEnumConverter)
  public cable: CableType = null;
  @JsonProperty("approved")
  public approved?: boolean = false;

  constructor() {}
}
