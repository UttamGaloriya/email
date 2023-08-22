import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { SnackbarService } from '../../services/snackbar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule, MaterialModule],
      providers: [SnackbarService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit button', () => {
    let editButtonSpy = jest.spyOn(component, 'editButton');
    component.editButton();
    expect(editButtonSpy).toHaveBeenCalled();
    editButtonSpy.mockRestore()
  });

  it('delete button', () => {
    let deleteButton = jest.spyOn(component, 'deleteButton');
    component.deleteButton();
    expect(deleteButton).toHaveBeenCalled();
    deleteButton.mockRestore()
  })

});
