import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import localeRu from '@angular/common/locales/ru'
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {registerLocaleData} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainCalendarModule} from "./main-calendar/main-calendar.module";
import {ApiService} from "./common/api/api.service";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {authInterceptorProvider} from "./common/auth/auth.interceptor";
import {MainHeaderComponent} from './main-calendar/components/main-header/main-header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {LoginModalComponent} from './main-calendar/components/login-modal/login-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    MainCalendarModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [
    ApiService,
    authInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
