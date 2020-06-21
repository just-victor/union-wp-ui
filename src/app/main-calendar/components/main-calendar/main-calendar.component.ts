import {ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarView,} from 'angular-calendar';
import {Subject} from "rxjs";
import {CustomDateFormatter} from './custom-date-formatter.provider';
import {DialogData, ReservationModalComponent} from "../reservation-modal/reservation-modal.component";
import {MatDialog} from '@angular/material/dialog';
import {CalendarEventService} from "../../services/calendar-event.service";
import {MyCalendarEvent} from "../../entities/my-calendar-event.entity";
import {CableType} from "../../../common/enums/cable-type.enum";
import {AuthService} from "../../services/auth.service";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#19e371',
    secondary: '#c8fdd9',
  },
};

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    }
  ]
})
export class MainCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  refresh: Subject<any> = new Subject();
  @Input() locale: string = 'ru';
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  eventsLeftCable: CalendarEvent<MyCalendarEvent>[] = [];
  eventsRightCable: CalendarEvent<MyCalendarEvent>[] = [];
  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.calendarEventService.delete(event.meta.id)
          .subscribe(() => {
            this.loadData();
          });
      },
    },
  ];

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private calendarEventService: CalendarEventService,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.calendarEventService.getAll().subscribe((events: MyCalendarEvent[]) => {
      const mappedEvents: CalendarEvent[] = events.map((event: MyCalendarEvent) => {
        return {
          id: event.id,
          start: new Date(event.dateStart),
          end: new Date(event.dateEnd),
          title: this.getEventTitle(event),
          actions: this.isEventAvailable(event) ? this.actions : null,
          color: this.getEventColor(event),
          meta: event,
        };
      });

      this.eventsRightCable = mappedEvents.filter(event => event.meta.cable === CableType.RIGHT);
      this.eventsLeftCable = mappedEvents.filter(event => event.meta.cable === CableType.LEFT);
    })
  }

  private getEventColor(event: MyCalendarEvent): any {
    return event.approved ? colors.green : colors.yellow;
  }
  public setView(view: CalendarView) {
    this.view = view;
  }

  public openDialog(calendarEvent: MyCalendarEvent, isNewEvent: boolean): void {
    const dialogData: DialogData = {
      calendarEvent,
      nextEventDate: this.getNextEventDate(calendarEvent.dateStart, calendarEvent.cable),
      isAdmin: this.authService.userData.getValue()?.isAdmin,
      isNewEvent: isNewEvent,
    };

    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (!result) {
        return;
      }

      if (result.isNewEvent) {
        this.calendarEventService.addNew(result.calendarEvent)
          .subscribe(response => {
            this.loadData();
          });
      } else {
        this.calendarEventService.update(result.calendarEvent.id, result.calendarEvent)
          .subscribe(response => {
            this.loadData();
          });
      }
    });
  }

  public dayClicked({ date }: { date: Date }): void {
    let currentDate = new Date();

    // if (date.getDate() == currentDate.getDate() && currentDate.getHours() < 21) {
    //   this.viewDate = date;
    //   this.setView(CalendarView.Day);
    // }

    if (date.getDate() >= currentDate.getDate() || this.authService.isAdmin()) {
      this.viewDate = date;
      this.setView(CalendarView.Day);
    }
  }

  public hourClicked(cableType: CableType, date: Date) {
    if (!this.authService.isAuthorized()) {
      return;
    }
    if (date.getTime() >= new Date().getTime()) {
      const userData = this.authService.userData.getValue();
      this.openDialog({
        dateStart: date,
        userId: userData.id,
        telephone: this.authService.isAdmin() ? "" : userData.telephone,
        userName: this.authService.isAdmin() ? "" : userData.name,
        cable: cableType},
        true);
    }
  }

  public eventClick($event: any) {
    if (this.isEventAvailable($event.event.meta)) {
      this.calendarEventService.getById($event.event.id)
        .subscribe((event: MyCalendarEvent) => {
          this.openDialog(event, false);
      });
    }
  }

  private isEventAvailable(event: MyCalendarEvent): boolean {
    if (!this.authService.isAuthorized()) {
      return false;
    }
    const userData = this.authService.userData.getValue();
    if (this.authService.isAdmin() || userData.id === event.userId) {
      return true;
    }
    return false;
  }

  public getAllEvents(): CalendarEvent[] {
    return [...this.eventsLeftCable, ...this.eventsRightCable];
  }

  private getNextEventDate(newEventTime: Date, cable: CableType): Date {
    const events = cable === CableType.RIGHT
      ? this.eventsRightCable
      : this.eventsLeftCable;
    if (events.length === 0) {
      return undefined;
    }

    return events.map((event: CalendarEvent) => event.start)
      .sort((a,b) => a.getTime() - b.getTime())
      .find((date: Date) => date.getTime() > newEventTime.getTime());
  }

  private getEventTitle(event: MyCalendarEvent): string {
    const comment = this.isEventAvailable(event) ? `${event.comment ? event.comment : ''}` : "";
    return  `${event.userName} | ${(event.dateEnd.getTime() - event.dateStart.getTime()) / 60000} минут | ${comment}`;
  }

  public getFormattedDay(): string {
    let currentDay = 0;
    if (this.view == CalendarView.Day) {
       currentDay = new Date().getDate();
    } else {
      currentDay = new Date().getMonth();
    }

    return currentDay > 9 ? `${currentDay}` : `0${currentDay}`
  }
}
