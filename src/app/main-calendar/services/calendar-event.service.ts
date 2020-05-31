import {Injectable} from "@angular/core";
import {CalendarEventDaoService} from "./dao/calendar-event.dao.service";
import {Observable} from "rxjs";
import {MyCalendarEvent} from "../entities/my-calendar-event.entity";

@Injectable()
export class CalendarEventService {
  constructor(
    private  eventDaoService: CalendarEventDaoService,
  ) {
  }

  public getAll(): Observable<MyCalendarEvent[]> {
    return this.eventDaoService.getAll()
  }

  public getById(id: number): Observable<MyCalendarEvent> {
    return this.eventDaoService.getById(id);
  }

  public addNew(calendarEvent: MyCalendarEvent): Observable<MyCalendarEvent> {
    return this.eventDaoService.save(calendarEvent);
  }

  public update(id: number, calendarEvent: MyCalendarEvent): Observable<MyCalendarEvent> {
    return this.eventDaoService.update(id, calendarEvent);
  }

  public delete(id: number): Observable<any> {
    return this.eventDaoService.delete(id);
  }
}
