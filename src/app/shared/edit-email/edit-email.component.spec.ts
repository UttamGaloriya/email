import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailComponent } from './edit-email.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';
import { SnackbarService } from '../../services/snackbar.service';

describe('EditEmailComponent', () => {
  let component: EditEmailComponent;
  let fixture: ComponentFixture<EditEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmailComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule, MaterialModule],
      providers: [SnackbarService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email validation', (() => {
    let email: AbstractControl
    email = component.emailFormControl
    expect(email.valid).toBe(false)
  }))

  it('submit button disable', (() => {
    let submitButton = component.emailChange
    expect(submitButton).toBe(true)
  }))
});
