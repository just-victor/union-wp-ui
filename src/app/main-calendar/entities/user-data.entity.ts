import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("userData")
export class UserData {
  @JsonProperty("id")
  public id: number = null;
  @JsonProperty("name")
  public name: string = null;
  @JsonProperty("telephone")
  public telephone: string = null;
  @JsonProperty("isAdmin")
  public isAdmin: boolean = false;
}
