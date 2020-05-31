import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter} from "@angular/material/core";
import {MyCalendarEvent} from "../../entities/my-calendar-event.entity";

export interface DialogData {
  calendarEvent: MyCalendarEvent;
  isAdmin: boolean;
  isNewEvent: boolean;
  nextEventDate?: Date;
}

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {
  minDate = new Date();
  event: MyCalendarEvent;
  public APPROVED_MESSAGE = "Ваше время уже подтвержденно, для изменения времени свяжитесь с оператором";

  constructor(
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _adapter: DateAdapter<any>,
  ) {
    _adapter.setLocale('ru');
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public ngOnInit(): void {
    this.event = this.data.calendarEvent;

    if (this.data.isNewEvent) {
      this.event.dateEnd = new Date(this.event.dateStart.getTime() + 1800000);
      this.event.approved = this.data.isAdmin;
    }
  }

  public getTimeTo(): String {
    return `${this.event.dateEnd.getHours()} : ${this.event.dateEnd.getMinutes()}`;
  }

  public getTimeFrom(): String {
    return `${this.event.dateStart.getHours()} : ${this.event.dateStart.getMinutes()}`;
  }

  public increaseTime(): void {
    const newDate = new Date(this.event.dateEnd.getTime() + 1800000);

    if (this.isValidNewDate(newDate)) {
      this.event.dateEnd = newDate;
    }
  }

  public decreaseTime(): void {
    const newDate = new Date(this.event.dateEnd.getTime() - 1800000);

    if (this.isValidNewDate(newDate)) {
      this.event.dateEnd = newDate;
    }
  }

  public totalReservationTime(): number {
    return (this.event.dateEnd.getTime() - this.event.dateStart.getTime()) / 60000;
  }

  private isValidNewDate(newDate: Date): boolean {
    if (newDate.getTime() - this.event.dateStart.getTime() < 1800000) {
      return false;
    }

    if (newDate.getHours() >= 21 && newDate.getMinutes() > 0) {
      return false;
    }

    if (this.data.nextEventDate && this.data.nextEventDate.getTime() < newDate.getTime()) {
      return false;
    }

    return true;
  }

  public disableForUser(): boolean {
    return this.event.approved && !this.data.isAdmin
  }
}
