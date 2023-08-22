import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { EmailFormComponent } from './email-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SnackbarService } from '../../services/snackbar.service';


describe('EmailFormComponent', () => {
  let component: EmailFormComponent;
  let fixture: ComponentFixture<EmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailFormComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule, MaterialModule],
      providers: [SnackbarService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valid email id', fakeAsync(() => {
    let control: AbstractControl;
    control = component.emailCtrl as AbstractControl
    control.setValue('uttam@gmail.com');
    expect(control.valid).toBeTruthy();
  }))

  it('submit button disable', fakeAsync(() => {
    component.email = [{
      id: 1,
      email: 'uttam@gmail.com',
      validStatus: 'duplicate',
    }]
    const submitDisable = component.submitDisable
    expect(submitDisable).toBe(true)
  }))

  it('email are exit', fakeAsync(() => {
    component.email = [{
      id: 1,
      email: 'uttam@gmail.com',
      validStatus: 'duplicate',
    }];
    const exitEmail = component.emailExists('uttam@gmail.com')
    expect(exitEmail).toBe(true)
  }))
});
