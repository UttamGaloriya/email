import { Component } from '@angular/core';
import { reportName } from 'src/app/shared/emailList';
import { EmailReports, userProfile } from 'src/app/shared/interface/email-reports';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  panelOpenState = false;
  emailShow = false
  emailEditIndex: number = -1
  reportName = reportName;
  showSubListCondition: number = -1

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
  ngOnInit() {
    this.reportName.map(res => res.toggle = false)
  }
  reportsName() {
    return Object.keys(this.data)
  }

  reportsEmailList(reportName: 'daily' | 'weekly' | 'other') {
    return this.data[reportName] || null
  }

  subListReportEdit(index: number) {
    this.emailEditIndex = index
  }
  subListReportDelete() {
  }

  showSubList(index: number) {
    this.reportName[index].toggle = !this.reportName[index].toggle
  }

  emailFormShow() {
    this.emailShow = true
  }

  emailFormClose(event: any) {
    if (event) {
      this.emailShow = false
    }
  }

  emailSubmit(event: any, reportName: 'daily' | 'weekly' | 'other') {

    if (this.data[reportName] === undefined) {
      this.data[reportName] = event;
    } else {
      let perviousData = this.data[reportName];
      if (perviousData !== undefined) {
        console.log(perviousData, event)
        const mergedArray = [...perviousData, ...event].reduce((acc, obj) => {
          const existingObj = acc.find((item: any) => item.email === obj.email);
          if (!existingObj) {
            acc.push(obj);
          }
          return acc;
        }, []);
        this.data[reportName] = mergedArray;
      } else {
        console.log("perviousData is undefined");
      }
    }

    this.emailShow = false
  }

  emailEditClose(event: any) {
    if (event) {
      this.emailEditIndex = -1
    }
  };

  emailEditSubmit(event: any, index: number, reportName: 'daily' | 'weekly' | 'other') {
    let perviousData = this.data[reportName];
    if (perviousData !== undefined) {
      perviousData[index] = event
    }
    this.emailEditIndex = -1
  }
}
