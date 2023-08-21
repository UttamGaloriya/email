import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { userProfile } from '../interface/email-reports';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent {
  emailFormControl!: FormControl
  @Output() close = new EventEmitter<unknown>();
  @Output() submit = new EventEmitter<unknown>();
  @Input() emailOBj!: userProfile;
  constructor(public dialog: MatDialog, private snackbar: SnackbarService) {
  }

  ngOnInit() {
    this.emailFormControl = new FormControl(this.emailOBj.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  }

  submitForm(value: string) {
    this.emailOBj.email = value
    this.emailOBj.edit = false
    this.submit.emit(this.emailOBj)
    this.snackbar.showNotification('Data add Success fully', 'X', 'success')
  }

  closeEmailForm() {
    this.dialog.open(DialogBoxComponent, {
      data: {
        heading: "Exit Edit emails ?",
        description: 'A emails has not been Edit.Are you sure you want to leave ?',
        firstButton: 'STAY',
        secondButton: 'EXIT'
      },
      width: '500px'
    }).afterClosed().subscribe((res) => { this.close.emit(res) })
  }

  get emailChange() {
    if (!this.emailFormControl.valid) {
      return true
    } else {
      if (this.emailOBj.email === this.emailFormControl.value) {
        return true
      }
      return false
    }
  }
}
