import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportComponent } from './report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';
import { SnackbarService } from '../../services/snackbar.service';
import { compileNgModule } from '@angular/compiler';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule, MaterialModule],
      providers: [SnackbarService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no email found', (() => {
    let noEmailFound = jest.spyOn(component, 'noEmailFound')
    component.noEmailFound(0, "daily")
    expect(noEmailFound).toHaveBeenCalled()
  }))

  it('email submit', (() => {
    let emailSubmit = jest.spyOn(component, 'emailSubmit')
    component.emailSubmit([{
      id: 0,
      email: 'xyz@gmail.com'
    }], "other", 2)
    expect(emailSubmit).toHaveBeenCalledWith([{
      id: 0,
      email: 'xyz@gmail.com',
      currentAdd: true
    }], "other", 2)
  }))

  it('email form show and close', (() => {
    let index = 0;
    let event = true;
    let buttonClose = jest.spyOn(component, 'emailFormClose')
    let buttonShow = jest.spyOn(component, 'emailFormShow')
    let toggle = jest.spyOn(component, 'showSubList')


    //emailForm close
    component.emailFormClose(event, index)
    expect(buttonClose).toHaveBeenCalledWith(event, index)
    let emailShow = component.reportName[index].emailForm
    expect(emailShow).toBe(false)

    //emailForm show
    component.emailFormShow(index)
    expect(buttonShow).toHaveBeenCalledWith(index)
    emailShow = component.reportName[index].emailForm
    expect(emailShow).toBe(true)

    //list toggle 
    component.showSubList(index)
    expect(toggle).toHaveBeenLastCalledWith(index)
    let toggleValue = component.reportName[index].toggle
    expect(toggleValue).toBe(true)

    //edit 


  }))

  it('email delete', (() => {
    let index = 0;
    let deleteButton = jest.spyOn(component, 'subListReportDelete')
    component.subListReportDelete(true, index, 'weekly')
    expect(deleteButton).toHaveBeenCalledWith(true, index, 'weekly')
    let data = component.data.weekly?.length
    expect(data).toBe(0)
  }));

  it('subList Edit and submit', (() => {
    let subListEdit = jest.spyOn(component, 'subListReportEdit');
    component.subListReportEdit(0, 'daily')
    expect(subListEdit).toHaveBeenCalled()
    let perviousData = component.data.daily
    let toggle
    if (perviousData !== undefined) {
      toggle = perviousData[0].edit
    }
    expect(toggle).toBe(true)
  }));


});
