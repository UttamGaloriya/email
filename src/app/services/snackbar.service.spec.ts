import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackbarService } from './snackbar.service';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule,],
      providers: [SnackbarService]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('snackbar value show', () => {
    const snackBar = jest.spyOn(service, 'showNotification');
    service.showNotification('data add successfully', 'ok', 'error');
    expect(snackBar).toHaveBeenCalledWith('data add successfully', 'ok', 'error');
  });

});
