import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';
import { BookingComponent } from './components/booking/booking.component';
@NgModule({
  declarations: [
    AppComponent,
    PrescriptionsComponent,
    AddPrescriptionComponent,
    BookingComponent,
    ViewListComponent,
    LoginViewComponent,
    PasswordDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
