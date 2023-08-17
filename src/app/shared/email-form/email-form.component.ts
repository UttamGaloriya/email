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
  filteredEmail: Observable<any[]>;
  email: any[] = [];
  // allEmail: string[] = emailList
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
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    let dataPush = false
    if (emailPattern.test(value)) {
      dataPush = true
    }
    if (dataPush) {
      let data = this.email.filter(res => res == value)
      if (data.length > 0) {
        dataPush = false
      }
    }
    if (dataPush) {
      let inputProfile = {
        id: 0,
        email: value,
      }
      this.email.push(inputProfile);
      event.chipInput!.clear();
      this.emailCtrl.setValue('x@gmail.com');
    }
  }

  remove(email: string): void {
    const index = this.email.indexOf(email);
    if (index >= 0) {
      this.email.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let index = this.email.findIndex((res: any) => res.email == event.option.value.email)
    if (index < 0) {
      this.email.push(event.option.value);
    }
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue('x@gmail.com');
  }

  private _filter(value: any) {
    if (typeof (value) == 'string') {
      const filterValue = value.toLowerCase();
      return this.allEmail.filter((res) => res.email.toLowerCase().includes(filterValue))
    } else {
      const filterValue = value.email.toLowerCase();
      return this.allEmail.filter((res) => res.email.toLowerCase().includes(filterValue))
    }

  }

  list() {
    console.log(this.emailCtrl.value)
  }

  closeEmailForm() {
    this.dialog.open(DialogBoxComponent, {
      data: {
        heading: "Exit add emails ?",
        description: 'A emails has not been added.Are you sure you want to leave'
      },
      width: '500px'
    }).afterClosed().subscribe((res) => { this.close.emit(res) })
  }

  submitForm() {
    this.submit.emit(this.email)
    this.email = []
  }
}
