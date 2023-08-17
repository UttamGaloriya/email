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

  subListReportEdit(index: number) {
    this.emailEditIndex = index
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
  emailFormClose(event: any) {
    if (event) {
      this.emailShow = false
    }
  }
  emailSubmit(event: any, reportName: 'daily' | 'weekly' | 'other') {
    const currentData = event.map((res: any) => {
      return {
        id: 0,
        email: res
      }
    });

    if (this.data[reportName] === undefined) {
      this.data[reportName] = currentData;
    } else {
      let perviousData = this.data[reportName];
      if (perviousData !== undefined) {
        console.log(perviousData, currentData)
        const mergedArray = [...perviousData, ...currentData].reduce((acc, obj) => {
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
  //email Edit
  emailEditClose(event: any) {
    if (event) {
      this.emailEditIndex = -1
    }
  };

  emailEditSubmit(event: any, index: number, reportName: 'daily' | 'weekly' | 'other') {
    let perviousData = this.data[reportName];
    if (perviousData !== undefined) {
      perviousData[index] = {
        id: 0,
        email: event
      }
    }
    this.emailEditIndex = -1
  }
}
