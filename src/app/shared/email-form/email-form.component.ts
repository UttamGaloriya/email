import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { emailList } from '../emailList';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { userProfile } from '../interface/email-reports';
@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent {
  @Output() close = new EventEmitter<unknown>();
  @Output() submit = new EventEmitter<unknown>();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  filteredEmail!: Observable<any[]>;
  email: userProfile[] = [];
  allEmail: any[] = emailList
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(public dialog: MatDialog) {
    this.filteredEmail = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => (email ? this._filter(email) : this.allEmail.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value !== '') {
      console.log(value)
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
      let dataPush = false
      if (value != '') {
        dataPush = true
      }
      if (dataPush) {
        let inputProfile = {
          id: 0,
          email: value,
        }
        this.email.push(inputProfile);
      }
      this.emailCtrl.setValue(null);
      //validation
      if (!emailPattern.test(value)) {
        let i = this.email.length
        this.email[i - 1].validStatus = 'inValid'
        this.emailCtrl.setValue(null);
        this.emailCtrl.setErrors({ pattern: true });
      } else {
        this.emailCtrl.setErrors({ required: false });
      }
    } else {
      this.emailCtrl.setValue(null);
      this.emailCtrl.setErrors({ pattern: false });
      this.emailCtrl.setErrors({ required: false });
    }
    //condition
    this.emailDuplicate()
    event.chipInput!.clear();
  }

  remove(index: number): void {
    let removeData = this.email[index]
    let tempEmail = [...this.email]
    let totalRemove = this.email.filter(res => res.email == removeData.email)
    if (totalRemove.length > 2) {
      for (let i = 1; i < totalRemove.length; i++) {
        let deleteIndex = this.email.findIndex(res => res.email == removeData.email)
        this.email.splice(deleteIndex, 1);
      }
    } else {
      this.email.splice(index, 1);
    }
    this.email.map((res) => {
      if (res.email === removeData.email) {
        res.validStatus = ''
      }
    })
    //show error
    let validStatus = this.email.filter(res => res.validStatus == 'duplicate')
    if (validStatus.length == 0) {
      this.emailCtrl.setErrors({ duplicate: false });
    } else {
      this.emailCtrl.setErrors({ duplicate: true });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emailCtrl.setValue(null);
    this.emailCtrl.setErrors({ required: false });
    this.email.push(event.option.value);
    this.emailInput.nativeElement.value = '';
    this.emailDuplicate()
  }

  //filter
  emailExists(email: string): boolean {
    return this.email.some((res) => res.email === email);
  }
  private _filter(value: any) {
    if (typeof (value) == 'string') {
      const filterValue = value.toLowerCase();
      return this.allEmail.filter((res) => res.email.toLowerCase().includes(filterValue) && !this.emailExists(res.email))
    } else {
      const filterValue = value.email.toLowerCase();
      return this.allEmail.filter((res) => res.email.toLowerCase().includes(filterValue) && !this.emailExists(res.email))
    }
  }

  closeEmailForm() {
    if (this.email.length !== 0 || this.emailCtrl.value !== '') {
      this.dialog.open(DialogBoxComponent, {
        data: {
          heading: "Exit add emails ?",
          description: 'A emails has not been added.Are you sure you want to leave',
          firstButton: 'STAY',
          secondButton: 'EXIT'
        },
        width: '500px'
      }).afterClosed().subscribe((res) => {
        this.close.emit(res); if (res) {
          this.email = [], this.emailCtrl.setValue(null),
            this.emailInput.nativeElement.value = '';
          this.emailCtrl.setErrors({ require: false })
        }
      })
    } else {
      this.close.emit(true)
    }
  }

  submitForm() {
    this.submit.emit(this.email)
    this.email = []
  }

  emailDuplicate() {
    let emailLength = this.email.length
    let index = emailLength - 1
    let lastData = this.email[index]
    let tempEmail = [...this.email]
    tempEmail.pop()
    if (emailLength >= 2) {
      let validIndex = tempEmail.findIndex(res => res.email === lastData.email && lastData.validStatus != 'inValid')
      if (validIndex >= 0) {
        this.email[index].validStatus = 'duplicate'
        this.email[validIndex].validStatus = 'duplicate'
        this.emailCtrl.setErrors({ duplicate: true });
      }
    }
  }

  get submitDisable() {
    if (this.email.length == 0) {
      return true
    }
    let tempEmail = [...this.email]
    let data = tempEmail.filter(res => res.validStatus == 'duplicate' || res.validStatus == 'inValid')
    if (data.length !== 0) {
      return true
    }
    return false
  }

  //function

}
