import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {ApiService} from "../../../common/api/api.service";
import {HttpResponseWrapper} from "../../../common/http-response-wrapper";
import {MyCalendarEvent} from "../../entities/my-calendar-event.entity";
import {JsonConverter} from "../../../common/json-converter.service";


@Injectable()
export class CalendarEventDaoService {
  private static readonly URL = `api/events/`;

  constructor(private apiService: ApiService) {}

  public getAll(): Observable<MyCalendarEvent[]> {
    return this.apiService.get(CalendarEventDaoService.URL)
      .pipe(map((response: HttpResponseWrapper<MyCalendarEvent[]>) => {
        if (response.body && response.body.body) {
          return JsonConverter.getInstance().deserializeArray(response.body.body, MyCalendarEvent);
        }
        CalendarEventDaoService.handleResponseError();
      }));
  }

  public getById(id: number): Observable<MyCalendarEvent> {
    return this.apiService.get(`${CalendarEventDaoService.URL}/${id}`)
      .pipe(map((response: HttpResponseWrapper<MyCalendarEvent>) => {
        if (response.body && response.body.body) {
          return JsonConverter.getInstance().deserializeObject(response.body.body, MyCalendarEvent);
        }
        CalendarEventDaoService.handleResponseError();
      }));
  }

  private static handleResponseError(): void {
    throw Error("Response is not valid");
  }

  public save(calendarEvent: MyCalendarEvent): Observable<MyCalendarEvent> {
    return this.apiService.post(CalendarEventDaoService.URL, calendarEvent)
      .pipe(map((response: HttpResponseWrapper<MyCalendarEvent>) => {
        if (response.body && response.body.body) {
          return JsonConverter.getInstance().deserializeObject(response.body.body, MyCalendarEvent);
        }
        CalendarEventDaoService.handleResponseError();
      }));
  }

  public update(id: number, calendarEvent: MyCalendarEvent): Observable<MyCalendarEvent> {
    return this.apiService.put(`${CalendarEventDaoService.URL}/${id}`, calendarEvent)
      .pipe(map((response: HttpResponseWrapper<MyCalendarEvent>) => {
        if (response.body && response.body.body) {
          return JsonConverter.getInstance().deserializeObject(response.body.body, MyCalendarEvent);
        }
        CalendarEventDaoService.handleResponseError();
      }));
  }

  public delete(id: number): Observable<any> {
    return this.apiService.delete(`${CalendarEventDaoService.URL}/${id}`)
      .pipe(map((response: HttpResponseWrapper<MyCalendarEvent>) => {
        if (response.status === 200 ||  response.status === 204) {
          return of(null);
        }
        CalendarEventDaoService.handleResponseError();
      }));
  }
}
