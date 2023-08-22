import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportComponent } from './report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';
import { SnackbarService } from '../../services/snackbar.service';

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
});
