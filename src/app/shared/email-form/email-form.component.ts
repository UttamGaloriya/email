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
  email: string[] = [];
  allEmail: any[] = emailList
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(public dialog: MatDialog) {
    this.filteredEmail = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allEmail.slice())),
    );
  }


  ngOnInit() {

  }

  add(event: MatChipInputEvent): void {
    console.log(this.emailCtrl)
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
    // Add our email
    if (dataPush) {
      this.email.push(value);
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
    let index = this.email.findIndex((res: any) => res == event.option.value.email)
    if (index < 0) {
      this.email.push(event.option.viewValue);
      this.emailCtrl.setValue('x@gmail.com');
    }
    this.emailInput.nativeElement.value = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allEmail.filter(email => email.toLowerCase().includes(filterValue))
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
