import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';

const routes: Routes = [
{path : 'prescriptions', component: PrescriptionsComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
