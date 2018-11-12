import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PrescriptionsComponent,
    PrescriptionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
