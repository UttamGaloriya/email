import { Component } from '@angular/core';
import { reportName } from 'src/app/shared/emailList';
import { EmailReports } from 'src/app/shared/interface/email-reports';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  panelOpenState = false;
  emailShow = false
  reportName = reportName;
  showSubListCondtion: number = -1
  reportsData!: EmailReports;
  data: EmailReports = {
    daily: [
      {
        email: "uttamgaloriya@gmail.com",
        username: 'uttam'
      }, {
        email: "gttamgaloriya@gmail.com",
        username: 'uttam'
      }, {
        email: "xttamgaloriya@gmail.com",
        username: 'uttam'
      },
    ],
    weekly: [{
      email: "uttamgaloriya@gmail.com",
      username: 'uttam'
    }]
  }
  constructor() { }
  ngOnInit(): void {
    this.reportsData = this.data
    console.log(Object.keys(this.data))
  }

  reportsName() {
    return Object.keys(this.data)
  }

  reportsEmailList(reportName: 'daily' | 'weekly' | 'other') {
    return this.data[reportName] || null
  }

  subListReportEdit() {
  }
  subListReportDelete() {
  }

  showSubList(index: number) {
    if (this.showSubListCondtion === index) {
      this.showSubListCondtion = -1
    } else {
      this.showSubListCondtion = index
    }
    this.emailShow = false
  }


  emailFormShow() {
    this.emailShow = true
  }
  emailFormClose() {

  }
  emailSubmit(event: any, reportName: 'daily' | 'weekly' | 'other') {
    console.log(event)
  }
}
