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
  emailEditIndex: number = -1

  reportName = reportName;
  showSubListCondition: number = -1

  data: EmailReports = {
    daily: [
      {
        email: "uttamgaloriya@gmail.com",
        username: 'uttam',
        edit: false
      }, {
        email: "gttamgaloriya@gmail.com",
        username: 'uttam',
        edit: false
      }, {
        email: "xttamgaloriya@gmail.com",
        username: 'uttam',
        edit: false
      },
    ],
    weekly: [{
      email: "uttamgaloriya@gmail.com",
      username: 'uttam',
      edit: false
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

  subListReportEdit(index: number, reportName: 'daily' | 'weekly' | 'other') {
    let perviousData = this.data[reportName];
    if (perviousData !== undefined) {
      perviousData[index].edit = !perviousData[index].edit
    }
  }
  subListReportDelete(event: any, index: number, reportName: 'daily' | 'weekly' | 'other') {
    if (event) {
      this.data[reportName]?.splice(index, 1)
    }
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
    console.log(event)
    event.map((res: any) => res.currentAdd = true)
    console.log(event)
    if (this.data[reportName] === undefined) {
      this.data[reportName] = event;
    } else {
      let perviousData = this.data[reportName];
      perviousData?.map((res: any) => res.currentAdd = false)
      if (perviousData !== undefined) {
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
    setTimeout(() => { this.data[reportName]?.map(res => res.currentAdd = false) }, 3000)

  }

  emailEditClose(event: any, index: number, reportName: 'daily' | 'weekly' | 'other') {
    if (event) {
      let perviousData = this.data[reportName];
      if (perviousData !== undefined) {
        perviousData[index].edit = !perviousData[index].edit
      }
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
