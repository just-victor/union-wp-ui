import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainCalendarComponent} from "./components/main-calendar/main-calendar.component";
import {CalendarModule} from "angular-calendar";
import {ReservationModalComponent} from "./components/reservation-modal/reservation-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {CalendarEventService} from "./services/calendar-event.service";
import {CalendarEventDaoService} from "./services/dao/calendar-event.dao.service";
import {HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthService} from "./services/auth.service";
import {UserDataDaoService} from "./services/dao/user-data.dao.service";
import {AuthDaoService} from "./services/dao/auth.dao.service";


@NgModule({
  declarations: [
    MainCalendarComponent,
    ReservationModalComponent,
  ],
  providers: [
    CalendarEventService,
    CalendarEventDaoService,
    AuthService,
    UserDataDaoService,
    AuthDaoService,
  ],
  exports: [
    MainCalendarComponent,
    ReservationModalComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    FontAwesomeModule,
  ]
})
export class MainCalendarModule { }
