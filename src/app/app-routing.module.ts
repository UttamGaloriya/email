import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './component/report/report.component';

const routes: Routes = [
  { path: 'report', component: ReportComponent },
  {
    path: '', redirectTo: '/report', pathMatch: 'full'
  },
  { path: '**', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
