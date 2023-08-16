import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { emailList } from '../emailList';
@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent {
  @Output() close = new EventEmitter<unknown>();
  @Output() submit = new EventEmitter<unknown>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  filteredEmail: Observable<string[]>;
  email: string[] = [];
  allEmail: string[] = emailList

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredEmail = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allEmail.slice())),
    );
  }
  ngOnInit() {

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i; // Case-insensitive pattern
    let dataPush = false
    if (emailPattern.test(value)) {
      dataPush = true // Validation error if the email format is invalid
    }
    if (dataPush) {
      let data = this.email.filter(res => res == value)
      console.log(data)
      if (data.length > 0) {
        dataPush = false
        console.log("f", value)
      }
    }
    // Add our fruit
    if (dataPush) {
      this.email.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.email.indexOf(email);
    if (index >= 0) {
      this.email.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.email.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allEmail.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  list() {
    console.log(this.emailCtrl.value)
  }


  closeEmailForm() {
    this.close.emit()
  }
  submitForm() {
    this.submit.emit(this.email)
  }
}
